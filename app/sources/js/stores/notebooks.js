import Alt from '../alt'
import NotebooksActions from '../actions/notebooks'
import UUID from '../stores/helpers/uuid'

class NotebooksStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(NotebooksActions)
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
  }

}

export default Alt.createStore(NotebooksStore, 'NotebooksStore')