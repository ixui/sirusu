import alt from '../alt'

class PagesActions {

  fetch(){
    this.dispatch()
  }

  add(title, subtitle){
    this.dispatch({title: title, subtitle: subtitle})
  }

  update(name){
    this.dispatch({title: title, subtitle: subtitle})
  }

  delete(){
    this.dispatch()
  }

  select(page){
    this.dispatch({page: page})
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