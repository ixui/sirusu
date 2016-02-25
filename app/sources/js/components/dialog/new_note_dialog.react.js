// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'

// Alt - Flux
// Actions
import NotebooksActions from '../../actions/notebooks'
// Stores
import NotebooksStore from '../../stores/notebooks'
import BrowserStore from '../../stores/browser'

// Design
import TextField from 'material-ui/lib/text-field'
import Colors from 'material-ui/lib/styles/colors'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'


// ******************************************************************
// Styles
// ******************************************************************

const inputFieldStyle = {
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

class AddNewNoteDialog extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
	static getStores() {
    return [NotebooksStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(NotebooksStore.getState(), BrowserStore.getState()) 
  }  

  hideNewNoteView() {
    NotebooksActions.hideNewNoteView()
  }

  render() {

    let actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.hideNewNoteView.bind(this)}></FlatButton>,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.hideNewNoteView.bind(this)}></FlatButton>,
    ]

    return (

      <Dialog title="ADD NOTE"
        actions={actions}
        modal={true}
        open={this.props.visibleNewNoteView}
        onRequestClose={this.hideNewNoteView.bind(this)}>

        <TextField hintText="　ノートの名前　" 
               inputStyle={inputFieldStyle.inputStyle}
               underlineStyle={inputFieldStyle.underlineStyle}
               underlineFocusStyle={inputFieldStyle.underlineFocusStyle}
               fullWidth />
        
      </Dialog>

    )
  }

}

export default connectToStores(AddNewNoteDialog)
