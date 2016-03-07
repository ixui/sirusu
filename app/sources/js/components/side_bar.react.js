// Library
import React from 'react'
import _ from 'lodash'
import {Layout, Flex, Fixed} from 'react-layout-pane'

// Alt - Flux
// Actions
import NotebooksActions from '../actions/notebooks'
import TagsActions from '../actions/tags'
import SettingActions from '../actions/setting'
import ErrorsActions from '../actions/errors'

// Design
import TextField from 'material-ui/lib/text-field'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Colors from 'material-ui/lib/styles/colors'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'

import NoteList from '../components/list/note.react'
import TagList from '../components/list/tag.react'

import SettingDialog from '../components/dialog/setting_dialog.react'

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

  showSettingView() {
    SettingActions.showSettingView()
  }

  filterItem() {
    let query = this.refs.query.getValue()
    NotebooksActions.search(query)
    TagsActions.search(query)
  }

  render() {

    return (

      <Layout type="column">

        <Flex>
          <TextField hintText="　Search (Notes, Tags)　" 
                 inputStyle={textfieldStyle.inputStyle}
                 underlineStyle={textfieldStyle.underlineStyle}
                 underlineFocusStyle={textfieldStyle.underlineFocusStyle}
                 onChange={this.filterItem.bind(this)}
                 ref="query"
                 fullWidth className="search-query" />
          <br/>

          <NoteList/>

          <TagList/>

        </Flex>

        <Fixed>
          <Toolbar style={toolbarStyle.style}>
            <ToolbarGroup firstChild={true} float="left">
              <IconButton onClick={this.showSettingView.bind(this)} 
                          iconStyle={toolbarStyle.iconStyle} 
                          iconClassName="material-icons" 
                          tooltip="アプリの設定" 
                          tooltipPosition="top-right">settings</IconButton>
            </ToolbarGroup>
          </Toolbar>
        </Fixed>

        <SettingDialog/>

     </Layout>

    )
  }

}

export default SideBar
