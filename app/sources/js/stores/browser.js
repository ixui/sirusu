import Alt from '../alt'
import BrowserActions from '../actions/browser'
import UUID from '../stores/helpers/uuid'

class BrowserStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(BrowserActions)
    this.width = 1000
    this.height = 800
    this.isTwoScreenMode = false
    this.isPrintMode = false
  }

  onResize(size) {
    this.width  = size.width
    this.height = size.height
  }

  onToggleTwoScreenMode() {
    this.isTwoScreenMode = !(this.isTwoScreenMode)
  }

  onTogglePrintMode() {
    this.isPrintMode = !(this.isPrintMode)
  }

}

export default Alt.createStore(BrowserStore, 'BrowserStore')