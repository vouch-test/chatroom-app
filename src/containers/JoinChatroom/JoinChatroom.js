import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PrimaryButton } from '../../components/Button';
import { PrimaryInput } from '../../components/Input';
import { joinRoom } from '../../redux/actions/message';
import { setAuthToken } from '../../utils/axios';

function JoinChatroom() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomID] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.chatroom?.token);
  const storedRoomId = useSelector((state) => state?.chatroom?.roomId);

  useEffect(() => {
    if (token && storedRoomId) {
      setAuthToken(token);
    }
    history.replace(`/${storedRoomId}`);
  }, [token, storedRoomId]);

  const joinChatRoom = async () => {
    let valid = true;
    if (!username || !roomId) {
      valid = false;
    }
    if (valid) {
      dispatch(
        joinRoom({
          username,
          roomId,
        })
      ).then((data) => {
        if (data?.token) {
          setAuthToken(data?.token);
          history.push({
            pathname: `/${roomId}`,
          });
        }
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
