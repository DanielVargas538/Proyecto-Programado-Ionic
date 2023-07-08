import { 
  IonButton, 
  IonContent, 
  IonInput, 
  IonText,
  IonItem,
  IonLabel,
  IonTitle,
  IonPage
} from '@ionic/react';
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
  <IonPage>
    <IonContent class="ion-text-center ion-padding">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
        <form className="Auth-form Ion-form" onSubmit={handleSubmit}>
          <IonTitle className="Auth-form-title title">Iniciar Sesion</IonTitle>
            <IonItem>
                <IonLabel position='floating'>Email</IonLabel>
                <IonInput
                  type="text"
                  placeholder="Ingrese su Nombre"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  required  
                />
            </IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput
              type="password"
              placeholder="Ingrese su Contraseña"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              required
            ></IonInput>
          </IonItem>
              <IonButton expand="block" type="submit" className="btn_logIn">
                Ingresar
              </IonButton>
            <div>
              <p>
                ¿No tienes una cuenta?{' '}
                <Link className='register' to="/register">Regístrate aquí</Link>
              </p>
            </div>
            <IonText>{message && <p>{message}</p>}</IonText>
        </form>
      </div>
    </IonContent>
  </IonPage>
  );
  
}

export default Login;
