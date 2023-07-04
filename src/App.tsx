import React, { useState } from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home';
import Registration from './components/Registration/Registration';

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        {localStorage.getItem('clientLogginIn') ? (
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
          </IonRouterOutlet>
        ) : (
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login />
            </Route>
            <Redirect exact from="/" to="/login" />
            <Route exact path="/register">
              <Registration/>
            </Route>
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
}
  

export default App;
