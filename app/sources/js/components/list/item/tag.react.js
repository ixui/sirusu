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

class TagItem extends React.Component {

  selectTag() {
    NotebooksActions.select(null)
    TagsActions.select(this.props.tag)
  }

  render() {

    let tag = this.props.tag
    let tagName = tag.name
    let tagStyle = listItemStyle.style

    if (this.props.selected) {
      tagStyle = {backgroundColor: Colors.cyan700}
    }

    return (
      <ListItem onClick={this.selectTag.bind(this)} 
                style={tagStyle}
                innerDivStyle={listItemStyle.innerDivStyle} 
                primaryText={tagName} />
    )

  }

}

export default TagItem
