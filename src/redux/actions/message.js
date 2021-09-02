import {
  getMessagesAPI,
  joinRoomAPI,
  leaveRoomAPI,
  sendMessageAPI,
} from '../../apis/messages';
import {
  GET_MESSAGES,
  GET_MESSAGES_FAILED,
  GET_MESSAGES_SUCCESS,
  JOIN_ROOM,
  JOIN_ROOM_FAILED,
  JOIN_ROOM_SUCCESS,
  LEAVE_ROOM,
  SEND_MESSAGE,
  SEND_MESSAGE_FAILED,
  SEND_MESSAGE_SUCCESS,
} from '../types';

export function joinRoom(reqData) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch({
        type: JOIN_ROOM,
      });
      try {
        const { data } = await joinRoomAPI(reqData);
        dispatch({
          type: JOIN_ROOM_SUCCESS,
          payload: {
            ...data,
            ...reqData,
          },
        });
        resolve(data);
      } catch (error) {
        dispatch({
          type: JOIN_ROOM_FAILED,
          payload: error,
        });
        reject(error);
      }
    });
  };
}

export function leaveRoom({ roomId }) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: LEAVE_ROOM,
        });
        await leaveRoomAPI();
        resolve();
      } catch (error) {
        reject();
      }
    });
  };
}

export function sendMessage(data) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch({
        type: SEND_MESSAGE,
      });
      try {
        const { data: message } = await sendMessageAPI(data);
        dispatch({
          type: SEND_MESSAGE_SUCCESS,
          payload: { message },
        });
        resolve();
      } catch (error) {
        dispatch({
          type: SEND_MESSAGE_FAILED,
        });
        reject();
      }
    });
  };
}

export function getMessages(roomId, params) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch({
        type: GET_MESSAGES,
      });
      try {
        const { data } = await getMessagesAPI(roomId, params);
        dispatch({
          type: GET_MESSAGES_SUCCESS,
          payload: data,
        });
        resolve();
      } catch (error) {
        dispatch({
          type: GET_MESSAGES_FAILED,
        });
        reject();
      }
    });
  };
}
