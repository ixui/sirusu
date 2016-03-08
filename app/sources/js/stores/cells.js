import Alt from '../alt'
import _ from 'lodash'
import CellsActions from '../actions/cells'
import UUID from '../stores/helpers/uuid'
import SettingStore from '../stores/setting'
import PagesStore from '../stores/pages'

let fs = remote.require('fs')
let path = remote.require("path")

class CellsStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(CellsActions)
    this.visibleSelectLanguageView = false
    this.originalLanguages = ['actionscript', 'apache', 'applescript', 'xml', 'asciidoc', 'aspectj', 'bash', 'clojure', 'clojure-repl', 'coffeescript', 'css', 'dart', 'delphi', 'diff', 'django', 'dos', 'dust', 'elixir', 'ruby', 'erb', 'erlang-repl', 'erlang', 'fsharp', 'go', 'gradle', 'groovy', 'haml', 'haskell', 'http', 'ini', 'java', 'javascript', 'json', 'less', 'lisp', 'lua', 'makefile', 'nginx', 'objectivec', 'perl', 'php', 'powershell', 'profile', 'puppet', 'python', 'q', 'r', 'roboconf', 'rust', 'scala', 'scheme', 'scss', 'smalltalk', 'sql', 'stylus', 'swift', 'typescript', 'vbnet', 'vbscript', 'vim']
    this.languages = ['actionscript', 'apache', 'applescript', 'xml', 'asciidoc', 'aspectj', 'bash', 'clojure', 'clojure-repl', 'coffeescript', 'css', 'dart', 'delphi', 'diff', 'django', 'dos', 'dust', 'elixir', 'ruby', 'erb', 'erlang-repl', 'erlang', 'fsharp', 'go', 'gradle', 'groovy', 'haml', 'haskell', 'http', 'ini', 'java', 'javascript', 'json', 'less', 'lisp', 'lua', 'makefile', 'nginx', 'objectivec', 'perl', 'php', 'powershell', 'profile', 'puppet', 'python', 'q', 'r', 'roboconf', 'rust', 'scala', 'scheme', 'scss', 'smalltalk', 'sql', 'stylus', 'swift', 'typescript', 'vbnet', 'vbscript', 'vim']
    this.currentCell = null // ダイアログにて現在編集中のセル 他のモデルとか意味合いが違うので注意する
    this.cells = []
  }

  Persist() {
    let dataPath = SettingStore.getState().dataPath
    let selectedPage = PagesStore.getState().currentPage
    let cellsFilePath = path.join(dataPath, "Cells", selectedPage.id+".cells")
    fs.writeFileSync(cellsFilePath, JSON.stringify(this.cells))
  }

  onFetch() {
    this.waitFor([PagesStore, SettingStore])

    // 設定からデータの取得先を取得する ************************************************************
    let dataPath = SettingStore.getState().dataPath
    let selectedPage = PagesStore.getState().currentPage

    if (selectedPage == null) {
      this.cells = []
      return
    }

    // データファイルからデータを取得する **********************************************************
    let cellsFilePath = path.join(dataPath, "Cells", selectedPage.id+".cells")
    let cells = JSON.parse(fs.readFileSync(cellsFilePath, 'utf8'));
    this.cells = cells
 
  }

  onAdd(data){

    let cell = {id: UUID.get(), type: "markdown", subtype: null, body: "# Hello World"}
    this.cells.push(cell)

    this.Persist()
  }

  onToMarkdown(data){
    this.cells = _.map(this.cells, (cell) => {
      if (data.id == cell.id) _.merge(cell, {type: "markdown", subtype: null}) 
      return cell
    })

    this.Persist()
  }

  onToDiagram(data){
    this.cells = _.map(this.cells, (cell) => {
      if (data.id == cell.id) _.merge(cell, {type: "diagram", subtype: null}) 
      return cell
    })

    this.Persist()
  }

  onToCode(data){
    this.cells = _.map(this.cells, (cell) => {
      if (data.id == cell.id) _.merge(cell, {type: "code", subtype: data.language}) 
      return cell
    })

    this.Persist()
  }

  onUpdate(data){
    this.cells = _.map(this.cells, (cell) => {
      if (data.id == cell.id) _.merge(cell, {body: data.text}) 
      return cell
    })

    this.Persist()
  }

  onRemove(data){
    this.cells = _.reject(this.cells, ["id", data.id])

    this.Persist()
  }

  onFilterLanguage(data){
    let query = _.lowerCase(data.query)
    this.languages = this.originalLanguages
    this.languages = _.filter(this.languages, language => {
      let name = _.lowerCase(language)
      return (name.indexOf(query) > -1)
    })
  }

  onShowSelectLanguageView(data){
    this.currentCell = _.find(this.cells, cell => {
      return (cell.id == data.id)
    })
    this.visibleSelectLanguageView = true
  }

  onHideSelectLanguageView(){
    this.currentCell = null
    this.visibleSelectLanguageView = false
  }

}

export default Alt.createStore(CellsStore, 'CellsStore')