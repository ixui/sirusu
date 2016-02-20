// Library
import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import _ from 'lodash'

// Alt - Flux
import ErrorsActions from '../actions/errors'
import ErrorsStore from '../stores/errors'

// Design
import Snackbar from 'material-ui/lib/snackbar'

class Nortification extends React.Component {

  // Alt Store との連結設定 - ここに設定したStoreから変更通知を受け取る
  static getStores() {
    return [ErrorsStore]
  }

  // Alt を使用した場合の Props の生成ルール - ここで返す結果がPropsに設定される
  static getPropsFromStores() {
    return ErrorsStore.getState()
  }  

  onRequestClose() {
    ErrorsActions.pop()
  }

  render() {

    let message = (this.props.errors.length > 0) ? 
                  (
                    <Snackbar
                      open={true}
                      message={_.last(this.props.errors).message}
                      autoHideDuration={4000}
                      onRequestClose={this.onRequestClose.bind(this)}
                    ></Snackbar>
                  ) : null

    return (

    	<div>
        {message}
    	</div>

    )
  }

}

export default connectToStores(Nortification)
