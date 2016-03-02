import alt from '../alt'
import PagesActions from '../actions/pages'

class NotebooksActions {

  fetch(){
    this.dispatch()

    setTimeout(() => {
      PagesActions.fetch()
    }, 100)
  }

  add(name){
    this.dispatch({name: name})

    setTimeout(() => {
      PagesActions.fetch()
    }, 100)
  }

  update(name){
    this.dispatch({name: name})
  }

  delete(){
    this.dispatch()

    setTimeout(() => {
      PagesActions.fetch()
    }, 100)
  }

  select(note){
    this.dispatch({note: note})

    setTimeout(() => {
      PagesActions.fetch()
    }, 100)
  }

  showNewNoteView(){
    this.dispatch()
  }

  showEditNoteView(){
    this.dispatch()
  }

  hideNewNoteView(){
    this.dispatch()
  }

  hideEditNoteView(){
    this.dispatch()
  }

}

export default alt.createActions(NotebooksActions)