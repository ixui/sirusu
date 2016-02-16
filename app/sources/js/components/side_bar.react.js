// Library
import connectToStores from 'alt-utils/lib/connectToStores'
import React from 'react'
import _ from 'lodash'

// Alt - Flux
import NotebooksActions from '../actions/notebooks'
import NotebooksStore from '../stores/notebooks'
import TagsActions from '../actions/tags'
import TagsStore from '../stores/tags'

// Design
import TextField from 'material-ui/lib/text-field'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Colors from 'material-ui/lib/styles/colors'

// ******************************************************************
// Styles
// ******************************************************************
const textfieldStyle = {
  inputStyle: {
    color: Colors.white,
  },
  underlineStyle: {
    borderColor: Colors.cyan700,
  },
  underlineFocusStyle: {
    borderColor: Colors.cyan300,
  },
}

const listStyle = {
  style: {
    backgroundColor: Colors.cyan800,
    paddingTop      : '1px',
    paddingBottom   : '1px',
    overflowY       : 'scroll',
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

const listItemStyle = {
  innerDivStyle: {
    color          : Colors.grey100,
    paddingTop     : '1px',
    paddingBottom  : '1px',
    fontSize       : '12px',
  },
}

class SideBar extends React.Component {

	static getStores() {
    return [NotebooksStore, TagsStore]
  }

  static getPropsFromStores() {
    return _.merge(NotebooksStore.getState(), TagsStore.getState()) 
  }  

  render() {

  	let notes = this.props.notes.map((note, index) => {
  		return (
        <ListItem key={note.id} innerDivStyle={listItemStyle.innerDivStyle} primaryText={note.name}/>
  		)
  	})

    let tags = this.props.tags.map((tag, index) => {
      return (
        <ListItem key={tag.id} innerDivStyle={listItemStyle.innerDivStyle} primaryText={tag.name}/>
      )
    })

    return (

    	<div>

    		<TextField hintText="Search (Notes, Tags)" 
    				   inputStyle={textfieldStyle.inputStyle}
    				   underlineStyle={textfieldStyle.underlineStyle}
    				   underlineFocusStyle={textfieldStyle.underlineFocusStyle}
    				   fullWidth className="search-query" />
    		<br/>
  			<List subheader="Notes" style={listStyle.style} subheaderStyle={listStyle.subheaderStyle}>
  				{notes}
  		  </List>

  			<List subheader="Tags" style={listStyle.style} subheaderStyle={listStyle.subheaderStyle}>
          {tags}
  		  </List>

    	</div>

    )
  }

}

export default connectToStores(SideBar)
