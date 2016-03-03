// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'

// Alt - Flux
// Actions
import NotebooksActions from '../../actions/notebooks'
import SettingActions from '../../actions/setting'
import ErrorsActions from '../../actions/errors'
// Stores
import SettingStore from '../../stores/setting'
import BrowserStore from '../../stores/browser'

// Design
import TextField from 'material-ui/lib/text-field'
import Colors from 'material-ui/lib/styles/colors'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'

let dialog = remote.require('dialog')
let browserWindow = remote.require('browser-window')


// ******************************************************************
// Styles
// ******************************************************************

const settingFieldStyle = {
  inputStyle: {
    color:   Colors.grey800,
    padding: 5,
  },
  underlineStyle: {
    borderColor: Colors.cyan700,
  },
  underlineFocusStyle: {
    borderColor: Colors.cyan300,
  },
}

class SettingDialog extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
	static getStores() {
    return [SettingStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(SettingStore.getState(), BrowserStore.getState()) 
  }  

  showDirectorySelectDialog() {
    let focusedWindow = browserWindow.getFocusedWindow();

    dialog.showOpenDialog(focusedWindow, {properties: ['openDirectory', 'createDirectory']}, function(directories) {
      if (directories) {
        SettingActions.save(directories[0]) 
        NotebooksActions.fetch()
      }
    }.bind(this))
  }

  hideSettingView() {

    let dataPath = this.refs.dataPath.getValue()
    if (!dataPath){
      ErrorsActions.push("データの保存先を選択してください")
      return
    }

    SettingActions.hideSettingView()
  }

  render() {

    let actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.hideSettingView.bind(this)}></FlatButton>,
    ]

    return (

      <Dialog title="設定"
        actions={actions}
        modal={true}
        open={this.props.visibleSettingView}
        onRequestClose={this.hideSettingView.bind(this)}>

        <TextField hintText="　データの保存先　" 
               inputStyle={settingFieldStyle.inputStyle}
               underlineStyle={settingFieldStyle.underlineStyle}
               underlineFocusStyle={settingFieldStyle.underlineFocusStyle}
               onClick={this.showDirectorySelectDialog.bind(this)}
               value={this.props.dataPath} 
               ref="dataPath"
               fullWidth />
        
      </Dialog>

    )
  }

}

export default connectToStores(SettingDialog)
