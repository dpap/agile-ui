import { combineReducers } from 'redux';
import {
  devices,
  devicesDiscover,
  messages,
  loading,
  discovery,
  drawer,
  protocols,
  deviceTypes,
  device,
  streams
} from './entities';

export default combineReducers({
    devices,
    devicesDiscover,
    messages,
    loading,
    discovery,
    drawer,
    protocols,
    deviceTypes,
    device,
    streams
});
