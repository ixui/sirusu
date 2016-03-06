import alt from '../alt'
import PagesActions from '../actions/pages'

class TagsActions {

  fetch(){
    this.dispatch()

    setTimeout(() => {
      PagesActions.fetch()
    }, 100)
  }

  select(tag){
    this.dispatch({tag: tag})

    setTimeout(() => {
      PagesActions.fetch()
    }, 100)
  }

}

export default alt.createActions(TagsActions)