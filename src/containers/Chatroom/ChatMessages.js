import { useSelector } from 'react-redux';
import ChatMessage from '../../components/ChatMessage';

function ChatMessages() {
  const messages = useSelector((state) => state.chatroom.messages);
  const username = useSelector((state) => state.chatroom.username);

  return (
    <>
      {messages.map((message) => (
        <ChatMessage
          username={message?.participant?.username}
          content={message?.content}
          isForeign={message?.participant?.username !== username}
        />
      ))}
    </>
  );
}

export default ChatMessages;
