import Alt from '../alt'
import NotebooksActions from '../actions/notebooks'
import UUID from '../stores/helpers/uuid'
import _ from 'lodash'

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
    console.log("NotebooksStore onFetch")
    this.notes = [
        {id: UUID.get(), name: "プログラミング"},
        {id: UUID.get(), name: "プログラミング"},
        {id: UUID.get(), name: "プログラミング"},
        {id: UUID.get(), name: "プログラミング"},
        {id: UUID.get(), name: "プログラミング"},
        {id: UUID.get(), name: "プログラミング"},
        {id: UUID.get(), name: "プログラミング"},
        {id: UUID.get(), name: "プログラミング"},
      ]
    this.currentNote = this.notes[0]
  }

  onAdd(data){
    this.notes.push({id: UUID.get(), name: data.name})
  }

  onUpdate(data){
    this.notes = _.map(this.notes, (note) => {
      if (this.currentNote.id == note.id) _.merge(note, {name: data.name}) 
      return note
    })
  }

  onDelete(){
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