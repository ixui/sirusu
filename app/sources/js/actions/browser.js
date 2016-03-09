import alt from '../alt'

class BrowserActions {

  resize(size) {
    this.dispatch(size)
  }

  toggleTwoScreenMode() {
    this.dispatch()
  }

}

export default alt.createActions(BrowserActions)
