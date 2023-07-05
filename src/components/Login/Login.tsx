import { IonButton, IonContent, IonInput, IonToast } from '@ionic/react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';
import './Login.css';


const Login: React.FC = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const {getLoginMethod} = ApiMethods(`${environment.apiEndpoint}/clients/params/${email}/${password}`)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await getLoginMethod();
      if (response.status === 200) {
        setMessage('Sesión iniciada con éxito');
        setEmail('');
        setPassword('');
        localStorage.setItem('clientLogginIn', 'true');
        history.push('/list');
        window.location.reload();
      } else if (response.status === 404) {
        setMessage('Recurso no encontrado');
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
            <div className="form-group mt-3">
              <label className='Label'>Correo Electrónico</label>
              <IonInput
                type="email"
                className="form-control mt-1"
                placeholder="Ingrese su correo"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Contraseña</label>
              <IonInput
                type="password"
                className="form-control"
              
                placeholder="Ingrese su contraseña"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <IonButton type="submit" className="btn_logIn">
                Ingresar
              </IonButton>
            </div>
            <div>
              <p>
                ¿No tienes una cuenta?{' '}
                <Link className='register' to="/register">Regístrate aquí</Link>
              </p>
            </div>
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

export default Login;
