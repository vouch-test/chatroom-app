import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { MessageInput } from '../../components/Input';
import {
  getMessages,
  leaveRoom,
  sendMessage,
} from '../../redux/actions/message';
import { ADD_NEW_PARTICIPANT, APPEND_MESSAGE } from '../../redux/types';
import { setAuthToken } from '../../utils/axios';
import ChatMessages from './ChatMessages';

const DEFAULT_LIMIT_MESSAGES = 15;

function Chatroom() {
  const token = useSelector((state) => state?.chatroom?.token);
  const currentUsername = useSelector((state) => state?.chatroom?.username);

  const [offset, setOffset] = useState(0);
  const { roomId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token && roomId) {
      const socket = io.connect(process.env.REACT_APP_SOCKET_URL);
      socket.on(`receive_message_${roomId}`, ({ username, message }) => {
        if (username !== currentUsername) {
          dispatch({
            type: APPEND_MESSAGE,
            payload: {
              username,
              message,
            },
          });
        }
      });
      socket.on(`join_room_${roomId}`, ({ participant }) => {
        dispatch({
          type: ADD_NEW_PARTICIPANT,
          payload: {
            participant,
          },
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!token || !roomId) {
      setAuthToken(null);
      history.replace('/');
    } else {
      dispatch(
        getMessages(roomId, {
          offset,
          DEFAULT_LIMIT_MESSAGES,
        })
      )
        .then(() => scrollSmoothToBottom('messages'))
        .catch(() => {});
    }
  }, [offset]);

  const handleExit = async () => {
    await dispatch(
      leaveRoom({
        roomId,
      })
    )
      .then(() => {
        setAuthToken(null);
        history.replace('/');
      })
      .catch(() => {
        setAuthToken(null);
        history.replace('/');
      });
  };

  const handleSendMessage = async (messageContent) => {
    dispatch(
      sendMessage({
        message: {
          content: messageContent,
        },
      })
    );
  };

  const scrollSmoothToBottom = (id) => {
    var div = document.getElementById(id);
    div.scroll({
      top: div.scrollHeight - div.clientHeight,
      behavior: 'smooth',
    });
  };

  if (!token) {
    return <></>;
  }
  return (
    <div className="container h-screen flex flex-col justify-between">
      <div className="relative flex justify-center w-full mb-4">
        <p
          className="absolute left-0 green font-medium cursor-pointer col-span-full exit"
          onClick={handleExit}
        >
          Exit
        </p>
        <p className="page-title w-8/12 cursor-default col-span-full">
          {roomId}
        </p>
      </div>
      <div
        id="messages"
        className="col-span-full h-full mb-4 overflow-auto hide-scrollbar"
      >
        <ChatMessages />
      </div>
      <MessageInput
        placeholder="Message here..."
        className="w-full"
        sendMessage={handleSendMessage}
      />
    </div>
  );
}

export default Chatroom;
