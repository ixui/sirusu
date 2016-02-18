// Library
import React from 'react'

// Design
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import RaisedButton from 'material-ui/lib/raised-button'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import Colors from 'material-ui/lib/styles/colors'

import Spacer from '../components/helpers/spacer.react'


const toolbarStyle = {
  style: {
  	marginTop:       '-10px',
  	marginBottom:    '10px',
  	backgroundColor: Colors.grey100,
  },
  buttonLabelStyle: {
    fontSize:      '14px',
    color:         Colors.grey500,
  },
}

const cardStyle = {
  headerStyle: {
    height:        '10px',
    paddingTop:    '3px',
    paddingBottom: '3px',
    paddingLeft:   '3px',
  },
  titleStyle: {
    fontSize:      '10px',
    color:         Colors.grey300,
  },
  textStyle: {
    maxHeight:     '300px',
    overflowY:     'scroll',
  },
  inputStyle: {
  },
  buttonStyle: {
    margin:        -10,
  },
  buttonLabelStyle: {
    fontSize:      '10px',
    color:         Colors.grey500,
  },
  delButtonLabelStyle: {
    fontSize:      '10px',
    color:         Colors.red500,
    fontWeight:    'bold'
  },
}


class Editor extends React.Component {

  render() {

    return (

    	<div>

				<Toolbar style={toolbarStyle.style}>
				    <ToolbarGroup firstChild={true} float="left">
				    </ToolbarGroup>
				    <ToolbarGroup float="right">
					    <RaisedButton label="New Cell" fullWidth labelStyle={toolbarStyle.buttonLabelStyle} />
				    </ToolbarGroup>
				  </Toolbar>

				<Card>
					<CardHeader title="Markdown" style={cardStyle.headerStyle} titleStyle={cardStyle.titleStyle} ></CardHeader>
				  <CardText style={cardStyle.textStyle}>
				  	<TextField hintText="# Hello World"
				    				   inputStyle={cardStyle.inputStyle}
				    				   underlineShow={false}
      								 multiLine={true} rows={1} rowsMax={1000}></TextField>
			    </CardText>
				  <CardActions>
				    <FlatButton label="Markdown" style={cardStyle.buttonStyle} labelStyle={cardStyle.buttonLabelStyle}/>
				    <FlatButton label="Diagram"  style={cardStyle.buttonStyle} labelStyle={cardStyle.buttonLabelStyle}/>
				    <FlatButton label="Code"     style={cardStyle.buttonStyle} labelStyle={cardStyle.buttonLabelStyle}/>
				    <FlatButton label="Remove"   style={cardStyle.buttonStyle} labelStyle={cardStyle.delButtonLabelStyle}/>
				  </CardActions>
				</Card>

				<Spacer/>

				<Card>
					<CardHeader title="javascript" style={cardStyle.headerStyle} titleStyle={cardStyle.titleStyle} ></CardHeader>
				  <CardText style={cardStyle.textStyle}>
				  	<TextField hintText="# Hello World"
				    				   inputStyle={cardStyle.inputStyle}
				    				   underlineShow={false}
      								 multiLine={true} rows={1} rowsMax={1000}></TextField>
			    </CardText>
				  <CardActions>
				    <FlatButton label="Markdown" style={cardStyle.buttonStyle} labelStyle={cardStyle.buttonLabelStyle}/>
				    <FlatButton label="Diagram"  style={cardStyle.buttonStyle} labelStyle={cardStyle.buttonLabelStyle}/>
				    <FlatButton label="Code"     style={cardStyle.buttonStyle} labelStyle={cardStyle.buttonLabelStyle}/>
				    <FlatButton label="Remove"   style={cardStyle.buttonStyle} labelStyle={cardStyle.delButtonLabelStyle}/>
				  </CardActions>
				</Card>

				<Spacer/>

			</div>
  	)
  }

}

export default Editor