// Library
import React from 'react'
import { Input, MenuItem } from 'react-bootstrap'

class ItemsBar extends React.Component {

  render() {

    return (
      <div>
				<div className="clearfix">
	      	<Input type="text" className="search-query" bsSize="small" placeholder="Search (All Cells)" />
	      </div>
      </div>
    )
  }

}

export default ItemsBar