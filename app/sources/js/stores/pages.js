import Alt from '../alt'
import PagesActions from '../actions/pages'
import UUID from '../stores/helpers/uuid'

class PagesStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(PagesActions)
    this.pages = []
  }

  onFetch() {
    console.log("PagesStore onFetch")
    this.pages = [
        {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
        {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
        {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
        {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
        {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
        {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
        {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
        {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
        {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
        {id: UUID.get(), title: "javascript", subtitle: "文法まとめ"},
      ]
  }

}

export default Alt.createStore(PagesStore, 'PagesStore')