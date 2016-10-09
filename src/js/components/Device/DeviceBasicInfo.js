import React, { Component, PropTypes } from 'react'
import {CardHeader} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'

export default class DeviceBasicInfo extends Component {

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    protocol: PropTypes.string,
    address: PropTypes.string
  }

  render () {
    const childNode = (
      <div><p>id: { this.props.id } </p>
      <p>address: {this.props.address}</p>
      <p>protocol: {this.props.protocol}</p>
      </div>
      )
    return (
      <CardHeader
        titleStyle={{'marginBottom': '10px'}}
        title={this.props.name}
        subtitle={childNode}
        avatar={<Avatar>{this.props.name ?  this.props.name.charAt(0): '' }</Avatar>}
      />
    )
  }
}
