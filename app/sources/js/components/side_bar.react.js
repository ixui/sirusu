// Library
import React from 'react'
import { Input, MenuItem } from 'react-bootstrap'


class SideBar extends React.Component {

  render() {

    return (
      <div>
				<div className="clearfix">
	      	<Input type="text" className="search-query" bsSize="small" placeholder="Search (Notes, Tags)" />
	      </div>

				<div className="clearfix">
					<ul className="menu">

			      <MenuItem header>Notes</MenuItem>
			      <MenuItem>C#</MenuItem>
			      <MenuItem>Java</MenuItem>
			      <MenuItem>React</MenuItem>
			      <MenuItem>Ruby</MenuItem>
			      <MenuItem>NodeJS</MenuItem>
			      <MenuItem>Heroku</MenuItem>
			      <MenuItem>AWS</MenuItem>

			      <MenuItem header>Tags</MenuItem>
			      <MenuItem>knowledge</MenuItem>
			      <MenuItem>design</MenuItem>

				  </ul>
	      </div>

      </div>
    )
  }

}

export default SideBar