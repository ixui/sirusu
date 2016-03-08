// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'

// Alt - Flux
// Stores
import CellsStore from '../stores/cells'
import BrowserStore from '../stores/browser'

import ParserCellList from '../components/list/parser_cell.react'

const viewerStyle = {
  style: {
    padding         : 5,
    overflowY       : 'auto',
    height          : 800,
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

  render() {

    let dynamicViewerStyle = _.merge(viewerStyle.style, {height: this.props.height - 100})

    return (

      <Layout type="column">

        <Flex style={dynamicViewerStyle}>
          <ParserCellList/>
        </Flex>

     </Layout>

    )
  }

}

export default connectToStores(Viewer)
