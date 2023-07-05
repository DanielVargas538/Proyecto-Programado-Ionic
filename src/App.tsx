import React, { useState } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import List from './pages/List';
import Login from './components/Login/Login';
import Home from './components/Home';
import Registration from './components/Registration/Registration';
import DishDetail from './pages/DishDetail'; 
import { IonSplitPane } from '@ionic/react';
import Menu from './components/Menu';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  
  return (
    <IonApp>
      <IonReactRouter>
        {localStorage.getItem('clientLogginIn') === 'true' ? (
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/" exact={true}>
                  <Redirect to="/pages/List" />
                </Route>
                <Route exact path="/List">
                  <List />
                </Route>
                <Route path="/dishes/:id" component={DishDetail} /> 
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
            </IonRouterOutlet>
          )}
      </IonReactRouter>
    </IonApp>
  );
}
  

export default App;
