import Alt from '../alt'
import ErrorsActions from '../actions/errors'
import UUID from '../stores/helpers/uuid'

class ErrorsStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(ErrorsActions)

    // 他のStoreからエラーを放り込めるようにメッセージ追加処理を外部に公開する
    // ただし、この使い方はfluxの思想から外れるため、ここ以外では使用しないこと
    this.exportPublicMethods({
      push: function(message){
        this.state.errors.push({id: UUID.get(), message: message})
        this.emitChange()
      }
    })

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