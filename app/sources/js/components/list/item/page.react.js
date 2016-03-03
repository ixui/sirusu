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

  selectPage() {
    PagesActions.select(this.props.page)
  }

  editPage() {
    PagesActions.select(this.props.page)
    PagesActions.showEditPageView()
  }

  render() {

    let page = this.props.page
    let pageName = this.props.selected ? "・" + page.title : "　" + page.title

    const iconButton = (
      <IconButton onClick={this.editPage.bind(this)} 
                  style={iconButtonStyle.style}
                  iconStyle={iconButtonStyle.iconStyle} 
                  iconClassName="material-icons" 
                  tooltip="Edit" 
                  tooltipPosition="top-left">settings</IconButton>
    );

    return (
      <ListItem onClick={this.selectPage.bind(this)} 
                innerDivStyle={listItemStyle.innerDivStyle} 
                primaryText={pageName} 
                secondaryText={page.subtitle}
                rightIconButton={iconButton}/>
    )

  }

}

export default PageItem
