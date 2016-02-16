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
    borderColor: Colors.cyan800,
  },
  underlineFocusStyle: {
    borderColor: Colors.cyan300,
  },
}

const listStyle = {
  style: {
    backgroundColor: Colors.cyan700,
    paddingTop      : '1px',
    paddingBottom   : '1px',
    overflowY       : 'scroll',
    height          : '800px',
  },
  subheaderStyle: {
    backgroundColor: Colors.cyan700,
    color          : Colors.grey100,
    paddingTop     : '1px',
    paddingBottom  : '1px',
    fontSize       : '24px',
  },
}

const listItemStyle = {
  innerDivStyle: {
    color          : Colors.cyan100,
    paddingTop     : '3px',
    paddingBottom  : '3px',
    fontSize       : '14px',
  },
}

class ItemsBar extends React.Component {

  render() {

    return (

    	<div>
    		<TextField hintText="Search (All Cells)" 
    				   inputStyle={textfieldStyle.inputStyle}
    				   underlineStyle={textfieldStyle.underlineStyle}
    				   underlineFocusStyle={textfieldStyle.underlineFocusStyle}
    				   fullWidth className="search-query" />
    		<br/>
			<List subheader="Note" style={listStyle.style} subheaderStyle={listStyle.subheaderStyle}>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="javascript" secondaryText="文法まとめ"/>
		        <ListItem innerDivStyle={listItemStyle.innerDivStyle} primaryText="ruby" secondaryText="文法まとめ"/>
		    </List>
    	</div>

    )
  }

}

export default ItemsBar