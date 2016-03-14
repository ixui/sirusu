// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'

// Alt - Flux
import BrowserActions from '../actions/browser'
import ErrorsActions from '../actions/errors'
import CellsStore from '../stores/cells'

// Design
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

const toolbarStyle = {
  style: {
    backgroundColor: Colors.cyan800,
  },
  iconStyle: {
    fontSize:      '24px',
    color:         Colors.cyan700,
  },
}

class Print extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
  static getStores() {
    return [CellsStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return CellsStore.getState()
  }  

  onClose() {
    BrowserActions.togglePrintMode()
  }

  render() {

    return (

      <Layout type="column">
        <Fixed>
          <Toolbar style={toolbarStyle.style}>
            <ToolbarGroup firstChild={true} float="right">
              <IconButton onClick={this.onClose.bind(this)} 
                          iconStyle={toolbarStyle.iconStyle} 
                          iconClassName="material-icons">print</IconButton>
              <IconButton onClick={this.onClose.bind(this)} 
                          iconStyle={toolbarStyle.iconStyle} 
                          iconClassName="material-icons">close</IconButton>
            </ToolbarGroup>
          </Toolbar>
        </Fixed>
        <Flex className="printarea">
          <webview src="https://qiita.com"></webview>
        </Flex>
      </Layout>

    )
  }

}

export default connectToStores(Print)
