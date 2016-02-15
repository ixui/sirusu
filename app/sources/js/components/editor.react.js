// Library
import React from 'react'
import { Input } from 'react-bootstrap'

class Editor extends React.Component {

  render() {

    return (
      <div>
				<Input type="textarea" label="Markdown Cell" placeholder="# Hello World" />
      </div>
    )
  }

}

export default Editor