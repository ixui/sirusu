import alt from '../alt'

class SettingActions {

  show() {
    this.dispatch()
  }

  hide() {
    this.dispatch()
  }

  save(path) {
    this.dispatch({dataPath: path})
  }


}

export default alt.createActions(SettingActions)
