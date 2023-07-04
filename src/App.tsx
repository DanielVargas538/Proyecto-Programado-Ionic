import React, { useState } from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home';
import Registration from './components/Registration/Registration';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/home">
            {isLoggedIn ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/register">
            {isRegistered ? <Redirect to="/login" /> : <Registration setIsRegistered={setIsRegistered} />}
          </Route>
          <Redirect exact path="/" to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
