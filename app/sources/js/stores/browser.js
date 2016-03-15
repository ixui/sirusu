import Alt from '../alt'
import BrowserActions from '../actions/browser'
import UUID from '../stores/helpers/uuid'
import SettingStore from '../stores/setting'
import ErrorsStore from '../stores/errors'

let BrowserWindow = remote.require('browser-window')
let fs = remote.require('fs')
let path = remote.require('path')
let shell = remote.require('shell')

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
    this.isPrintingMode = false
  }

  getFileUrl(filePath) {

    var pathName = path.resolve(filePath).replace(/\\/g, '/')
    // Windows drive letter must be prefixed with a slash
    if (pathName[0] !== '/') {
        pathName = '/' + pathName
    }

    return encodeURI('file://' + pathName)
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

  onPrint() {
    let _this = this
    this.isPrintingMode = true

    let dataPath = SettingStore.getState().dataPath

    let window = BrowserWindow.getFocusedWindow()
    window.printToPDF({}, (error, data) => {

      if (error) {
        ErrorsStore.push(error)
        _this.isPrintingMode = false
        _this.emitChange() // 非同期で処理を行っているのでstateを更新後にemitChangeで再度反映する
        return
      }

      let filePath = path.join(dataPath, "latest-print.pdf")
      fs.writeFile(filePath, data, (error) => {

        if (error) {
          ErrorsStore.push(error)
          _this.isPrintingMode = false
          _this.emitChange() // 非同期で処理を行っているのでstateを更新後にemitChangeで再度反映する
          return
        }

        shell.openExternal(_this.getFileUrl(filePath))
        _this.isPrintingMode = false
        _this.emitChange() // 非同期で処理を行っているのでstateを更新後にemitChangeで再度反映する
      })
    })
  }

}

export default Alt.createStore(BrowserStore, 'BrowserStore')