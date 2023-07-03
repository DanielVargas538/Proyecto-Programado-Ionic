import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import { useHistory } from 'react-router';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const history = useHistory();

  const handleRegister = () => {
    history.push('/signup');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form>
          <IonInput  type="email" placeholder="Correo electrónico" required />
          <IonInput type="password" placeholder="Contraseña" required />
          <IonButton expand="full" type="submit">Iniciar sesión</IonButton>
        </form>
        <IonButton expand="full" onClick={handleRegister}>Registrarse</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
