// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'

// Alt - Flux
// Actions
import PagesActions from '../../actions/pages'
import ErrorsActions from '../../actions/errors'
// Stores
import NotebooksStore from '../../stores/notebooks'
import PagesStore from '../../stores/pages'
import BrowserStore from '../../stores/browser'

// Design
import TextField from 'material-ui/lib/text-field'
import Colors from 'material-ui/lib/styles/colors'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import AutoComplete from 'material-ui/lib/auto-complete'


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

class EditPageDialog extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
	static getStores() {
    return [NotebooksStore, PagesStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(NotebooksStore.getState(), PagesStore.getState(), BrowserStore.getState()) 
  }  

  updatePage() {
    let title = this.refs.title.getValue()
    let subtitle = this.refs.subtitle.getValue()
    let note = this.refs.note.getValue()
    let tag = this.refs.tag.getValue()

    if (title == ""){
      ErrorsActions.push("タイトルを入力してください")
      return
    }

    if (note == ""){
      ErrorsActions.push("所属するノートを選択、もしくは入力してください")
      return
    }

    PagesActions.update(title, subtitle, note, tag)
    PagesActions.hideEditPageView()
  }

  deletePage() {
    PagesActions.delete()
    PagesActions.hideEditPageView()
  }

  hideEditPageView() {
    PagesActions.hideEditPageView()
  }

  render() {

    let notes = this.props.notes.map ((note, index) => {
      return note.name
    }) 

    let actions = [
      <FlatButton
        label="変更する"
        primary={true}
        onClick={this.updatePage.bind(this)}></FlatButton>,
      <FlatButton
        label="削除する"
        onClick={this.deletePage.bind(this)}></FlatButton>,
      <FlatButton
        label="キャンセル"
        onClick={this.hideEditPageView.bind(this)}></FlatButton>,
    ]

    let title = this.props.currentPage ? this.props.currentPage.title : ""
    let subtitle = this.props.currentPage ? this.props.currentPage.subtitle : ""
    let note = this.props.currentPage ? this.props.currentPage.note : ""
    let tag = this.props.currentPage ? this.props.currentPage.tag : ""

    return (

      <Dialog title="ページのタイトルを編集する"
        actions={actions}
        modal={true}
        open={this.props.visibleEditPageView}
        onRequestClose={this.hideEditPageView.bind(this)}>

        <TextField hintText="タイトル" 
               inputStyle={inputFieldStyle.inputStyle}
               underlineStyle={inputFieldStyle.underlineStyle}
               underlineFocusStyle={inputFieldStyle.underlineFocusStyle}
               ref="title"
               defaultValue={title}
               fullWidth />

        <TextField hintText="サブタイトル" 
               inputStyle={inputFieldStyle.inputStyle}
               underlineStyle={inputFieldStyle.underlineStyle}
               underlineFocusStyle={inputFieldStyle.underlineFocusStyle}
               ref="subtitle"
               defaultValue={subtitle}
               fullWidth />

        <AutoComplete hintText="所属ノート" 
               inputStyle={inputFieldStyle.inputStyle}
               underlineStyle={inputFieldStyle.underlineStyle}
               underlineFocusStyle={inputFieldStyle.underlineFocusStyle}
               filter={AutoComplete.noFilter}
               triggerUpdateOnFocus={true}
               dataSource={notes}
               ref="note"
               searchText={note}
               fullWidth />

        <TextField hintText="タグ" 
               inputStyle={inputFieldStyle.inputStyle}
               underlineStyle={inputFieldStyle.underlineStyle}
               underlineFocusStyle={inputFieldStyle.underlineFocusStyle}
               ref="tag"
               defaultValue={tag}
               fullWidth />
        
      </Dialog>

    )
  }

}

export default connectToStores(EditPageDialog)
