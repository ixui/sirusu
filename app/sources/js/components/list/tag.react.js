// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import _ from 'lodash'

// Alt - Flux
// Actions
import TagsActions from '../../actions/tags'
import ErrorsActions from '../../actions/errors'
// Stores
import TagsStore from '../../stores/tags'
import BrowserStore from '../../stores/browser'

// Design
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

import TagItem from '../../components/list/item/tag.react'

// ******************************************************************
// Styles
// ******************************************************************

const listStyle = {
  style: {
    backgroundColor: Colors.cyan800,
    paddingTop      : '1px',
    paddingBottom   : '1px',
    overflowY       : 'auto',
    height          : '400px',

  },
  subheaderStyle: {
    backgroundColor: Colors.cyan800,
    color          : Colors.grey100,
    paddingTop     : '1px',
    paddingBottom  : '1px',
    fontSize       : '12px',
  },
}

const listIconStyle = {
  style: {
    padding:       2,
    width:         12,
    height:        12,
  },
  iconStyle: {
    fontSize:      '12px',
    color:         Colors.cyan700,
  },
}

class TagList extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
	static getStores() {
    return [TagsStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(TagsStore.getState(), BrowserStore.getState()) 
  }  

  // Alt Store との連結完了後に呼ばれるメソッド - 純正Reactでの componentDidMount で行う処理を記載することになるはず
  // Storeの変更が絡む処理は componentDidMount ではなく componentDidConnect でしないと変更検知が届かない
  static componentDidConnect(prop, context) {
    TagsActions.fetch()
  }

  render() {

    let dynamicListStyle = _.merge(listStyle.style, {height: (this.props.height - 100) / 2})

    let tags = this.props.tags.map((tag, index) => {

      let selected = this.props.currentTag ? (this.props.currentTag.id == tag.id) : false

      return (
        <TagItem key={tag.id} tag={tag} selected={selected}/>
      )
    })

    return (

      <List subheader="Tags" style={dynamicListStyle} subheaderStyle={listStyle.subheaderStyle}>
        {tags}
      </List>

    )
  }

}

export default connectToStores(TagList)
