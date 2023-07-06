import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
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
  IonGrid
} from '@ionic/react';
import './order.css';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';
 
const Order: React.FC = () => {

  const { data } = ApiMethods(`${environment.apiEndpoint}/orders/params/${sessionStorage.getItem('clientIdLoggin')}`);

  const { putOrderMethod } = ApiMethods(`${environment.apiEndpoint}/orders`);

  const handleSubmit = (order_id: number) => {
    putOrderMethod(order_id);
    window.location.reload();
  }

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

  if (!data) {
    return <h1>Cargando...</h1>;
  } else {
    console.log(data)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <div className="button-container">
              <IonTitle className="Ion__Title">Ordenes</IonTitle>
              <IonButton className="Ion__logout" onClick={() => { sessionStorage.setItem('clientLogginIn', 'false'); window.location.href = "/login"; }}>
                Cerrar Sesión
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>
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
                    <IonRow>
                      {(order.state !== "cancelled" && order.state !== "delivered") && (
                        <IonButton className="Ion__Cancel" onClick={() => { handleSubmit(order.id) }}>
                          Cancelar Pedido
                        </IonButton>
                      )}
                  </IonRow>
                  </IonGrid>
                </IonCardContent>
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    );
  }
};

export default Order;
