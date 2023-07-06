import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import List from './pages/List';
import Orders from './pages/orders/order'

import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

  const isClientLogginIn = sessionStorage.getItem('clientLogginIn') === 'true'

  return (
    <IonApp>
      <IonReactRouter>
        { isClientLogginIn ? (
          <IonSplitPane contentId="main">
              <Menu />
            <IonRouterOutlet id="main">
                <Route exact path="/list">
                  <List />
                </Route>
                <Route exact path="/orders">
                  <Orders />
                </Route>
                <Redirect to="/list" />
            </IonRouterOutlet>
          </IonSplitPane>
          ) : (
            <IonRouterOutlet>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Registration/>
              </Route>
              <Redirect to="/login" />
            </IonRouterOutlet>
          )}
      </IonReactRouter>
    </IonApp>
  );
}
  

export default App;
