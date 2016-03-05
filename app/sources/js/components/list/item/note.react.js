// Library
import React from 'react'
import _ from 'lodash'

// Alt - Flux
// Actions
import NotebooksActions from '../../../actions/notebooks'
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
    paddingTop     : '1px',
    paddingBottom  : '1px',
    fontSize       : '12px',
  },
}

const iconButtonStyle = {
  style: {
    padding:       2,
    width:         14,
    height:        14,
    backgroundColor: Colors.cyan800,
  },
  iconStyle: {
    fontSize:      '12px',
    color:         Colors.cyan700,
  },
}

class NoteItem extends React.Component {

  selectNote() {
    NotebooksActions.select(this.props.note)
  }

  render() {

    let note = this.props.note
    let noteName = this.props.selected ? "・" + note.name : "　" + note.name

    return (
      <ListItem onClick={this.selectNote.bind(this)} 
                style={listItemStyle.style}
                innerDivStyle={listItemStyle.innerDivStyle} 
                primaryText={noteName} />
    )

  }

}

export default NoteItem
