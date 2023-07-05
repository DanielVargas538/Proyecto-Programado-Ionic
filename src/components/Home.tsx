import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
//import Menu from './Menu';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Página de inicio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* Agrega aquí el contenido adicional de tu página de inicio */}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
