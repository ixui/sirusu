import Alt from '../alt'
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

}

export default Alt.createStore(PagesStore, 'PagesStore')