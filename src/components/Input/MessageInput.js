import ArrowUp from '../../assets/arrow-up.svg';

function MessageInput({ placeholder = '', className = '' }) {
  return (
    <div className="message-input">
      <input className={className} placeholder={placeholder} />
      <div className="send-btn cursor-pointer">
        <img src={ArrowUp} alt="" />
      </div>
    </div>
  );
}

export default MessageInput;
