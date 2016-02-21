// Library
import React from 'react'

// Alt - Flux
// Actions
import CellsActions  from '../actions/cells'

// Design
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

import Spacer from '../components/helpers/spacer.react'


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


class EditorCell extends React.Component {

  toMarkdown() {
    CellsActions.toMarkdown(this.props.cell)
  }

  toCode() {
    CellsActions.toCode(this.props.cell, "ruby")
  }

  toDiagram() {
    CellsActions.toDiagram(this.props.cell)
  }

  onChange() {
    CellsActions.update(this.props.cell, "AAAAA")
  }

  onRemove() {
    CellsActions.remove(this.props.cell)
  }

  render() {

      let cell = this.props.cell
      let type = cell.subtype ? cell.subtype : cell.type
      return (
        <div key={cell.id}>
          <Card>
            <CardHeader title={type} style={cardStyle.headerStyle} titleStyle={cardStyle.titleStyle} ></CardHeader>
            <CardText style={cardStyle.textStyle}>
              <TextField hintText="# Hello World"
                         inputStyle={cardStyle.inputStyle}
                         underlineShow={false}
                         multiLine={true} rows={1} rowsMax={1000}
                         ></TextField>
            </CardText>
            <CardActions>
              <FlatButton label="Markdown" onClick={this.toMarkdown.bind(this)} style={cardStyle.buttonStyle} labelStyle={cardStyle.buttonLabelStyle}/>
              <FlatButton label="Diagram"  onClick={this.toDiagram.bind(this)}  style={cardStyle.buttonStyle} labelStyle={cardStyle.buttonLabelStyle}/>
              <FlatButton label="Code"     onClick={this.toCode.bind(this)}     style={cardStyle.buttonStyle} labelStyle={cardStyle.buttonLabelStyle}/>
              <FlatButton label="Remove"   onClick={this.onRemove.bind(this)}   style={cardStyle.buttonStyle} labelStyle={cardStyle.delButtonLabelStyle}/>
            </CardActions>
          </Card>

          <Spacer/>

        </div>
      )
  }

}

export default EditorCell
