// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import _ from 'lodash'

// Alt - Flux
// Actions
import PagesActions from '../../actions/pages'
import ErrorsActions from '../../actions/errors'
// Stores
import PagesStore from '../../stores/pages'
import BrowserStore from '../../stores/browser'

// Design
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

import PageItem from '../../components/list/item/page.react'
import NewPageDialog from '../../components/dialog/new_page_dialog.react'
import EditPageDialog from '../../components/dialog/edit_page_dialog.react'

// ******************************************************************
// Styles
// ******************************************************************

const listStyle = {
  style: {
    backgroundColor: Colors.cyan700,
    paddingTop      : '1px',
    paddingBottom   : '1px',
    overflowY       : 'auto',
    height          : '800px',
  },
}

class PageList extends React.Component {

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

  render() {

    let dynamicListStyle = _.merge(listStyle.style, {height: this.props.height - 100})

    let pages = this.props.pages.map((page, index) => {

      let selected = this.props.currentPage ? (this.props.currentPage.id == page.id) : false

      return (
        <PageItem key={page.id} page={page} selected={selected}/>
      )
    })

    return (

      <div>
        <NewPageDialog/>
        <EditPageDialog/>
        <List style={dynamicListStyle}>
          {pages}
        </List>
      </div>

    )
  }

}

export default connectToStores(PageList)
