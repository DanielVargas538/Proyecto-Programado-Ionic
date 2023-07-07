import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonCardContent,
  IonImg,
  IonLabel,
  IonRow,
  IonGrid,
  IonAlert
} from '@ionic/react';
import './order.css';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';
import Header from '../commons/header/header' 
import ListData from '../commons/list/listData';

const Order: React.FC = () => {
  const [orderId, SetOrderId]= useState(0);
  const [edit, SetEdit] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [header, setHeader] = useState('');
  const [message, setMessage] = useState('');

  const { data } = ApiMethods(`${environment.apiEndpoint}/orders/params/${sessionStorage.getItem('clientIdLoggin')}`);

  const { putOrderStateMethod } = ApiMethods(`${environment.apiEndpoint}/orders`);

  const handleSubmit = (order_id: number) => {
    putOrderStateMethod(order_id);
    setHeader('Exito')
    setMessage('Se ha actualizado la orden')
    setShowAlert(true);
  }

  const handleAlertOk = () => {
    setShowAlert(false);
    window.location.reload();
  };

  const getStateLabel = (state:any) => {
    let label = "";
    if (state === "on_time") {
      label = "A tiempo";
    } else if (state === "late") {
      label = "Sobre Tiempo";
    } else if (state === "delayed") {
      label = "Demorado";
    } else if (state === "cancelled") {
      label = "Cancelado";
    } else if (state === "delivered") {
      label = "Recibido";
    }
    return <IonLabel>Estado Actual: {label}</IonLabel>;
  };

  if (data === null || data.length === 0) {
    return (
      <IonPage>
        <Header Title='Ordenes'/>
        <IonContent>
          <h1>Cargando...</h1>
        </IonContent>
      </IonPage>
    );
  }else {
    if(!edit){
      return(
        <IonPage>
          <Header Title='Ordenes'/>
          <IonContent>
            {data?.map((order: any) => (
              <IonCard className='Ion-Card'>
                <IonCardHeader>
                  <IonCardTitle className='Ion-Card-Title'>Pedido: {order.dish.name}</IonCardTitle>
                  <IonCardSubtitle className='Ion-Card-SubTitle'>Orden: {order.id}</IonCardSubtitle>
                </IonCardHeader>
                  <IonCardContent className='Ion-Card-Content'>
                    <IonImg src={order.dish.photo_url} alt="Imagen del plato" className="Ion-Card-Img" />
                    <IonGrid class='Ion_Grid'>
                      <IonRow >
                        <IonLabel class='Ion-Label'>Fecha del pedido: {new Date(order.date).toLocaleString()}</IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonLabel class='Ion-Label'>Descripción: {order.dish.description}</IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonLabel class='Ion-Label'>Cantidad: {order.quantity}</IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonLabel class='Ion-Label'>Precio por unidad: {order.dish.price}</IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonLabel class='Ion-Label'>Precio Total: {order.dish.price*order.quantity}</IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonLabel class='Ion-Label'> {getStateLabel(order.state)}</IonLabel>
                      </IonRow>
                        {(order.state !== "cancelled" && order.state !== "delivered") && (
                         <IonRow>
                         <IonButton className="Ion__Edit" onClick={() => { SetEdit(true); SetOrderId(order.id)}}>
                              Actualizar Pedido
                          </IonButton>
                          <IonButton className="Ion__Cancel" onClick={() => { handleSubmit(order.id) }}>
                            Cancelar Pedido
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
                          </IonRow>
                        )}
                    </IonGrid>
                  </IonCardContent>
              </IonCard>
            ))}
          </IonContent>
        </IonPage>
      );
    } else{
      return(
        <ListData Title='Ordenes' Edit={true} ID={orderId} SetEdit={SetEdit}/>
      );
    }
  }
};

export default Order;
