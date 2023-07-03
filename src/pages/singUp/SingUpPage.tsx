import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';

const SingUpPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form>
          <IonInput type="text" placeholder="Nombre completo" required />
          <IonInput type="email" placeholder="Correo electrónico" required />
          <IonInput type="text" placeholder="Dirección física" required />
          <IonInput type="password" placeholder="Contraseña" required />
          <IonButton expand="full" type="submit">Registrarse</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SingUpPage;
