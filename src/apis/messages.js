import axios from '../utils/axios';

export const joinRoomAPI = async (data) => {
  return await axios.post('messages', data);
};

export const leaveRoomAPI = async () => {
  return await axios.post('messages/leave');
};

export const sendMessageAPI = async (data) => {
  return await axios.post('messages/send', data);
};

export const getMessagesAPI = async (roomId, params = {}) => {
  return await axios.get(`messages/${roomId}`, {
    params,
  });
};
