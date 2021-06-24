import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthStorage } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import { GlobalStyle } from './styles/global';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthStorage>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthStorage>
      <GlobalStyle />
    </BrowserRouter>
  );
};
