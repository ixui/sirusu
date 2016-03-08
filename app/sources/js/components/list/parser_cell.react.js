// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'

// Alt - Flux
// Actions
import CellsActions  from '../../actions/cells'
import ErrorsActions from '../../actions/errors'
// Stores
import CellsStore from '../../stores/cells'
import BrowserStore from '../../stores/browser'

// Design
import ParserCellItem from '../../components/list/item/parser_cell.react'


class ParserCellList extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
  static getStores() {
    return [CellsStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(CellsStore.getState(), BrowserStore.getState()) 
  }  

  render() {

    let cells = this.props.cells.map ((cell) => {
      return <ParserCellItem key={cell.id} cell={cell}/>
    })

    return (

      <div>
        {cells}
      </div>

  	)
  }

}

export default connectToStores(ParserCellList)
