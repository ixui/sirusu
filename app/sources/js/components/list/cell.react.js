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
import CellItem from '../../components/list/item/cell.react'
import Spacer from '../../components/helpers/spacer.react'

const editorStyle = {
  style: {
    overflowY       : 'auto',
    height          : '800px',
  },
}

class CellList extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
  static getStores() {
    return [CellsStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(CellsStore.getState(), BrowserStore.getState()) 
  }  

  // Alt Store との連結完了後に呼ばれるメソッド - 純正Reactでの componentDidMount で行う処理を記載することになるはず
  // Storeの変更が絡む処理は componentDidMount ではなく componentDidConnect でしないと変更検知が届かない
  static componentDidConnect(prop, context) {
    CellsActions.fetch()
  }

  render() {

    let dynamicEditorStyle = _.merge(editorStyle.style, {height: this.props.height - 100})

    let cells = this.props.cells.map ((cell) => {

      let isSelected = (cell == this.props.currentCell)

      return (
        <div key={cell.id}>
          <CellItem cell={cell} isSelected={isSelected} />
        </div>
      )
    })

    return (

      <div>
        {cells}
      </div>

  	)
  }

}

export default connectToStores(CellList)
