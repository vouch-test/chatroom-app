import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MessageInput } from '../../components/Input';
import ChatMessages from './ChatMessages';

function Chatroom() {
  const { roomId = '' } = useParams();
  const history = useHistory();

  const handleExit = () => {
    history.replace('/');
  };

  const scrollSmoothToBottom = (id) => {
    var div = document.getElementById(id);
    div.scroll({
      top: div.scrollHeight - div.clientHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    console.log('scroll');
    scrollSmoothToBottom('messages');
  }, []);

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
      <MessageInput placeholder="Message here..." className="w-full" />
    </div>
  );
}

export default Chatroom;
