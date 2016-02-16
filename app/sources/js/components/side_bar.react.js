// Library
import React from 'react'
import TextField from 'material-ui/lib/text-field'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Colors from 'material-ui/lib/styles/colors'

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

  render() {

    return (

    	<div>
    		<TextField hintText="Search (Notes, Tags)" 
    				   inputStyle={textfieldStyle.inputStyle}
    				   underlineStyle={textfieldStyle.underlineStyle}
    				   underlineFocusStyle={textfieldStyle.underlineFocusStyle}
    				   fullWidth className="search-query" />
    		<br/>
			<List subheader="Notes" style={listStyle.style} subheaderStyle={listStyle.subheaderStyle}>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="プログラミング"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="デザイン"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="インフラ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="プログラミング"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="デザイン"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="インフラ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="プログラミング"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="デザイン"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="インフラ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="プログラミング"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="デザイン"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="インフラ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="プログラミング"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="デザイン"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="インフラ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="プログラミング"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="デザイン"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="インフラ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="プログラミング"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="デザイン"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="インフラ"/>
		    </List>

			<List subheader="Tags" style={listStyle.style} subheaderStyle={listStyle.subheaderStyle}>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby"/>
		    </List>
    	</div>

    )
  }

}

export default SideBar