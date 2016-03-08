// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import _ from 'lodash'

// Alt - Flux
// Actions
import CellsActions from '../../actions/cells'
import ErrorsActions from '../../actions/errors'
// Stores
import CellsStore from '../../stores/cells'

// Design
import TextField from 'material-ui/lib/text-field'
import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import Colors from 'material-ui/lib/styles/colors'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'

// ******************************************************************
// Styles
// ******************************************************************

const inputFieldStyle = {
  inputStyle: {
    color:   Colors.grey800,
    padding: 5,
  },
  underlineStyle: {
    borderColor: Colors.cyan700,
  },
  underlineFocusStyle: {
    borderColor: Colors.cyan300,
  },
}

class SelectLanguageDialog extends React.Component {


  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
	static getStores() {
    return [CellsStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return CellsStore.getState()
  }  

  rowSelect(e) {
    let language = this.props.languages[e]
    CellsActions.toCode(language)
  }

  filter() {
    let filterQuery = this.refs.filterQuery.getValue()
    CellsActions.filterLanguage(filterQuery)
  }

  hideSelectLanguageView() {
    CellsActions.hideSelectLanguageView()
  }

  render() {

    let actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.hideSelectLanguageView.bind(this)}></FlatButton>,
    ]

    let languages = this.props.languages.map((language, index) => {

      let selected = (this.props.currentCell && this.props.currentCell.subtype == language) ? true : false
      return (
        <TableRow key={index} selected={selected}>
          <TableHeaderColumn>{language}</TableHeaderColumn>
        </TableRow>
      )
    })

    return (

      <Dialog title="言語の選択"
        actions={actions}
        modal={true}
        open={this.props.visibleSelectLanguageView}
        onRequestClose={this.hideSelectLanguageView.bind(this)}>

        <TextField hintText="絞り込み" 
               inputStyle={inputFieldStyle.inputStyle}
               underlineStyle={inputFieldStyle.underlineStyle}
               underlineFocusStyle={inputFieldStyle.underlineFocusStyle}
               onChange={this.filter.bind(this)}
               ref="filterQuery"
               fullWidth />

        <Table height="300" onRowSelection={this.rowSelect.bind(this)}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>言語</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody>
              {languages}
            </TableBody>

        </Table>

      </Dialog>

    )
  }

}

export default connectToStores(SelectLanguageDialog)
