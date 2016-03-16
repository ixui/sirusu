import alt from '../alt'

class CellsActions {

  fetch(){
    this.dispatch()
  }

  add(){
    this.dispatch({})
  }

  toMarkdown(){
    this.dispatch()
  }

  toDiagram(){
    this.dispatch()
  }

  toCode(language){
    this.dispatch({language: language})
  }

  update(text){
    this.dispatch({text: text})
  }

  remove(){
    this.dispatch()
  }

  select(cell){
    this.dispatch({cell: cell})
  }

  filterLanguage(query){
    this.dispatch({query: query})
  }

  showSelectLanguageView(){
    this.dispatch()
  }

  hideSelectLanguageView(){
    this.dispatch()
  }

  moveAfter(from, to) {
    this.dispatch({from: from, to: to})
  }

}

export default alt.createActions(CellsActions)