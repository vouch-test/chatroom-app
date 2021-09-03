import {
  ADD_NEW_PARTICIPANT,
  APPEND_MESSAGE,
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

const INITIAL_STATE = {
  roomId: '',
  token: '',
  isJoiningRoom: false,
  messages: [],
  onlineParticipants: [],
};

const ChatroomReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case JOIN_ROOM:
      return {
        ...state,
        isJoiningRoom: true,
      };
    case JOIN_ROOM_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isJoiningRoom: false,
      };
    case JOIN_ROOM_FAILED:
      return {
        ...state,
        isJoiningRoom: false,
      };
    case LEAVE_ROOM: {
      return {
        ...state,
        roomId: '',
        token: '',
      };
    }
    case GET_MESSAGES: {
      return {
        ...state,
        isGettingMessages: true,
      };
    }
    case GET_MESSAGES_SUCCESS: {
      if (action.payload?.isNew) {
        return {
          ...state,
          isGettingMessages: false,
          messages: action.payload.messages,
        };
      }
      return {
        ...state,
        isGettingMessages: false,
        messages: [...action.payload.messages, ...state.messages],
      };
    }
    case GET_MESSAGES_FAILED: {
      return {
        ...state,
        isGettingMessages: false,
      };
    }
    case SEND_MESSAGE: {
      return {
        ...state,
        isSendingMessage: true,
      };
    }
    case SEND_MESSAGE_SUCCESS: {
      return {
        ...state,
        isSendingMessage: false,
        messages: [...state.messages, action.payload.message],
      };
    }
    case SEND_MESSAGE_FAILED: {
      return {
        ...state,
        isSendingMessage: false,
      };
    }
    case APPEND_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    }
    case ADD_NEW_PARTICIPANT: {
      return {
        ...state,
        onlineParticipants: [
          ...state.onlineParticipants,
          action.payload.participant,
        ],
      };
    }
    default:
      return state;
  }
};

export default ChatroomReducer;
