import alt from '../alt'

class ErrorsActions {

  push(message) {
    this.dispatch(message)
  }

  pop() {
    this.dispatch()
  }

  clear() {
    this.dispatch()
  }

}

export default alt.createActions(ErrorsActions)
