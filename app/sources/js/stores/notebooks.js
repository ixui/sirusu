import Alt from '../alt'
import NotebooksActions from '../actions/notebooks'
import UUID from '../stores/helpers/uuid'
import _ from 'lodash'
import SettingStore from '../stores/setting'
import ErrorsStore from '../stores/errors'

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
    let dataPath = SettingStore.getState().dataPath
    let addPath = path.join(dataPath, data.name)
    let pagesFilePath = path.join(addPath, "Pages.json")

    try{
      // ディレクトリが存在していないことを確認する
      fs.statSync(addPath)
      ErrorsStore.push("同名のノートブックが既に存在しているか、データを書き込めません")

    }catch(e){

      fs.mkdirSync(addPath)

      // 空のPage.jsonを生成する
      fs.writeFileSync(pagesFilePath, JSON.stringify([]))

      let note = {id: UUID.get(), name: data.name}
      this.notes.push(note)
      this.currentNote = note

    }


  }

  onUpdate(data){

    // 設定からデータの取得先を取得する
    let dataPath = SettingStore.getState().dataPath

    this.notes = _.map(this.notes, (note) => {
      if (this.currentNote.id == note.id) {

        let before = path.join(dataPath, note.name)
        let after = path.join(dataPath, data.name)

        try{
          fs.accessSync(after, fs.R_OK)
          ErrorsStore.push("同名のノートブックが既に存在しています")
        }catch(e){
          // 正常であればフォルダがないはずなのでここでリネームする
          fs.renameSync(before, after)
          _.merge(note, {name: data.name}) 
        }
      }
      return note
    })
  }

  onDelete(){

    // 設定からデータの取得先を取得する
    let dataPath = SettingStore.getState().dataPath
    let rmPath = path.join(dataPath, this.currentNote.name)

    try{
      fs.rmdirSync(rmPath)
      this.notes = _.reject(this.notes, ["id", this.currentNote.id])
      if (this.notes.length > 0) this.currentNote = this.notes[0]
    }catch(e){
      ErrorsStore.push("データを削除できませんでした")
    }

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