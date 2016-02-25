import alt from '../alt'

class NotebooksActions {

  fetch(){
    this.dispatch()
  }

  add(name){
    this.dispatch({name: name})
  }

  update(name){
    this.dispatch({name: name})
  }

  delete(){
    this.dispatch()
  }

  select(note){
    this.dispatch({note: note})
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