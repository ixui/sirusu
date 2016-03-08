import alt from '../alt'
import NotebooksActions from '../actions/notebooks'
import TagsActions from '../actions/tags'
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
      TagsActions.fetch()
      CellsActions.fetch()
    }, 500)
  }

  update(title, subtitle, note, tag){
    this.dispatch({title: title, subtitle: subtitle, note: note, tag: tag})

    setTimeout(() => {
      NotebooksActions.fetch()
      TagsActions.fetch()
      CellsActions.fetch()
    }, 500)
  }

  delete(){
    this.dispatch()

    setTimeout(() => {
      NotebooksActions.fetch()
      TagsActions.fetch()
      CellsActions.fetch()
    }, 500)
  }

  select(page){
    this.dispatch({page: page})

    setTimeout(() => {
      CellsActions.fetch()
    }, 500)
  }

  search(query){
    this.dispatch({query: query})
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