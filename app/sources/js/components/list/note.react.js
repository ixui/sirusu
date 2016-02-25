// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import _ from 'lodash'

// Alt - Flux
// Actions
import NotebooksActions from '../../actions/notebooks'
import ErrorsActions from '../../actions/errors'
// Stores
import NotebooksStore from '../../stores/notebooks'
import BrowserStore from '../../stores/browser'

// Design
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

import NoteItem from '../../components/list/item/note.react'
import NewNoteDialog from '../../components/dialog/new_note_dialog.react'
import EditNoteDialog from '../../components/dialog/edit_note_dialog.react'

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

class NoteList extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
	static getStores() {
    return [NotebooksStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(NotebooksStore.getState(), BrowserStore.getState()) 
  }  

  // Alt Store との連結完了後に呼ばれるメソッド - 純正Reactでの componentDidMount で行う処理を記載することになるはず
  // Storeの変更が絡む処理は componentDidMount ではなく componentDidConnect でしないと変更検知が届かない
  static componentDidConnect(prop, context) {
    NotebooksActions.fetch()
  }

  render() {

    let dynamicListStyle = _.merge(listStyle.style, {height: (this.props.height - 100) / 2})

  	let notes = this.props.notes.map((note, index) => {

      let selected = this.props.currentNote ? (this.props.currentNote.id == note.id) : false

      return (
        <NoteItem key={note.id} note={note} selected={selected}/>
      )
  	})

    return (

      <div>
        <NewNoteDialog/>
        <EditNoteDialog/>
        <List subheader="Notes" style={dynamicListStyle} subheaderStyle={listStyle.subheaderStyle}>
          {notes}
        </List>
      </div>

    )
  }

}

export default connectToStores(NoteList)
