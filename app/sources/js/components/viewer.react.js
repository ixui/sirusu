// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'
import Highlight from 'react-highlight'
import {MarkedPreview} from 'react-markdown-area'
import Mermaid  from '../components/helpers/mermaid'

// Alt - Flux
// Actions
import CellsActions  from '../actions/cells'
import ErrorsActions from '../actions/errors'
// Stores
import CellsStore from '../stores/cells'
import BrowserStore from '../stores/browser'

let classNames = {
  root: 'marked-area',
  header: 'marked-area-header',
  activeButton: 'marked-area-button active',
  defaultButton: 'marked-area-button',
  helpLink: 'marked-area-help-link',
  textContainer: 'marked-area-text-container',
  liveDivider: 'marked-area-live-divider'
}

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

  // Alt Store との連結完了後に呼ばれるメソッド - 純正Reactでの componentDidMount で行う処理を記載することになるはず
  // Storeの変更が絡む処理は componentDidMount ではなく componentDidConnect でしないと変更検知が届かない
  static componentDidConnect(prop, context) {
    CellsActions.fetch()
  }

  render() {

    let dynamicViewerStyle = _.merge(viewerStyle.style, {height: this.props.height - 100})

    let cells = this.props.cells.map ((cell) => {

    	switch(cell.type) {
		    case "markdown":
		    		return (
		    			<div key={cell.id}>
			    			<MarkedPreview classNames={classNames} value={cell.body}/>
		    			</div>
		    		)
		        break
		    case "code":
		    		return (
		    			<div key={cell.id}>
			    			<Highlight className={cell.subtype}>
								  {cell.body}
								</Highlight>
		    			</div>
		    		)
		        break
		    case "diagram":
		    		return (
		    			<div key={cell.id}>
                <Mermaid text={cell.body}/>
		    			</div>
		    		)
		        break
		    default:
		        return null
			}

    })

    return (

      <Layout type="column">

        <Flex style={dynamicViewerStyle}>
          {cells}
        </Flex>

     </Layout>

    )
  }

}

export default connectToStores(Viewer)
