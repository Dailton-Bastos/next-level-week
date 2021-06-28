import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AppStorage } from './contexts';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import { GlobalStyle } from './styles/global';

export const App = () => {
  return (
    <BrowserRouter>
      <AppStorage>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />

          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AppStorage>

      <GlobalStyle />
    </BrowserRouter>
  );
};
