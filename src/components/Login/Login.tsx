import { 
  IonButton, 
  IonContent, 
  IonInput, 
  IonList,
  IonItem,
  IonLabel } from '@ionic/react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';
import './Login.css';


const Login: React.FC = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();
  
  const {getLoginMethod} = ApiMethods(`${environment.apiEndpoint}/clients/params/${email}/${password}`)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await getLoginMethod();
      if (response.status === 200) {
        setEmail('');
        setPassword('');
        sessionStorage.setItem('clientIdLoggin', response.data.id );
        sessionStorage.setItem('clientLogginIn', 'true');
        history.push('/list');
        window.location.reload();
      } else {
        setMessage('Usuario no encontrado, favor de registrarse')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonContent>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Iniciar Sesión</h3>
            <IonList>
              <IonItem>
                <IonLabel position="floating">Correo Electrónico</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonList>
            <div className="d-grid gap-2 mt-3">
              <IonButton expand="block" type="submit" className="btn_logIn">
                Ingresar
              </IonButton>
            </div>
            <div>
              <p>
                ¿No tienes una cuenta?{' '}
                <Link className='register' to="/register">Regístrate aquí</Link>
              </p>
            </div>
            {message && <p>{message}</p>}
          </div>
        </form>
      </div>
    </IonContent>
  );
  
}

export default Login;
