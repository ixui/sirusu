// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'

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

    let sidebarClass = this.props.isTwoScreenMode ? "sidebar-hide" : "sidebar"
    let pagesbarClass = this.props.isTwoScreenMode ? "pagesbar-hide" : "pagesbar"

    return (
    	<Layout type="column">
	    	<Fixed>
          <Fixed><Nortification/></Fixed>
	      </Fixed>
	      <Flex>
          <Layout type="row">
           <Fixed className={sidebarClass}><SideBar/></Fixed>
           <Fixed className={pagesbarClass}><PagesBar/></Fixed>
           <Flex className="editor"><Editor/></Flex>
           <Flex className="viewer"><Viewer/></Flex>
          </Layout>
	      </Flex>
	   </Layout>
    )
  }

}

export default connectToStores(App)