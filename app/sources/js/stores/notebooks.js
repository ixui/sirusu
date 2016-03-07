import Alt from '../alt'
import NotebooksActions from '../actions/notebooks'
import UUID from '../stores/helpers/uuid'
import _ from 'lodash'
import SettingStore from '../stores/setting'
import ErrorsStore from '../stores/errors'

let fs = remote.require('fs')
let path = remote.require("path")
let defaultNotes = [
                    {id: UUID.get(), name: "Inbox"},
                    {id: UUID.get(), name: "Star"},
                    {id: UUID.get(), name: "Trash"}
                 ]

class NotebooksStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(NotebooksActions)

    // データ管理
    this.currentNote = null
    this.originalNotes = defaultNotes
    this.notes = defaultNotes
  }

  onFetch() {

    let _this = this

    console.log("NotebooksStore onFetch")

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

    // データ保存先直下のファイルを開き、ノート名称を収集する
    let notesBuffer = defaultNotes
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
        notesBuffer.push({id: UUID.get(), name: page.note})
      })

      _this.notes = _.uniqBy(notesBuffer, "name")
      _this.originalNotes = _this.notes
      _this.currentNote = _this.currentNote || _this.notes[0]
      _this.emitChange() // 非同期で処理を行っているのでstateを更新後にemitChangeで再度反映する
    })

  }

  onSelect(data){
    this.currentNote = data.note
  }

  onSearch(data){
    let query = _.lowerCase(data.query)
    this.notes = this.originalNotes
    this.notes = _.filter(this.notes, note => {
      let name = _.lowerCase(note.name)
      return (name.indexOf(query) > -1)
    })
  }

}

export default Alt.createStore(NotebooksStore, 'NotebooksStore')