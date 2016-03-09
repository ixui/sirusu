// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'

// Alt - Flux
// Actions
import BrowserActions from '../actions/browser'

// Stores
import CellsStore from '../stores/cells'
import BrowserStore from '../stores/browser'

// Design
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import IconButton from 'material-ui/lib/icon-button'
import Fullscreen from 'material-ui/lib/svg-icons/navigation/fullscreen'
import FullscreenExit from 'material-ui/lib/svg-icons/navigation/fullscreen-exit'
import Colors from 'material-ui/lib/styles/colors'

import ParserCellList from '../components/list/parser_cell.react'

const viewerStyle = {
  style: {
    padding         : 5,
    overflowY       : 'auto',
    height          : 800,
  },
}

const toolbarStyle = {
  style: {
    backgroundColor: Colors.grey100,
  },
  offIconStyle: {
    fontSize:      '24px',
    color:         Colors.grey800,
  },
  onIconStyle: {
    fontSize:      '24px',
    color:         Colors.cyan800,
  },
}

class Viewer extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
  static getStores() {
    return [CellsStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(CellsStore.getState(), BrowserStore.getState()) 
  }  

  toggleTwoScreenMode() {
    BrowserActions.toggleTwoScreenMode()
  }

  render() {

    let dynamicViewerStyle = _.merge(viewerStyle.style, {height: this.props.height - 100})

    let toggleTwoScreenModeButton = this.props.isTwoScreenMode ? (
      <IconButton onClick={this.toggleTwoScreenMode.bind(this)} 
            iconStyle={toolbarStyle.onIconStyle} 
            iconClassName="material-icons" 
            tooltip="元に戻す" 
            tooltipPosition="top-left">fullscreen_exit</IconButton>
    ) : (
      <IconButton onClick={this.toggleTwoScreenMode.bind(this)} 
            iconStyle={toolbarStyle.offIconStyle} 
            iconClassName="material-icons" 
            tooltip="2画面モードに切り替える" 
            tooltipPosition="top-left">fullscreen</IconButton>
    )


    return (

      <Layout type="column">

        <Flex style={dynamicViewerStyle}>
          <ParserCellList/>
        </Flex>

        <Fixed>
          <Toolbar style={toolbarStyle.style}>
            <ToolbarGroup firstChild={true} float="right">
              {toggleTwoScreenModeButton}
            </ToolbarGroup>
          </Toolbar>
        </Fixed>

     </Layout>

    )
  }

}

export default connectToStores(Viewer)
