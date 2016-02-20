// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'

// Alt - Flux
// Actions
import CellsActions  from '../actions/cells'
import ErrorsActions from '../actions/errors'
// Stores
import CellsStore from '../stores/cells'
import BrowserStore from '../stores/browser'

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
import IconButton from 'material-ui/lib/icon-button'
import Colors from 'material-ui/lib/styles/colors'

import Spacer from '../components/helpers/spacer.react'


const toolbarStyle = {
  style: {
  	backgroundColor: Colors.grey100,
  },
  iconStyle: {
    fontSize:      '24px',
    color:         Colors.cyan800,
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

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
  static getStores() {
    return [CellsStore, BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return _.merge(CellsStore.getState(), BrowserStore.getState()) 
  }  

  // Alt Store との連結完了後に呼ばれるメソッド - 純正Reactでの componentDidMount で行う処理を記載することになるはず
  // Storeの変更が絡む処理は componentDidMount ではなく componentDidConnect でしないと変更検知が届かない
  static componentDidConnect(prop, context) {
    CellsActions.fetch()
  }

  render() {

    let cells = this.props.cells.map ((cell) => {
      let type = cell.subtype ? cell.subtype : cell.type
      return (
        <div key={cell.id}>
          <Card>
            <CardHeader title={type} style={cardStyle.headerStyle} titleStyle={cardStyle.titleStyle} ></CardHeader>
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
    })

    return (

      <Layout type="column">

        <Flex>
          {cells}
        </Flex>

        <Fixed>
          <Toolbar style={toolbarStyle.style}>
            <ToolbarGroup firstChild={true} float="left">
              <IconButton iconStyle={toolbarStyle.iconStyle} iconClassName="material-icons" tooltip="セルの追加" tooltipPosition="top-center">add</IconButton>
            </ToolbarGroup>
          </Toolbar>
        </Fixed>

     </Layout>

  	)
  }

}

export default connectToStores(Editor)
