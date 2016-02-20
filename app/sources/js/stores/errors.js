import Alt from '../alt'
import ErrorsActions from '../actions/errors'
import UUID from '../stores/helpers/uuid'

class ErrorsStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(ErrorsActions)
    this.errors = []
  }

  onPush(message) {
    this.errors.push({id: UUID.get(), message: message})
  }

  onPop() {
    this.errors.pop()
  }

  onClear() {
    this.errors = []
  }

}

export default Alt.createStore(ErrorsStore, 'ErrorsStore')