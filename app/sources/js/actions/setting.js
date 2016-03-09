import alt from '../alt'

class SettingActions {

  showSettingView() {
    this.dispatch()
  }

  hideSettingView() {
    this.dispatch()
  }

  save(path) {
    this.dispatch({dataPath: path})
  }

  toggleFullscreen() {
    this.dispatch()
  }

}

export default alt.createActions(SettingActions)
