// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'

// Alt - Flux
// Actions
import PagesActions from '../../actions/pages'
// Stores
import PagesStore from '../../stores/pages'
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

class AddNewPageDialog extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
	static getStores() {
    return [PagesStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(PagesStore.getState(), BrowserStore.getState()) 
  }  

  addNewPage() {
    let title = this.refs.title.getValue()
    let subtitle = this.refs.subtitle.getValue()
    PagesActions.add(title, subtitle)
    PagesActions.hideNewPageView()
  }

  hideNewPageView() {
    PagesActions.hideNewPageView()
  }

  render() {

    let actions = [
      <FlatButton
        label="Add"
        primary={true}
        onClick={this.addNewPage.bind(this)}></FlatButton>,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.hideNewPageView.bind(this)}></FlatButton>,
    ]

    return (

      <Dialog title="ADD Page"
        actions={actions}
        modal={true}
        open={this.props.visibleNewPageView}
        onRequestClose={this.hideNewPageView.bind(this)}>

        <TextField hintText="　ページのタイトル　" 
               inputStyle={inputFieldStyle.inputStyle}
               underlineStyle={inputFieldStyle.underlineStyle}
               underlineFocusStyle={inputFieldStyle.underlineFocusStyle}
               ref="title"
               fullWidth />

        <TextField hintText="　ページの説明　" 
               inputStyle={inputFieldStyle.inputStyle}
               underlineStyle={inputFieldStyle.underlineStyle}
               underlineFocusStyle={inputFieldStyle.underlineFocusStyle}
               ref="subtitle"
               fullWidth />
        
      </Dialog>

    )
  }

}

export default connectToStores(AddNewPageDialog)
