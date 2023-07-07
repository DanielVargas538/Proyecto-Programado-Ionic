import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/react';
import './header.css';
 
const Header: React.FC <{ Title: string }> = (props) => {
    return(
        <>
        <IonHeader>
          <IonToolbar>
            <div className="button-container">
              <IonTitle className="Ion__Title">{props.Title}</IonTitle>
              <IonButton className="Ion__logout" onClick={() => { sessionStorage.setItem('clientLogginIn', 'false'); window.location.href = "/login"; }}>
                Cerrar Sesión
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>
        </>
     )
};

export default Header
