import { 
  IonButton, 
  IonContent, 
  IonInput,
  IonLabel,
  IonTitle,
  IonItem,
  IonText,
  IonPage,
  IonAlert
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';
import './Registration.css'


const Registration: React.FC = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [canton, setCanton] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [header, setHeader] = useState('');
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);

  const {postLoginMethod} = ApiMethods(`${environment.apiEndpoint}/clients`)
                            
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      try{
        const response = await postLoginMethod(first_name, last_name, phone, province, canton, district , street, email, password, password_confirmation);
        if (response.status === 201) {
          setHeader('Exito')
          setMessage('Se ha registrado el usuario')
          setShowAlert(true);    
        } else {
          setMessage('Verifica los datos');
        }
      } catch (error) {
        console.log(error);
      }
  }

  const handleGoBack = () => {
    history.goBack();
  };

  const handleAlertOk = () => {
    setShowAlert(false);
    history.push('/login');
  };

  return (
    <IonPage>
      <IonContent class="ion-text-center ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
          <form className="Auth-form Ion-form" onSubmit={handleSubmit}>
              <IonTitle className="Auth-form-title title">Registro de cuenta</IonTitle>
                <IonItem>
                    <IonLabel position='floating'>Nombre</IonLabel>
                    <IonInput
                      type="text"
                      placeholder="Ingrese su Nombre"
                      value={first_name}
                      onIonChange={(e) => setFirstName(e.detail.value!)}
                      required  
                    />
                </IonItem>
                <IonItem>
                  <IonLabel position='floating'>Apellidos</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Ingrese sus Apellidos"
                    value={last_name}
                    onIonChange={(e) => setLastName(e.detail.value!)}
                    required  
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position='floating'>Telefono</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Ingrese su telefono"
                    value={phone}
                    onIonChange={(e) => setPhone(e.detail.value!)}
                    required  
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position='floating'>Provincia</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Ingrese la provincia de residencia"
                    value={province}
                    onIonChange={(e) => setProvince(e.detail.value!)}
                    required  
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position='floating'>Cantón</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Ingrese la provincia de residencia"
                    value={canton}
                    onIonChange={(e) => setCanton(e.detail.value!)}
                    required  
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position='floating'>Distrito</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Ingrese la provincia de residencia"
                    value={district}
                    onIonChange={(e) => setDistrict(e.detail.value!)}
                    required  
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position='floating'>Calle</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Ingrese la provincia de residencia"
                    value={street}
                    onIonChange={(e) => setStreet(e.detail.value!)}
                    required  
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position='floating'>Email</IonLabel>
                  <IonInput
                    type="email"
                    placeholder="Ingrese un email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    required  
                  />
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Contraseña</IonLabel>
                <IonInput
                  type="password"
                  placeholder="Ingrese una contraseña"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  required  
                />
              </IonItem>
              <IonItem>
                <IonLabel position='floating'>Confirmar Contraseña</IonLabel>
                <IonInput
                  type="password"
                  placeholder="Ingrese una contraseña"
                  value={password_confirmation}
                  onIonChange={(e) => setPasswordConfirmation(e.detail.value!)}
                  required  
                />
              </IonItem>
                <IonButton type="submit" className="btn-primary">
                  Registrarse
                </IonButton>
                <IonButton onClick={handleGoBack} className="btn-secondary">
                  Atrás
                </IonButton>
                <IonAlert
                  isOpen={showAlert}
                  onDidDismiss={() => setShowAlert(false)}
                  header={header}
                  message={message}
                  buttons={[
                    {
                      text: 'OK',
                      handler: handleAlertOk
                    }
                  ]}
                />
              <IonText>{message ? <p>{message}</p> : <br />}</IonText>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Registration;
