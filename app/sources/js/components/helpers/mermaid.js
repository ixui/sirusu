// Library
import React from 'react'
import mermaid, {mermaidAPI} from 'mermaid'

class Mermaid extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      diagram: "生成中 ..."
    }
  }

  componentWillReceiveProps(nextProps) {
    mermaidAPI.render(this.getId(), nextProps.text, (html) => {
      this.setState({diagram: html})
    })
  }

  componentDidMount() {
    mermaidAPI.render(this.getId(), this.props.text, (html) => {
      this.setState({diagram: html})
    })
  }

  componentDidUpdate() {
    mermaidAPI.render(this.getId(), this.props.text, (html) => {
      this.setState({diagram: html})
    })
  }

  getId() {
    let uuid = "", i, random
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0

      if (i == 8 || i == 12 || i == 16 || i == 20) {
        uuid += "-"
      }
      uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16)
    }
    return uuid
  }

  render() {
    return (
      <div className="mermaid" dangerouslySetInnerHTML={{__html: this.state.diagram}}></div>
    )

  }

}

export default Mermaid
