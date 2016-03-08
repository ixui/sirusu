// Library
import React from 'react'

// Alt - Flux
// Actions
import CellsActions  from '../../../actions/cells'

// Design
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

import Spacer from '../../../components/helpers/spacer.react'


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
    overflowY:     'auto',
  },
  inputStyle: {
  },
  buttonStyle: {
    margin:        -16,
    paddingTop:    2,
    paddingBottom: 2,
    paddingLeft:   4,
    paddingRight:  4,
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
  iconStyle: {
    fontSize:      '24px',
    color:         Colors.cyan700,
  },
  deliconStyle: {
    fontSize:      '24px',
    color:         Colors.red300,
  },
}


class CellItem extends React.Component {

  toMarkdown() {
    CellsActions.select(this.props.cell)
    CellsActions.toMarkdown()
  }

  toCode() {
    CellsActions.select(this.props.cell)
    CellsActions.showSelectLanguageView()
  }

  toDiagram() {
    CellsActions.select(this.props.cell)
    CellsActions.toDiagram()
  }

  onChange() {
    let text = this.refs.bodyText.getValue()
    CellsActions.select(this.props.cell)
    CellsActions.update(text)
  }

  onRemove() {
    CellsActions.select(this.props.cell)
    CellsActions.remove()
  }

  render() {

      let cell = this.props.cell
      let type = cell.subtype ? cell.subtype : cell.type
      let bodyText = cell.body ? cell.body : ""
      
      return (
        <div key={cell.id}>
          <Card>
            <CardHeader title={type} style={cardStyle.headerStyle} titleStyle={cardStyle.titleStyle} ></CardHeader>
            <CardText style={cardStyle.textStyle}>
              <TextField hintText="# Hello World"
                         inputStyle={cardStyle.inputStyle}
                         underlineShow={false}
                         multiLine={true} rows={1} rowsMax={1000}
                         fullWidth={true}
                         onChange={this.onChange.bind(this)}
                         value={bodyText} 
                         ref="bodyText"
                         ></TextField>
            </CardText>
            <CardActions>
              <IconButton onClick={this.toMarkdown.bind(this)} iconStyle={cardStyle.iconStyle} iconClassName="material-icons" tooltip="Markdown" tooltipPosition="top-right">class</IconButton>
              <IconButton onClick={this.toDiagram.bind(this)} iconStyle={cardStyle.iconStyle} iconClassName="material-icons" tooltip="Diagram" tooltipPosition="top-right">donut_small</IconButton>
              <IconButton onClick={this.toCode.bind(this)} iconStyle={cardStyle.iconStyle} iconClassName="material-icons" tooltip="Code" tooltipPosition="top-right">developer_mode</IconButton>

              <IconButton onClick={this.onRemove.bind(this)} iconStyle={cardStyle.deliconStyle} iconClassName="material-icons" tooltip="削除" tooltipPosition="top-right">remove_circle</IconButton>
            </CardActions>
          </Card>

          <Spacer/>

        </div>
      )
  }

}

export default CellItem
