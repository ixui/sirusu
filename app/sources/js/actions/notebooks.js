import alt from '../alt'
import PagesActions from '../actions/pages'

class NotebooksActions {

  fetch(){
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

}

export default alt.createActions(NotebooksActions)