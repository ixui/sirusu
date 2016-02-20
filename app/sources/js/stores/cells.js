import Alt from '../alt'
import CellsActions from '../actions/cells'
import UUID from '../stores/helpers/uuid'

class CellsStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(CellsActions)
    this.cells = []
  }

  onFetch() {
    console.log("CellsStore onFetch")
    this.cells = [
        {id: UUID.get(), type: "markdown", subtype: null},
        {id: UUID.get(), type: "code", subtype: "javascript"},
      ]
  }

}

export default Alt.createStore(CellsStore, 'CellsStore')