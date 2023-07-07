import React, { useState, useEffect } from 'react';
import { 
    IonButton, 
    IonContent, 
    IonInput,
    IonLabel,
    IonTitle,
    IonItem,
    IonHeader,
    IonToolbar,
    IonPage,
    IonAlert
} from '@ionic/react';
import './client.css';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';
import Header from '../commons/header/header' 

 
const Client: React.FC = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [province, setProvince] = useState('');
    const [canton, setCanton] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('xxxxx');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [showForm, setShowForm] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [header, setHeader] = useState('');
    const [message, setMessage] = useState('');

    const { data } = ApiMethods(`${environment.apiEndpoint}/clients/${sessionStorage.getItem('clientIdLoggin')}`);

    useEffect(() => {
        if (data) {
            setFirstName(data.client.first_name);
            setLastName(data.client.last_name);
            setPhone(data.client.phone);
            setProvince(data.client.province);
            setCanton(data.client.canton);
            setDistrict(data.client.district);
            setStreet(data.client.street);
            setEmail(data.client.email);
      }
    }, [data]);

    const { putClientMethod } = ApiMethods(`${environment.apiEndpoint}/clients`);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        putClientMethod(sessionStorage.getItem('clientIdLoggin'), first_name, last_name, phone, province, canton, district, street, email, password, password_confirmation);
        setHeader('Exito')
        setMessage('Se actualizaron los datos')
        setShowAlert(true);
    }

    const handleAlertOk = () => {
        setShowAlert(false);
        window.location.reload();
    };

  if(!showForm){
  return(
    <IonPage>
        <Header Title='Perfil'/>
        <IonContent class="ion-text-center ion-padding">
              <IonTitle className="Auth-form-title title">Actualizar los Datos</IonTitle>
                <IonItem>
                    <IonLabel>Nombre: {first_name}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Apellidos: {last_name}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Telefono: {phone}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Provincia: {province}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Cantón:{canton}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Distrito: {district}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Calle: {street}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Email: {email}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Contraseña: {password}</IonLabel>
              </IonItem>
            <IonButton className="btn-primary" onClick={() => setShowForm(true)}>
                Actualizar Datos
            </IonButton>
      </IonContent>
    </IonPage>
);
}else{
    return(
    <IonPage>
        <Header Title='Perfil'/>
        <IonContent class="ion-text-center ion-padding">
        <div style={{ display: 'flex',  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '30px'}}>
            <form className="Auth-form Ion-form" onSubmit={handleSubmit}>
            <IonTitle className="Auth-form-title title">Actualizar Datos</IonTitle>
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
                onIonChange={(e) => setPassword(e.detail.value!)}
                required  
                />
            </IonItem>
            <IonItem>
                <IonLabel position='floating'>Confirmar Contraseña</IonLabel>
                <IonInput
                type="password"
                placeholder="Ingrese una contraseña"
                onIonChange={(e) => setPasswordConfirmation(e.detail.value!)}
                required  
                />
            </IonItem>
                <IonButton type="submit" className="btn-primary">
                    Actualizar
                </IonButton>
                <IonButton onClick={() => setShowForm(false)} className="btn-primary">
                    Atras
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
            </form>
        </div>
        </IonContent>
    </IonPage>
    );
    }
};

export default Client;