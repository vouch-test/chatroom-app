import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PrimaryButton } from '../../components/Button';
import { PrimaryInput } from '../../components/Input';

function JoinChatroom() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomID] = useState('');

  const history = useHistory();

  const joinChatRoom = () => {
    let valid = true;
    if (!username || !roomId) {
      valid = false;
    }
    if (valid) {
      history.push({
        pathname: `/${roomId}`,
        search: username,
      });
    }
  };

  return (
    <div className="container h-screen flex flex-col justify-between">
      <div>
        <p className="page-title col-span-full my-8">Join Chatroom</p>
        <div className="col-span-full mb-4">
          <PrimaryInput
            className="w-full"
            placeholder="Username"
            onChange={(value) => setUsername(value)}
          />
        </div>
        <div className="col-span-full mb-4">
          <PrimaryInput
            className="w-full"
            placeholder="RoomID"
            onChange={(value) => setRoomID(value)}
          />
        </div>
      </div>
      <div className="my-16">
        <PrimaryButton name="JOIN" className="w-full" onClick={joinChatRoom} />
      </div>
    </div>
  );
}

export default JoinChatroom;
