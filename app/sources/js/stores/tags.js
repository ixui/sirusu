import Alt from '../alt'
import TagsActions from '../actions/tags'
import UUID from '../stores/helpers/uuid'

class TagsStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(TagsActions)
    this.state = {
      tags: [
        {id: UUID.get(), name: "javascript"},
        {id: UUID.get(), name: "NodeJS"},
        {id: UUID.get(), name: "ruby"},
        {id: UUID.get(), name: "rails"},
        {id: UUID.get(), name: "react"},
        {id: UUID.get(), name: "Electron"},
      ]
    }
  }

  onFetch() {

  }

}

export default Alt.createStore(TagsStore, 'TagsStore')