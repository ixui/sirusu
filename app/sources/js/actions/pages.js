import alt from '../alt'
import CellsActions from '../actions/cells'

class PagesActions {

  fetch(){
    this.dispatch()

    setTimeout(() => {
      CellsActions.fetch()
    }, 100)
  }

  add(title, subtitle){
    this.dispatch({title: title, subtitle: subtitle})

    setTimeout(() => {
      CellsActions.fetch()
    }, 100)
  }

  update(title, subtitle){
    this.dispatch({title: title, subtitle: subtitle})
  }

  delete(){
    this.dispatch()

    setTimeout(() => {
      CellsActions.fetch()
    }, 100)
  }

  select(page){
    this.dispatch({page: page})

    setTimeout(() => {
      CellsActions.fetch()
    }, 100)
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