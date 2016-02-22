// Library
import React from 'react'
import mermaid, {mermaidAPI} from 'mermaid'

class Mermaid extends React.Component {

  constructor(props) {
    super(props)
    this.state = {diagram: "..."}
  }

  componentDidMount () {
    mermaidAPI.render("mermaid", this.props.text, (html) => this.setState({diagram: html}))
  }

  componentWillReceiveProps(nextProps) {
    mermaidAPI.render("mermaid", nextProps.text, (html) => this.setState({diagram: html}))
  }

  render() {
    return (
      (this.state.diagram) ? 
      <div className="mermaid" dangerouslySetInnerHTML={{__html: this.state.diagram}}></div> : 
      <div></div>
    )

  }

}

export default Mermaid
