import Alt from '../alt'
import _ from 'lodash'
import PagesActions from '../actions/pages'
import UUID from '../stores/helpers/uuid'
import SettingStore from '../stores/setting'
import NotebooksStore from '../stores/notebooks'

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
    this.waitFor([NotebooksStore, SettingStore])

    console.log("PagesStore onFetch")

    // 設定からデータの取得先を取得する
    let dataPath = SettingStore.getState().dataPath
    let selectedNote = NotebooksStore.getState().currentNote

    if (selectedNote == null) {
      this.pages = []
      return
    }

    let pagesFilePath = path.join(dataPath, selectedNote.name, "Pages.json")
    let pages = JSON.parse(fs.readFileSync(pagesFilePath, 'utf8'));

    this.pages = pages
    this.currentPage = pages[0]

  }

  onAdd(data){

    let page = {id: UUID.get(), title: data.title, subtitle: data.subtitle}
    this.pages.push(page)
    this.currentPage = this.pages[0]

    // Page.json を生成 ************************************************************
    let dataPath = SettingStore.getState().dataPath
    let selectedNote = NotebooksStore.getState().currentNote
    let pagesFilePath = path.join(dataPath, selectedNote.name, "Pages.json")
    fs.writeFileSync(pagesFilePath, JSON.stringify(this.pages))

    // Cellsディレクトリがなければ作成 ************************************************
    let cellsDirPath = path.join(dataPath, selectedNote.name, "Cells")
    try{
      // ディレクトリが存在していないことを確認する 
      fs.statSync(cellsDirPath)
    }catch(e){
      fs.mkdirSync(cellsDirPath)
    }

    // データ格納用のファイルを用意する ************************************************
    let cellsFilePath = path.join(cellsDirPath, page.id+".json")
    fs.writeFileSync(cellsFilePath, JSON.stringify([]))

  }

  onUpdate(data){

    this.pages = _.map(this.pages, (page) => {
      if (this.currentPage.id == page.id) _.merge(page, {title: data.subtitle, title: data.subtitle}) 
      return page
    })

    let dataPath = SettingStore.getState().dataPath
    let selectedNote = NotebooksStore.getState().currentNote
    let pagesFilePath = path.join(dataPath, selectedNote.name, "Pages.json")
    fs.writeFileSync(pagesFilePath, JSON.stringify(this.pages))

  }

  onDelete(){

    let id = this.currentPage.id
    this.pages = _.reject(this.pages, ["id", id])

    // Page.json を更新 ************************************************************
    let dataPath = SettingStore.getState().dataPath
    let selectedNote = NotebooksStore.getState().currentNote
    let pagesFilePath = path.join(dataPath, selectedNote.name, "Pages.json")
    fs.writeFileSync(pagesFilePath, JSON.stringify(this.pages))

    // データ格納用のファイルを削除する ************************************************
    let cellsFilePath = path.join(dataPath, selectedNote.name, "Cells", id+".json")
    fs.unlinkSync(cellsFilePath)

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