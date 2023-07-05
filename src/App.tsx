import React, { useState } from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import List from './pages/List';
import Login from './components/Login/Login';
import Home from './components/Home';
import Registration from './components/Registration/Registration';

const App: React.FC = () => {
  
  return (
    <IonApp>
      <IonReactRouter>
        {localStorage.getItem('clientLogginIn') === 'true' ? (
          <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/list">
                <List />
              </Route>
          </IonRouterOutlet>
          ) : (
            <IonRouterOutlet>
              <Route exact path="/login">
                <Login />
              </Route>
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
