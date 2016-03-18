// Library
import React from 'react'
import _ from 'lodash'

// Alt - Flux
// Actions
import PagesActions from '../../../actions/pages'
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
    height: 44,
    backgroundColor: Colors.cyan700,
  },
  innerDivStyle: {
    color          : Colors.cyan100,
    paddingTop     : '3px',
    paddingBottom  : '3px',
    fontSize       : '14px',
  },
}

const iconButtonStyle = {
  style: {
    padding:       2,
    width:         14,
    height:        14,
    backgroundColor: Colors.transparent,
  },
  iconStyle: {
    fontSize:      '12px',
    color:         Colors.cyan800,
  },
}

class PageItem extends React.Component {

  onSelect() {
    PagesActions.select(this.props.page)
  }

  onEdit() {
    PagesActions.select(this.props.page)
    PagesActions.showEditPageView()
  }

  render() {

    let page = this.props.page
    let pageStyle = listItemStyle.style

    if (this.props.selected) {
      pageStyle = {height: 44, backgroundColor: Colors.cyan600}
    }

    const iconButton = (
      <IconButton onClick={this.onEdit.bind(this)} 
                  style={iconButtonStyle.style}
                  iconStyle={iconButtonStyle.iconStyle} 
                  iconClassName="material-icons" 
                  tooltip="Edit" 
                  tooltipPosition="bottom-left">settings</IconButton>
    );

    return (
      <ListItem onClick={this.onSelect.bind(this)} 
                style={pageStyle}
                innerDivStyle={listItemStyle.innerDivStyle} 
                primaryText={page.title} 
                secondaryText={page.subtitle}
                rightIconButton={iconButton}/>
    )

  }

}

export default PageItem
