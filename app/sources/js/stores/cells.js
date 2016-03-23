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
    // 言語選択関連
    this.visibleSelectLanguageView = false
    this.originalLanguages = ['actionscript', 'apache', 'applescript', 'xml', 'asciidoc', 'aspectj', 'bash', 'clojure', 'clojure-repl', 'coffeescript', 'css', 'dart', 'delphi', 'diff', 'django', 'dos', 'dust', 'elixir', 'ruby', 'erb', 'erlang-repl', 'erlang', 'fsharp', 'go', 'gradle', 'groovy', 'haml', 'haskell', 'http', 'ini', 'java', 'javascript', 'json', 'less', 'lisp', 'lua', 'makefile', 'nginx', 'objectivec', 'perl', 'php', 'powershell', 'profile', 'puppet', 'python', 'q', 'r', 'roboconf', 'rust', 'scala', 'scheme', 'scss', 'smalltalk', 'sql', 'stylus', 'swift', 'typescript', 'vbnet', 'vbscript', 'vim']
    this.languages = ['actionscript', 'apache', 'applescript', 'xml', 'asciidoc', 'aspectj', 'bash', 'clojure', 'clojure-repl', 'coffeescript', 'css', 'dart', 'delphi', 'diff', 'django', 'dos', 'dust', 'elixir', 'ruby', 'erb', 'erlang-repl', 'erlang', 'fsharp', 'go', 'gradle', 'groovy', 'haml', 'haskell', 'http', 'ini', 'java', 'javascript', 'json', 'less', 'lisp', 'lua', 'makefile', 'nginx', 'objectivec', 'perl', 'php', 'powershell', 'profile', 'puppet', 'python', 'q', 'r', 'roboconf', 'rust', 'scala', 'scheme', 'scss', 'smalltalk', 'sql', 'stylus', 'swift', 'typescript', 'vbnet', 'vbscript', 'vim']

    this.currentCell = null
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
    this.currentCell = cell

    this.Persist()
  }

  onToMarkdown(){
    this.cells = _.map(this.cells, (cell) => {
      if (this.currentCell.id == cell.id) _.merge(cell, {type: "markdown", subtype: null}) 
      return cell
    })

    this.Persist()
  }

  onToDiagram(){
    this.cells = _.map(this.cells, (cell) => {
      if (this.currentCell.id == cell.id) _.merge(cell, {type: "diagram", subtype: null}) 
      return cell
    })

    this.Persist()
  }

  onToCode(data){
    this.cells = _.map(this.cells, (cell) => {
      if (this.currentCell.id == cell.id) _.merge(cell, {type: "code", subtype: data.language}) 
      return cell
    })

    this.Persist()
  }

  onUpdate(data){
    this.cells = _.map(this.cells, (cell) => {
      if (this.currentCell.id == cell.id) _.merge(cell, {body: data.text}) 
      return cell
    })

    this.Persist()
  }

  onRemove(){
    this.cells = _.reject(this.cells, ["id", this.currentCell.id])
    this.currentCell = null
    this.Persist()
  }

  onSelect(data){
    this.currentCell = data.cell
  }

  onFilterLanguage(data){
    let query = _.lowerCase(data.query)
    this.languages = this.originalLanguages
    this.languages = _.filter(this.languages, language => {
      let name = _.lowerCase(language)
      return (name.indexOf(query) > -1)
    })
  }

  onShowSelectLanguageView(){
    this.visibleSelectLanguageView = true
  }

  onHideSelectLanguageView(){
    this.languages = this.originalLanguages
    this.visibleSelectLanguageView = false
  }

  onMoveAfter(data) {

    let _cells = this.cells

    // fromの要素を抜き出す
    let from = _.find(_cells, ["id", data.from])
    // fromを一旦削除
    _cells = _.reject(_cells, ["id", data.from])
    // toのIndexを取得
    let toIndex = _.findIndex(_cells, ['id', data.to])
    // toの後ろにfromを挿入
    _cells.splice(toIndex + 1, 0, from) // 後ろに挿入するので + 1 する (前に挿入する場合は + 0)


    this.cells = _cells
    this.Persist()
  }

}

export default Alt.createStore(CellsStore, 'CellsStore')