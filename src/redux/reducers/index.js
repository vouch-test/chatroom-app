import { combineReducers } from 'redux';
import ChatroomReducer from './chatroom';

export default combineReducers({
  chatroom: ChatroomReducer,
});
