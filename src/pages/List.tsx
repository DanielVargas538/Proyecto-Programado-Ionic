import './List.css';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,IonImg
} from "@ionic/react";

import ApiMethods from '../commons/ApiMethods';

import { environment } from '../environments/environment.dev';

const List: React.FC = () => {

  const { data } = ApiMethods(`${environment.apiEndpoint}/dishes`);

  if (!data) {
    return <h1>Cargando...</h1>
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle  className='Ion__Title'>
              Lista de Platos
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {data?.map((dish: any) => {
            return (
              <IonCard className='Ion__Card' key={dish.id}>
                <IonCardHeader>
                  <IonCardTitle className='Ion__Card__Title'>Nombre: {dish.name}</IonCardTitle>
                  <IonCardSubtitle className='Ion__Card__Subtitle'>Precio: {dish.price}</IonCardSubtitle>
                  <IonCardSubtitle className='Ion__Card__Subtitle'>ID: {dish.id}</IonCardSubtitle>
                  <IonImg src={`${environment.apiEndpoint}/photos/${dish.id}`} />
                </IonCardHeader>
                
              </IonCard>
            )
          })}
        </IonContent>
      </IonPage>
    )
  }
};

export default List;