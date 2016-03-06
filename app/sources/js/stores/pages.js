import Alt from '../alt'
import _ from 'lodash'
import PagesActions from '../actions/pages'
import UUID from '../stores/helpers/uuid'
import SettingStore from '../stores/setting'
import NotebooksStore from '../stores/notebooks'
import TagsStore from '../stores/tags'

let fs = remote.require('fs')
let path = remote.require("path")

class PagesStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(PagesActions)

    // 関連画面管理
    this.visibleNewPageView = false
    this.visibleEditPageView = false

    this.currentPage = null
    this.pages = []
  }

  onFetch() {
    this.waitFor([NotebooksStore, TagsStore, SettingStore])

    let _this = this

    console.log("PagesStore onFetch")

    // 設定からデータの取得先を取得する
    let dataPath = SettingStore.getState().dataPath

    if (!dataPath) return
    try{
      // ディレクトリが存在していることを確認する
      fs.statSync(dataPath)
    }catch(e){
      ErrorsStore.push("データの保存先が見つかりません¥n設定を確認してください")
      return
    }

    // 選択されているノートとタグを取得する - 両方とれなければ0件データを返す
    let selectedNote = NotebooksStore.getState().currentNote
    let selectedTag = TagsStore.getState().currentTag
    if (selectedNote == null && selectedTag == null) {
      this.pages = []
      return
    }

    // データ保存先直下のファイルを開き、選択されているノートと一致するページを抽出する
    let pagesBuffer = []
    fs.readdir(dataPath, (err, files) => {

      files.map(file => {
          return path.join(dataPath, file)
      }).filter(file => {
          return fs.statSync(file).isFile();
      }).filter(file => {
          return path.extname(file) == ".page";
      }).forEach(file => {
        // データ取得先にあるディレクトリからノートブックの一覧を作成する
        let page = JSON.parse(fs.readFileSync(file, 'utf8'));

        if (selectedNote && page.note) {
          if (page.note == selectedNote.name) {
            pagesBuffer.push(page)
          }
        }

        if (selectedTag && page.tag) {
          if (page.tag.indexOf(selectedTag.name) > -1) {
            pagesBuffer.push(page)
          }
        }

      })

      _this.pages = pagesBuffer
      _this.currentPage = _this.pages[0]
      _this.emitChange() // 非同期で処理を行っているのでstateを更新後にemitChangeで再度反映する

    })

  }

  onAdd(data){

    let page = {id: UUID.get(), 
                title: data.title, 
                subtitle: data.subtitle, 
                note: data.note, 
                tag: data.tag}
    this.pages.push(page)
    this.currentPage = page

    // pageファイル を生成 ************************************************************
    let dataPath = SettingStore.getState().dataPath
    let pageFilePath = path.join(dataPath, this.currentPage.id + ".page")
    fs.writeFileSync(pageFilePath, JSON.stringify(this.currentPage))

    // Cellsディレクトリがなければ作成 ************************************************
    let cellsDirPath = path.join(dataPath, "Cells")
    try{
      // ディレクトリが存在していないことを確認する 
      fs.statSync(cellsDirPath)
    }catch(e){
      // なければ作成する
      fs.mkdirSync(cellsDirPath)
    }

    // データ格納用のファイルを用意する ************************************************
    let cellsFilePath = path.join(cellsDirPath, this.currentPage.id + ".cells")
    fs.writeFileSync(cellsFilePath, JSON.stringify([]))

  }

  onUpdate(data){

    // stateを更新
    this.pages = _.map(this.pages, (page) => {
      if (this.currentPage.id == page.id) {
        _.merge(page, {title: data.title, 
                       subtitle: data.subtitle, 
                       note: data.note, 
                       tag: data.tag}) 
        this.currentPage = page
      }
      return page
    })

    // 
    let dataPath = SettingStore.getState().dataPath
    let pageFilePath = path.join(dataPath, this.currentPage.id + ".page")
    fs.writeFileSync(pageFilePath, JSON.stringify(this.currentPage))

  }

  onDelete(){

    this.pages = _.reject(this.pages, ["id", this.currentPage.id])

    // pageファイルを削除 ************************************************************
    let dataPath = SettingStore.getState().dataPath
    let pageFilePath = path.join(dataPath, this.currentPage.id + ".page")
    fs.unlinkSync(pageFilePath)

    // データ格納用のファイルを削除する ************************************************
    let cellsFilePath = path.join(dataPath, "Cells", this.currentPage.id　+　".cells")
    fs.unlinkSync(cellsFilePath)

    this.currentPage = this.pages[0]

  }

  onSelect(data){
    this.currentPage = data.page
  }

  onShowNewPageView(){
    this.visibleNewPageView = true
  }

  onShowEditPageView(){
    this.visibleEditPageView = true
  }

  onHideNewPageView(){
    this.visibleNewPageView = false
  }

  onHideEditPageView(){
    this.visibleEditPageView = false
  }

}

export default Alt.createStore(PagesStore, 'PagesStore')