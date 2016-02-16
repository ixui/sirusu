import Alt from '../alt'
import NotebooksActions from '../actions/notebooks'
import UUID from '../stores/helpers/uuid'

class NotebooksStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(NotebooksActions)
    this.state = {
      notes: [
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

  onFetch() {

  }

}

export default Alt.createStore(NotebooksStore, 'NotebooksStore')