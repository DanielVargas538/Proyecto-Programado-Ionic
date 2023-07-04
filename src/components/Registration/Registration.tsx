import { IonButton, IonContent, IonInput, IonToast } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

interface RegistrationProps {
  setIsRegistered: (isRegistered: boolean) => void;
}

function Registration({ setIsRegistered }: RegistrationProps) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform registration logic here
    // You can use your API methods or any other registration implementation

    // Assuming registration is successful
    setMessage('Registration successful');
    setShowToast(true);
    setIsRegistered(true);
    localStorage.setItem('isRegistered', 'true');
    history.push('/login');
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <IonContent>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Registro de cuenta</h3>
            <div className="form-group mt-3">
              <label>Email</label>
              <IonInput
                type="email"
                className="form-control mt-1"
                placeholder="Ingrese un email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Nombre Completo</label>
              <IonInput
                type="text"
                className="form-control mt-1"
                placeholder="Ingrese su nombre completo"
                value={fullName}
                onIonChange={(e) => setFullName(e.detail.value!)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Dirección Física</label>
              <IonInput
                type="text"
                className="form-control mt-1"
                placeholder="Ingrese una dirección"
                value={address}
                onIonChange={(e) => setAddress(e.detail.value!)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Contraseña</label>
              <IonInput
                type="password"
                className="form-control mt-1"
                placeholder="Ingrese una contraseña"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <IonButton type="submit" className="btn-primary">
                Registrarse
              </IonButton>
              <IonButton onClick={handleGoBack} className="btn-secondary">
                Atrás
              </IonButton>
            </div>
            <div>{message ? <p>{message}</p> : <br />}</div>
          </div>
        </form>
      </div>

      <IonToast
        isOpen={showToast}
        message={message}
        onDidDismiss={() => setShowToast(false)}
        duration={2000}
      />
    </IonContent>
  );
}

export default Registration;
