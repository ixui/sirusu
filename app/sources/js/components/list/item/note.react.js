// Library
import React from 'react'
import _ from 'lodash'

// Alt - Flux
// Actions
import NotebooksActions from '../../../actions/notebooks'
import TagsActions from '../../../actions/tags'
import ErrorsActions from '../../../actions/errors'

// Design
import ListItem from 'material-ui/lib/lists/list-item'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

// ******************************************************************
// Styles
// ******************************************************************

const listItemStyle = {
  style: {
    backgroundColor: Colors.cyan800,
  },
  innerDivStyle: {
    color          : Colors.grey300,
    paddingTop     : '3px',
    paddingBottom  : '3px',
    fontSize       : '12px',
  },
}

class NoteItem extends React.Component {

  selectNote() {
    TagsActions.select(null)
    NotebooksActions.select(this.props.note)
  }

  render() {

    let note = this.props.note
    let noteName = note.name
    let noteStyle = listItemStyle.style

    if (this.props.selected) {
      noteStyle = {backgroundColor: Colors.cyan700}
    }

    return (
      <ListItem onClick={this.selectNote.bind(this)} 
                style={noteStyle}
                innerDivStyle={listItemStyle.innerDivStyle} 
                primaryText={noteName} />
    )

  }

}

export default NoteItem
