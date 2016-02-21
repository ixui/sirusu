import Alt from '../alt'
import SettingActions from '../actions/setting'
import UUID from '../stores/helpers/uuid'

class SettingStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(SettingActions)
    this.visibleSettingView = false
  }

  onShow() {
    this.visibleSettingView  = true
  }

  onHide() {
    this.visibleSettingView  = false
  }

}

export default Alt.createStore(SettingStore, 'SettingStore')