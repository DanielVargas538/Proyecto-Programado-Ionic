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
} from '@ionic/react';
import '../pages/List.css';
import ApiMethods from '../commons/ApiMethods';
import { environment } from '../environments/environment.dev';

const List: React.FC = () => {
  const { data } = ApiMethods(`${environment.apiEndpoint}/dishes_availables`);
  const [orderCounters, setOrderCounters] = useState<{ [key: number]: number }>({});
  const toggleExpansion = (dishId: number) => {
    setOrderCounters((prevCounters) => {
      const currentCounter = prevCounters[dishId] || 0;
      const updatedCounters = { ...prevCounters, [dishId]: currentCounter + 1 };
      return updatedCounters;
    });
  };

  if (!data) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="Ion__Title">Lista de Platos</IonTitle>
            <IonButton href="/login" onClick={() => localStorage.setItem('clientLogginIn', 'false')}>
              Cerrar Sesion
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {data?.map((dish: any) => (
            <IonCard key={dish.id} onClick={() => toggleExpansion(dish.id)}>
              <IonCardHeader>
                <IonCardTitle>Nombre: {dish.name}</IonCardTitle>
                <IonCardSubtitle>Precio: {dish.price}</IonCardSubtitle>
              </IonCardHeader>
              {orderCounters[dish.id] && (
                <IonCardContent>
                  <IonImg src={dish.photo_url} alt="Imagen del plato" className="dish-image" />
                  <p>Descripción: {dish.description}</p>
                  <p>Contador: {orderCounters[dish.id]}</p>
                  <IonButton>Botón</IonButton>
                </IonCardContent>
              )}
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    );
  }
};

export default List;
