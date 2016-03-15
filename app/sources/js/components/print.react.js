// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'
import _ from 'lodash'

// Alt - Flux
import BrowserActions from '../actions/browser'
import ErrorsActions from '../actions/errors'
import BrowserStore from '../stores/browser'
import SettingStore from '../stores/setting'

// Design
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

let fs = remote.require('fs')
let path = remote.require("path")

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
    return [BrowserStore, SettingStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(BrowserStore.getState(), SettingStore.getState())
  }  

  print() {
    this.refs.webview.printToPDF({}, (error, data) => {
      if (error) throw error
      fs.writeFile(path.join(this.props.dataPath, "current.pdf"), data, (error) => {
        if (error) throw error
        console.log("Write PDF successfully.")
      })
    })
  }

  close() {
    BrowserActions.togglePrintMode()
  }

  render() {

    return (

      <Layout type="column">
        <Fixed>
          <Toolbar style={toolbarStyle.style}>
            <ToolbarGroup firstChild={true} float="right">
              <IconButton onClick={this.print.bind(this)} 
                          iconStyle={toolbarStyle.iconStyle} 
                          iconClassName="material-icons">print</IconButton>
              <IconButton onClick={this.close.bind(this)} 
                          iconStyle={toolbarStyle.iconStyle} 
                          iconClassName="material-icons">close</IconButton>
            </ToolbarGroup>
          </Toolbar>
        </Fixed>
        <Flex className="printarea">
          <webview src="https://qiita.com" ref="webview"></webview>
        </Flex>
      </Layout>

    )
  }

}

export default connectToStores(Print)
