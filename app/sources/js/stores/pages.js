import Alt from '../alt'
import _ from 'lodash'
import PagesActions from '../actions/pages'
import UUID from '../stores/helpers/uuid'
import SettingStore from '../stores/setting'
import NotebooksStore from '../stores/notebooks'

let app = remote.require('app')
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
    let dataPath = SettingStore.getState().dataPath || app.getPath('userData')
    let selectedNote = NotebooksStore.getState().currentNote

    if (selectedNote == null) {
      this.pages = []
      return
    }

    let pagesFilePath = path.join(dataPath, selectedNote.name, "Pages.json")
    let pages = JSON.parse(fs.readFileSync(pagesFilePath, 'utf8'));

    this.pages = pages
    this.currentPage = pages[0]

    // this.pages = [
    //     {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
    //     {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
    //     {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
    //     {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
    //     {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
    //     {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
    //     {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
    //     {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
    //     {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
    //     {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
    //   ]
  }

  onAdd(data){

    let page = {id: UUID.get(), title: data.title, subtitle: data.subtitle}
    this.pages.push(page)
    this.currentPage = this.pages[0]

    let dataPath = SettingStore.getState().dataPath || app.getPath('userData')
    let selectedNote = NotebooksStore.getState().currentNote
    let pagesFilePath = path.join(dataPath, selectedNote.name, "Pages.json")
    fs.writeFileSync(pagesFilePath, JSON.stringify(this.pages))

  }

  onUpdate(data){

    this.pages = _.map(this.pages, (page) => {
      if (this.currentPage.id == page.id) _.merge(page, {title: data.subtitle, title: data.subtitle}) 
      return page
    })

    let dataPath = SettingStore.getState().dataPath || app.getPath('userData')
    let selectedNote = NotebooksStore.getState().currentNote
    let pagesFilePath = path.join(dataPath, selectedNote.name, "Pages.json")
    fs.writeFileSync(pagesFilePath, JSON.stringify(this.pages))

  }

  onDelete(){

    this.pages = _.reject(this.pages, ["id", this.currentPage.id])

    let dataPath = SettingStore.getState().dataPath || app.getPath('userData')
    let selectedNote = NotebooksStore.getState().currentNote
    let pagesFilePath = path.join(dataPath, selectedNote.name, "Pages.json")
    fs.writeFileSync(pagesFilePath, JSON.stringify(this.pages))

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