// Library
import React from 'react'
import {Motion, spring} from 'react-motion'
import { Draggable, Droppable } from 'react-drag-and-drop'


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

let dialog = remote.require('dialog')
let browserWindow = remote.require('browser-window')


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
    maxHeight:     '700px',
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

  constructor() {
    super()
    this.state = {
      dragover: false
    }
  }

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

    let options = {
        title: 'セルの削除',
        type: 'question',
        buttons: ['OK', 'Cancel'],
        message: '選択中のセルを削除してもよろしいですか？',
    };

    dialog.showMessageBox(options, response => {
      if (response == 0 ) { // OK
        CellsActions.select(this.props.cell)
        CellsActions.remove()
      }
    })
  }

  onSelect() {
    CellsActions.select(this.props.cell)
  }

  onDrop(data) {
    this.setState({dragover: false})
    CellsActions.moveAfter(data.cell, this.props.cell.id)
  }

  onDragEnter(data) {
    this.setState({dragover: true})
  }

  onDragLeave(data) {
    this.setState({dragover: false})
  }

  render() {

      let cell = this.props.cell
      let type = cell.subtype ? cell.subtype : cell.type
      let bodyText = cell.body ? cell.body : ""
      let actions = this.props.isSelected ? (

        <Motion defaultStyle={{height: 0}} style={{height: spring(70)}}>
          {interpolatingStyle => (
            <CardActions style={interpolatingStyle}>
              <IconButton onClick={this.toMarkdown.bind(this)} iconStyle={cardStyle.iconStyle} iconClassName="material-icons" tooltip="Markdown" tooltipPosition="top-right">class</IconButton>
              <IconButton onClick={this.toDiagram.bind(this)} iconStyle={cardStyle.iconStyle} iconClassName="material-icons" tooltip="Diagram" tooltipPosition="top-right">donut_small</IconButton>
              <IconButton onClick={this.toCode.bind(this)} iconStyle={cardStyle.iconStyle} iconClassName="material-icons" tooltip="Code" tooltipPosition="top-right">developer_mode</IconButton>

              <IconButton onClick={this.onRemove.bind(this)} iconStyle={cardStyle.deliconStyle} iconClassName="material-icons" tooltip="削除" tooltipPosition="top-right">remove_circle</IconButton>
            </CardActions>
          )}
        </Motion>

      ) : (

        <Motion defaultStyle={{height: 0}} style={{height: spring(0)}}>
          {interpolatingStyle => (
            <CardActions style={interpolatingStyle}>
              <IconButton onClick={this.toMarkdown.bind(this)} iconStyle={cardStyle.iconStyle} iconClassName="material-icons" tooltip="Markdown" tooltipPosition="top-right">class</IconButton>
              <IconButton onClick={this.toDiagram.bind(this)} iconStyle={cardStyle.iconStyle} iconClassName="material-icons" tooltip="Diagram" tooltipPosition="top-right">donut_small</IconButton>
              <IconButton onClick={this.toCode.bind(this)} iconStyle={cardStyle.iconStyle} iconClassName="material-icons" tooltip="Code" tooltipPosition="top-right">developer_mode</IconButton>

              <IconButton onClick={this.onRemove.bind(this)} iconStyle={cardStyle.deliconStyle} iconClassName="material-icons" tooltip="削除" tooltipPosition="top-right">remove_circle</IconButton>
            </CardActions>
          )}
        </Motion>

      )
      
      let droppableStyle = this.state.dragover ? {backgroundColor: "#FAFAFA", height: 10} : {backgroundColor: "#FAFAFA", height: 5}

      return (
        <div>
          <Draggable type="cell" data={cell.id} >

            <Card onFocus={this.onSelect.bind(this)}>
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

              {actions}

            </Card>

            <Spacer/>

          </Draggable>

          <Droppable types={['cell']} 
                     onDrop={this.onDrop.bind(this)}
                     onDragEnter={this.onDragEnter.bind(this)}
                     onDragLeave={this.onDragLeave.bind(this)}
                     style={droppableStyle}>
            &nbsp;
          </Droppable>
        </div>
      )
  }

}

export default CellItem
