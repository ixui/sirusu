import Alt from '../alt'
import _ from 'lodash'
import CellsActions from '../actions/cells'
import UUID from '../stores/helpers/uuid'

class CellsStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(CellsActions)
    this.cells = []
  }

  onFetch() {
    this.cells = [
        {id: UUID.get(), type: "markdown", subtype: null, body: "# Hello World"},
        {id: UUID.get(), type: "code", subtype: "javascript", body: "alert('Hello World')"},
      ]
  }

  onToMarkdown(data){
    this.cells = _.map(this.cells, (cell) => {
      if (data.id == cell.id) _.merge(cell, {type: "markdown", subtype: null}) 
      return cell
    })
  }

  onToDiagram(data){
    this.cells = _.map(this.cells, (cell) => {
      if (data.id == cell.id) _.merge(cell, {type: "diagram", subtype: null}) 
      return cell
    })
  }

  onToCode(data){
    this.cells = _.map(this.cells, (cell) => {
      if (data.id == cell.id) _.merge(cell, {type: "code", subtype: data.language}) 
      return cell
    })
  }

  onUpdate(data){
    this.cells = _.map(this.cells, (cell) => {
      if (data.id == cell.id) _.merge(cell, {body: data.text}) 
      return cell
    })
  }

  onRemove(data){
    this.cells = _.reject(this.cells, ["id", data.id])
  }

}

export default Alt.createStore(CellsStore, 'CellsStore')