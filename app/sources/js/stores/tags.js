import Alt from '../alt'
import TagsActions from '../actions/tags'
import UUID from '../stores/helpers/uuid'
import _ from 'lodash'
import SettingStore from '../stores/setting'
import ErrorsStore from '../stores/errors'

let fs = remote.require('fs')
let path = remote.require("path")

class TagsStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(TagsActions)
    this.currentTag = null
    this.tags = []
  }

  onFetch() {

    let _this = this

    console.log("TagsStore onFetch")

    // 設定からデータの取得先を取得する
    let dataPath = SettingStore.getState().dataPath

    if (!dataPath) return
    try{
      // ディレクトリが存在していることを確認する
      fs.statSync(dataPath)
    }catch(e){
      ErrorsStore.push("データの保存先が見つかりません¥n設定を確認してください")
      return
    }

    // データ保存先直下のファイルを開き、ノート名称を収集する
    let tagsBuffer = []
    fs.readdir(dataPath, (err, files) => {

      files.map(file => {
          return path.join(dataPath, file)
      }).filter(file => {
          return fs.statSync(file).isFile();
      }).filter(file => {
          return path.extname(file) == ".page";
      }).forEach(file => {
        // データ取得先にあるディレクトリからタグの一覧を作成する
        let page = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (page.tag) {
          _.words(page.tag).map((tag, index) => {
            tagsBuffer.push({id: UUID.get(), name: tag})
          })
        }
      })

      _this.tags = _.uniqBy(tagsBuffer, "name")
      //_this.currentTag = _this.currentTag || _this.tags[0]
      _this.emitChange() // 非同期で処理を行っているのでstateを更新後にemitChangeで再度反映する
    })

  }

  onSelect(data){
    this.currentTag = data.tag
  }

}

export default Alt.createStore(TagsStore, 'TagsStore')