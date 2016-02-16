// Library
import React from 'react'
import TextField from 'material-ui/lib/text-field'

class Editor extends React.Component {

  render() {

    return (

    	<div>
      		<TextField hintText="#Hello World"
		      		   multiLine={true} rows={20} rowsMax={100} />
		</div>

    )
  }

}

export default Editor