import Alt from '../alt'
import NotebooksActions from '../actions/notebooks'
import UUID from '../stores/helpers/uuid'

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