import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chatroom from './containers/Chatroom';
import JoinChatroom from './containers/JoinChatroom';
import './styles/global.css';
import './styles/variable.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <JoinChatroom />
        </Route>
        <Route path="/:roomId">
          <Chatroom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
