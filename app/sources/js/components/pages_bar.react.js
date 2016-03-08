// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import _ from 'lodash'
import {Layout, Flex, Fixed} from 'react-layout-pane'

// Alt - Flux
// Actions
import PagesActions  from '../actions/pages'
import ErrorsActions from '../actions/errors'
// Stores
import PagesStore from '../stores/pages'
import BrowserStore from '../stores/browser'

// Design
import TextField from 'material-ui/lib/text-field'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

import PageList from '../components/list/page.react'


const textfieldStyle = {
  inputStyle: {
    color:   Colors.white,
    padding: 5,
  },
  underlineStyle: {
    borderColor: Colors.cyan800,
  },
  underlineFocusStyle: {
    borderColor: Colors.cyan300,
  },
}

const listStyle = {
  style: {
    backgroundColor: Colors.cyan700,
    paddingTop      : '1px',
    paddingBottom   : '1px',
    overflowY       : 'auto',
    height          : '800px',
  },
  subheaderStyle: {
    backgroundColor: Colors.cyan700,
    color          : Colors.grey100,
    paddingTop     : '1px',
    paddingBottom  : '1px',
    fontSize       : '24px',
  },
}

const listItemStyle = {
  innerDivStyle: {
    color          : Colors.cyan100,
    paddingTop     : '3px',
    paddingBottom  : '3px',
    fontSize       : '14px',
  },
}

const toolbarStyle = {
  style: {
    backgroundColor: Colors.cyan700,
  },
  iconStyle: {
    fontSize:      '24px',
    color:         Colors.cyan800,
  },
}

class PagesBar extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
  static getStores() {
    return [PagesStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(PagesStore.getState(), BrowserStore.getState())
  }  

  // Alt Store との連結完了後に呼ばれるメソッド - 純正Reactでの componentDidMount で行う処理を記載することになるはず
  // Storeの変更が絡む処理は componentDidMount ではなく componentDidConnect でしないと変更検知が届かない
  static componentDidConnect(prop, context) {
  }

  addPage() {
    PagesActions.showNewPageView()
  }

  filterItem() {
    let query = this.refs.query.getValue()
    PagesActions.search(query)
  }

  render() {

    let dynamicListStyle = _.merge(listStyle.style, {height: this.props.height - 100})

    let pages = this.props.pages.map((page, index) => {
      return (<ListItem key={page.id} innerDivStyle={listItemStyle.innerDivStyle} primaryText={page.title} secondaryText={page.subtitle}/>)
    })

    return (

      <Layout type="column">

        <Flex>
          <TextField hintText="　Search (All Cells)　" 
                 inputStyle={textfieldStyle.inputStyle}
                 underlineStyle={textfieldStyle.underlineStyle}
                 underlineFocusStyle={textfieldStyle.underlineFocusStyle}
                 onChange={this.filterItem.bind(this)}
                 ref="query"
                 fullWidth className="search-query" />
          <br/>

          <PageList/>
        </Flex>

        <Fixed>
          <Toolbar style={toolbarStyle.style}>
            <ToolbarGroup firstChild={true} float="left">
              <IconButton onClick={this.addPage.bind(this)} 
                          iconStyle={toolbarStyle.iconStyle} 
                          iconClassName="material-icons" 
                          tooltip="Pageの追加" 
                          tooltipPosition="top-right">add</IconButton>
            </ToolbarGroup>
          </Toolbar>
        </Fixed>

     </Layout>

    )
  }

}

export default connectToStores(PagesBar)
