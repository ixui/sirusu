import alt from '../alt'

class BrowserActions {

  resize(size) {
    this.dispatch(size)
  }

  toggleTwoScreenMode() {
    this.dispatch()
  }

  togglePrintMode() {
    this.dispatch()
  }

  print() {
    this.dispatch()
  }

}

export default alt.createActions(BrowserActions)
