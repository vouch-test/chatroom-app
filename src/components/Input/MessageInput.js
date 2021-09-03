import { useState } from 'react';
import ArrowUp from '../../assets/arrow-up.svg';

function MessageInput({ placeholder = '', className = '', sendMessage }) {
  const [messageContent, setMessageContent] = useState('');

  return (
    <div className="message-input">
      <input
        className={`p-2 ${className}`}
        placeholder={placeholder}
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && messageContent.length > 0) {
            sendMessage(messageContent);
            setMessageContent('');
          }
        }}
      />
      <div
        onClick={() => {
          sendMessage(messageContent);
          setMessageContent('');
        }}
        className="send-btn cursor-pointer"
      >
        <img src={ArrowUp} alt="" />
      </div>
    </div>
  );
}

export default MessageInput;
