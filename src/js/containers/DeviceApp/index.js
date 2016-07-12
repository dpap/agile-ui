import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Device } from '../../components'
import { bindActionCreators } from 'redux'
import * as deviceActions from '../../actions/device'

class DeviceApp extends Component {

  static propTypes = {
    device: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  render () {
    const { device: { item, loading, error }, actions } = this.props
    return (
      <div className="container--app">
        <Device name={item.name} id={item.id} path={item.path}
        actions={actions} loading={loading} error={error} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    device: state.device
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(deviceActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceApp)
