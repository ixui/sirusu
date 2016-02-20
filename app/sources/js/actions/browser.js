import alt from '../alt'

class BrowserActions {

  resize(size) {
    this.dispatch(size)
  }

}

export default alt.createActions(BrowserActions)
