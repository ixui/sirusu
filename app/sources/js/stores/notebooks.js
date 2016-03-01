import Alt from '../alt'
import NotebooksActions from '../actions/notebooks'
import UUID from '../stores/helpers/uuid'
import _ from 'lodash'
import SettingStore from '../stores/setting'
import ErrorsStore from '../stores/errors'

let app = remote.require('app')
let fs = remote.require('fs')
let path = remote.require("path")

class NotebooksStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(NotebooksActions)

    // 関連画面管理
    this.visibleNewNoteView = false
    this.visibleEditNoteView = false

    // データ管理
    this.currentNote = null
    this.notes = []
  }

  onFetch() {

    let _this = this

    // 設定からデータの取得先を取得する
    let dataPath = SettingStore.getState().dataPath || app.getPath('userData')

    let notesBuffer = []
    fs.readdir(dataPath, (err, files) => {

      files.map(file => {
          return path.join(dataPath, file)
      }).filter(file => {
          return !fs.statSync(file).isFile();
      }).forEach(file => {
        // データ取得先にあるディレクトリからノートブックの一覧を作成する
        notesBuffer.push({id: UUID.get(), name: _.last(file.split(path.sep))})
      })

        _this.notes = notesBuffer
        _this.currentNote = _this.notes[0]
        _this.emitChange() // 非同期で処理を行っているのでstateを更新後にemitChangeで再度反映する
    })

  }

  onAdd(data){

    let _this = this

    // 設定からデータの取得先を取得する
    let dataPath = SettingStore.getState().dataPath || app.getPath('userData')
    let addPath = path.join(dataPath, data.name)

    // ToDo: stateとディレクトリの状態の同期をきちんととるようにする
    fs.exists(addPath, function(exists){
      if (!exists) {
        fs.mkdir(addPath, (err) => {
        })
      } else {
        ErrorsStore.push("同名のノートブックが既に存在しています")
      }
    })


    this.notes.push({id: UUID.get(), name: data.name})
  }

  onUpdate(data){

    // 設定からデータの取得先を取得する
    let dataPath = SettingStore.getState().dataPath || app.getPath('userData')

    this.notes = _.map(this.notes, (note) => {
      if (this.currentNote.id == note.id) {

        let before = path.join(dataPath, note.name)
        let after = path.join(dataPath, data.name)

        fs.exists(after, function(exists){
          if (!exists) {
            fs.rename(before, after, (err) => {
            })
          } else {
            ErrorsStore.push("同名のノートブックが既に存在しています")
          }
        })

        _.merge(note, {name: data.name}) 
      }
      return note
    })
  }

  onDelete(){

    // 設定からデータの取得先を取得する
    let dataPath = SettingStore.getState().dataPath || app.getPath('userData')
    let rmPath = path.join(dataPath, this.currentNote.name)

    // ToDo: stateとディレクトリの状態の同期をきちんととるようにする
    fs.rmdir(rmPath, () => {
    })

    this.notes = _.reject(this.notes, ["id", this.currentNote.id])
    if (this.notes.length > 0) this.currentNote = this.notes[0]
  }

  onSelect(data){
    this.currentNote = data.note
  }

  onShowNewNoteView(){
    this.visibleNewNoteView = true
  }

  onShowEditNoteView(){
    this.visibleEditNoteView = true
  }

  onHideNewNoteView(){
    this.visibleNewNoteView = false
  }

  onHideEditNoteView(){
    this.visibleEditNoteView = false
  }

}

export default Alt.createStore(NotebooksStore, 'NotebooksStore')