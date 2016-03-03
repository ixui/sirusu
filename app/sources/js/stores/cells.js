import Alt from '../alt'
import _ from 'lodash'
import CellsActions from '../actions/cells'
import UUID from '../stores/helpers/uuid'
import SettingStore from '../stores/setting'
import NotebooksStore from '../stores/notebooks'
import PagesStore from '../stores/pages'

let fs = remote.require('fs')
let path = remote.require("path")

class CellsStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(CellsActions)
    this.cells = []
  }

  Persist() {
    let dataPath = SettingStore.getState().dataPath
    let selectedNote = NotebooksStore.getState().currentNote
    let selectedPage = PagesStore.getState().currentPage
    let cellsFilePath = path.join(dataPath, selectedNote.name, "Cells", selectedPage.id+".json")
    fs.writeFileSync(cellsFilePath, JSON.stringify(this.cells))
  }

  onFetch() {
    this.waitFor([NotebooksStore, PagesStore, SettingStore])

    // 設定からデータの取得先を取得する ************************************************************
    let dataPath = SettingStore.getState().dataPath
    let selectedNote = NotebooksStore.getState().currentNote
    let selectedPage = PagesStore.getState().currentPage

    if (selectedNote == null || selectedPage == null) {
      this.cells = []
      return
    }

    // データファイルからデータを取得する **********************************************************
    let cellsFilePath = path.join(dataPath, selectedNote.name, "Cells", selectedPage.id+".json")
    let cells = JSON.parse(fs.readFileSync(cellsFilePath, 'utf8'));
    this.cells = cells
 
    // this.cells = [
    //     {id: UUID.get(), type: "markdown", subtype: null, body: "# Hello World"},
    //     {id: UUID.get(), type: "code", subtype: "javascript", body: "alert('Hello World')"},
    //     {id: UUID.get(), type: "diagram", subtype: null, body: ""},
    //     {id: UUID.get(), type: "markdown", subtype: null, body: "# Hello World"},
    //     {id: UUID.get(), type: "markdown", subtype: null, body: "# Hello World"},
    //     {id: UUID.get(), type: "markdown", subtype: null, body: "# Hello World"},
    //   ]
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

}

export default Alt.createStore(CellsStore, 'CellsStore')