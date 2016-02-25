// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import _ from 'lodash'
import {Layout, Flex, Fixed} from 'react-layout-pane'

// Alt - Flux
// Actions
import NotebooksActions from '../actions/notebooks'
import TagsActions from '../actions/tags'
import SettingActions from '../actions/setting'
import ErrorsActions from '../actions/errors'
// Stores
import NotebooksStore from '../stores/notebooks'
import TagsStore from '../stores/tags'
import BrowserStore from '../stores/browser'

// Design
import TextField from 'material-ui/lib/text-field'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'

import SettingDialog from '../components/dialog/setting_dialog.react'
import NewNoteDialog from '../components/dialog/new_note_dialog.react'

// ******************************************************************
// Styles
// ******************************************************************
const textfieldStyle = {
  inputStyle: {
    color:   Colors.white,
    padding: 5,
  },
  underlineStyle: {
    borderColor: Colors.cyan700,
  },
  underlineFocusStyle: {
    borderColor: Colors.cyan300,
  },
}

const listStyle = {
  style: {
    backgroundColor: Colors.cyan800,
    paddingTop      : '1px',
    paddingBottom   : '1px',
    overflowY       : 'auto',
    height          : '400px',

  },
  subheaderStyle: {
    backgroundColor: Colors.cyan800,
    color          : Colors.grey100,
    paddingTop     : '1px',
    paddingBottom  : '1px',
    fontSize       : '12px',
  },
}

const listItemStyle = {
  innerDivStyle: {
    color          : Colors.grey100,
    paddingTop     : '1px',
    paddingBottom  : '1px',
    fontSize       : '12px',
  },
}

const toolbarStyle = {
  style: {
    backgroundColor: Colors.cyan800,
  },
  iconStyle: {
    fontSize:      '24px',
    color:         Colors.cyan700,
  },
}

class SideBar extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
	static getStores() {
    return [NotebooksStore, TagsStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(NotebooksStore.getState(), TagsStore.getState(), BrowserStore.getState()) 
  }  

  // Alt Store との連結完了後に呼ばれるメソッド - 純正Reactでの componentDidMount で行う処理を記載することになるはず
  // Storeの変更が絡む処理は componentDidMount ではなく componentDidConnect でしないと変更検知が届かない
  static componentDidConnect(prop, context) {
    NotebooksActions.fetch()
    TagsActions.fetch()
  }

  addNote() {
    NotebooksActions.showNewNoteView()
  }

  showSettingView() {
    SettingActions.showSettingView()
  }

  render() {

    let dynamicListStyle = _.merge(listStyle.style, {height: (this.props.height - 100) / 2})

  	let notes = this.props.notes.map((note, index) => {
  		return (
        <ListItem key={note.id} innerDivStyle={listItemStyle.innerDivStyle} primaryText={note.name}/>
  		)
  	})

    let tags = this.props.tags.map((tag, index) => {
      return (
        <ListItem key={tag.id} innerDivStyle={listItemStyle.innerDivStyle} primaryText={tag.name}/>
      )
    })

    return (

      <Layout type="column">

        <Flex>
          <TextField hintText="　Search (Notes, Tags)　" 
                 inputStyle={textfieldStyle.inputStyle}
                 underlineStyle={textfieldStyle.underlineStyle}
                 underlineFocusStyle={textfieldStyle.underlineFocusStyle}
                 fullWidth className="search-query" />
          <br/>

          <List subheader="Notes" style={dynamicListStyle} subheaderStyle={listStyle.subheaderStyle}>
            {notes}
          </List>

          <List subheader="Tags" style={dynamicListStyle} subheaderStyle={listStyle.subheaderStyle}>
            {tags}
          </List>
        </Flex>

        <Fixed>
          <Toolbar style={toolbarStyle.style}>
            <ToolbarGroup firstChild={true} float="left">
              <IconButton onClick={this.addNote.bind(this)} 
                          iconStyle={toolbarStyle.iconStyle} 
                          iconClassName="material-icons" 
                          tooltip="Noteの追加" 
                          tooltipPosition="top-right">add</IconButton>
              <IconButton onClick={this.showSettingView.bind(this)} 
                          iconStyle={toolbarStyle.iconStyle} 
                          iconClassName="material-icons" 
                          tooltip="アプリの設定" 
                          tooltipPosition="top-right">settings</IconButton>
            </ToolbarGroup>
          </Toolbar>
        </Fixed>

        <SettingDialog/>
        <NewNoteDialog/>

     </Layout>

    )
  }

}

export default connectToStores(SideBar)
