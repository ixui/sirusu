// Library
import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'

class Editor extends React.Component {

  render() {

    return (

    	<div>

				<Card>
				  <CardHeader
				    title="Without Avatar"
				    subtitle="Subtitle"
				    actAsExpander={true}
				    showExpandableButton={true}
				  ></CardHeader>
				  <CardText expandable={true}>
			      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
			      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
			      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
			    </CardText>
				  <CardActions expandable={true}>
				    <FlatButton label="Markdown"/>
				    <FlatButton label="Diagram"/>
				    <FlatButton label="Code"/>
				  </CardActions>
				</Card>

			</div>
  	)
  }

}

export default Editor