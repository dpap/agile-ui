import React, { Component, PropTypes } from 'react'
import {Card, CardHeader} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import moment from 'moment'
export default class DeviceStream extends Component {

  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.number,
    unit: PropTypes.string,
    color: PropTypes.string,
    lastUpdate: PropTypes.number || null
  }

  render () {
    const childNode = (
      <div><p>Last updated : { moment(this.props.lastUpdate*1000).fromNow() } </p><p>unit: {this.props.unit}</p></div>
      )
  return (
      <Card>
        <CardHeader
          title={this.props.id}
          subtitle={childNode}
          avatar={<Avatar size={40} style={{'fontSize': '10px'}} backgroundColor={'rgb(0, 188, 212)'}>{this.props.value}</Avatar>}
        />
      </Card>
    )
  }
}
