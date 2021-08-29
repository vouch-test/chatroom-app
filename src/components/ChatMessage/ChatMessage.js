import './ChatMessage.css';

function ChatMessage({ isForeign = false, username = '', content = '' }) {
  return (
    <div
      className={`flex flex-col my-2 chat-message ${
        isForeign ? 'foreign-message' : 'user-message'
      }`}
    >
      {isForeign && <span className="username col-span-full">{username}</span>}
      <div className="message-content">{content}</div>
    </div>
  );
}

export default ChatMessage;
