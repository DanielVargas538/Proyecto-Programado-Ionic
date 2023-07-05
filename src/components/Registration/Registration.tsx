import { IonButton, IonContent, IonInput } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';
import Swal from 'sweetalert2';


const Registration: React.FC = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const {postLoginMethod} = ApiMethods(`${environment.apiEndpoint}/clients`)
                            
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      postLoginMethod(first_name, last_name, phone, address, email, password, password_confirmation);
          //setMessage('Registrado Correctamente');
          showSuccessAlert();
  }

  const handleGoBack = () => {
    history.goBack();
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: 'Creado correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      history.push('/login');
    });
  }

  return (
    <IonContent>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Registro de cuenta</h3>
            <div className="form-group mt-3">
              <label>Nombre</label>
              <IonInput
                type="text"
                className="form-control mt-1"
                placeholder="Ingrese su Nombre"
                value={first_name}
                onIonChange={(e) => setFirstName(e.detail.value!)}
                required  
              />
            </div>
            <div className="form-group mt-3">
              <label>Apellidos</label>
              <IonInput
                type="text"
                className="form-control mt-1"
                placeholder="Ingrese sus Apellidos"
                value={last_name}
                onIonChange={(e) => setLastName(e.detail.value!)}
                required  
              />
            </div>
            <div className="form-group mt-3">
              <label>Telefono</label>
              <IonInput
                type="text"
                className="form-control mt-1"
                placeholder="Ingrese su telefono"
                value={phone}
                onIonChange={(e) => setPhone(e.detail.value!)}
                required  
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
                required  
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <IonInput
                type="email"
                className="form-control mt-1"
                placeholder="Ingrese un email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                required  
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
                required  
              />
            </div>
            <div className="form-group mt-3">
              <label>Confirmar Contraseña</label>
              <IonInput
                type="password"
                className="form-control mt-1"
                placeholder="Ingrese una contraseña"
                value={password_confirmation}
                onIonChange={(e) => setPasswordConfirmation(e.detail.value!)}
                required  
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
    </IonContent>
  );
}

export default Registration;
