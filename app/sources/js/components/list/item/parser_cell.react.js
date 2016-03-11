// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'
import Highlight from 'react-highlight'
import {MarkedPreview} from 'react-markdown-area'
import Mermaid  from '../../../components/helpers/mermaid'

// Alt - Flux
// Actions
import CellsActions  from '../../../actions/cells'
import ErrorsActions from '../../../actions/errors'
// Stores
import CellsStore from '../../../stores/cells'
import BrowserStore from '../../../stores/browser'

// Design
import Colors from 'material-ui/lib/styles/colors'

let classNames = {
  root: 'marked-area',
  header: 'marked-area-header',
  activeButton: 'marked-area-button active',
  defaultButton: 'marked-area-button',
  helpLink: 'marked-area-help-link',
  textContainer: 'marked-area-text-container',
  liveDivider: 'marked-area-live-divider'
}

class ParserCellItem extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
  static getStores() {
    return [CellsStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(CellsStore.getState(), BrowserStore.getState()) 
  }  

  render() {

    let cell = this.props.cell
    let selectedCellClassName = "viewer-cell-unselected markdown-body"
    if (this.props.currentCell && cell.id == this.props.currentCell.id) {
      selectedCellClassName = "viewer-cell-selected markdown-body"
    }

    switch(cell.type) {
      case "markdown":
          return (
            <div key={cell.id} className={selectedCellClassName}>
              <MarkedPreview classNames={classNames} value={cell.body}/>
            </div>
          )
          break
      case "code":
          return (
            <div key={cell.id} className={selectedCellClassName}>
              <Highlight className={cell.subtype}>
                {cell.body}
              </Highlight>
            </div>
          )
          break
      case "diagram":
          return (
            <div key={cell.id} className={selectedCellClassName}>
              <Mermaid text={cell.body}/>
            </div>
          )
          break
      default:
          return null
    }

  }

}

export default connectToStores(ParserCellItem)
