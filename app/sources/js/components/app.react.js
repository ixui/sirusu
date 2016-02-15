// Library
import React from 'react'
import {Layout, Flex, Fixed} from 'react-layout-pane'

// Components
import SideBar from '../components/side_bar.react'
import ItemsBar from '../components/items_bar.react'
import Editor from '../components/editor.react'
import Viewer from '../components/viewer.react'


class App extends React.Component {

  render() {

    return (
    	<Layout type="column">
	       <Flex>
	           <Layout type="row">
	               <Fixed className="sidebar"><SideBar/></Fixed>
	               <Fixed className="itemsbar"><ItemsBar/></Fixed>
	               <Flex className="editor"><Editor/></Flex>
	               <Flex className="viewer"><Viewer/></Flex>
	           </Layout>
	       </Flex>
	   </Layout>
    )
  }

}

export default App