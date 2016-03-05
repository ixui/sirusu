import alt from '../alt'
import NotebooksActions from '../actions/notebooks'
import CellsActions from '../actions/cells'

class PagesActions {

  fetch(){
    this.dispatch()

    setTimeout(() => {
      CellsActions.fetch()
    }, 500)
  }

  add(title, subtitle, note, tag){
    this.dispatch({title: title, subtitle: subtitle, note: note, tag: tag})

    setTimeout(() => {
      NotebooksActions.fetch()
      CellsActions.fetch()
    }, 500)
  }

  update(title, subtitle){
    this.dispatch({title: title, subtitle: subtitle, note: note, tag: tag})

    setTimeout(() => {
      NotebooksActions.fetch()
      CellsActions.fetch()
    }, 500)
  }

  delete(){
    this.dispatch()

    setTimeout(() => {
      NotebooksActions.fetch()
      CellsActions.fetch()
    }, 500)
  }

  select(page){
    this.dispatch({page: page})

    setTimeout(() => {
      CellsActions.fetch()
    }, 500)
  }

  showNewPageView(){
    this.dispatch()
  }

  showEditPageView(){
    this.dispatch()
  }

  hideNewPageView(){
    this.dispatch()
  }

  hideEditPageView(){
    this.dispatch()
  }


}

export default alt.createActions(PagesActions)