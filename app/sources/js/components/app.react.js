// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'
import {Motion, spring} from 'react-motion'

// Alt - Flux
import BrowserActions from '../actions/browser'
import BrowserStore from '../stores/browser'

// Components
import Nortification   from '../components/nortification.react'
import SideBar         from '../components/side_bar.react'
import PagesBar        from '../components/pages_bar.react'
import Editor          from '../components/editor.react'
import Viewer          from '../components/viewer.react'


class App extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
  static getStores() {
    return [BrowserStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return BrowserStore.getState()
  }  

	componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)    
  }

  resize() {
  	BrowserActions.resize({width: window.innerWidth, height: window.innerHeight})
  }

  render() {

    let sidebarStyle = this.props.isTwoScreenMode || this.props.isPrintMode ? "sidebar-hidden" : "sidebar"
    let pagesbarStyle = this.props.isTwoScreenMode || this.props.isPrintMode ? "pagesbar-hidden" : "pagesbar"
    let editorStyle = this.props.isPrintMode ? {flex: 0, "transition": "all 0.4s ease-in-out"} : {flex: 1, "transition": "all 0.4s ease-in-out"}

    return (

      <Layout type="column">
        <Fixed>
          <Fixed><Nortification/></Fixed>
        </Fixed>
        <Flex>
          <Layout type="row">
            <Fixed className={sidebarStyle}><SideBar/></Fixed>
            <Fixed className={pagesbarStyle}><PagesBar/></Fixed>
            <Flex className="editor" style={editorStyle}><Editor/></Flex>
            <Flex className="viewer"><Viewer/></Flex>
          </Layout>
        </Flex>
     </Layout>

    )
  }

}

export default connectToStores(App)