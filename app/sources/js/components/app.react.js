// Library
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'

// Alt - Flux
import BrowserActions from '../actions/browser'

// Components
import Nortification   from '../components/nortification.react'
import SideBar         from '../components/side_bar.react'
import PagesBar        from '../components/pages_bar.react'
import Editor          from '../components/editor.react'
import Viewer          from '../components/viewer.react'


class App extends React.Component {

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

    return (
    	<Layout type="column">
	    	<Fixed>
          <Fixed><Nortification/></Fixed>
	      </Fixed>
	      <Flex>
          <Layout type="row">
           <Fixed className="sidebar"><SideBar/></Fixed>
           <Fixed className="pagesbar"><PagesBar/></Fixed>
           <Flex className="editor"><Editor/></Flex>
           <Flex className="viewer"><Viewer/></Flex>
          </Layout>
	      </Flex>
	   </Layout>
    )
  }

}

export default App