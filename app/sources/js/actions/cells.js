import alt from '../alt'

class CellsActions {

  fetch(){
    this.dispatch()
  }

  toMarkdown(cell){
    this.dispatch({id: cell.id})
  }

  toDiagram(cell){
    this.dispatch({id: cell.id})
  }

  toCode(cell, language){
    this.dispatch({id: cell.id, language: language})
  }

  update(cell, text){
    this.dispatch({id: cell.id, text: text})
  }

  remove(cell){
    this.dispatch({id: cell.id})
  }

}

export default alt.createActions(CellsActions)