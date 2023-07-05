import React, { useState, useEffect } from 'react';
import './List.css';
import { useHistory } from 'react-router-dom';

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
  IonImg,
  IonButton,
  IonSearchbar

} from "@ionic/react";

import ApiMethods from '../commons/ApiMethods';

import { environment } from '../environments/environment.dev';

const List: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const { data, loading, error } = ApiMethods(`${environment.apiEndpoint}/dishes`);
  const [filteredData, setFilteredData] = useState(data);

  const history = useHistory();
  useEffect(() => {
    if (searchText) {
      const filtered = data?.filter((dish: any) =>
        dish.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchText, data]);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle  className='Ion__Title'>
              Lista de Platos
            </IonTitle>
            <IonButton href='/login' onClick={() => localStorage.setItem('clientLogginIn', 'false')}>Cerrar Sesion</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonSearchbar
          color="medium"
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
          placeholder="Buscar por nombre"
        ></IonSearchbar>
        {filteredData?.map((dish: any) => (
          <IonCard className="Ion__Card" key={dish.id} onClick={() => history.push(`/dishes/${dish.id}`)}>
            <IonCardHeader>
              <IonCardTitle className="Ion__Card__Title">
                Nombre: {dish.name}
              </IonCardTitle>
              <IonCardSubtitle className="Ion__Card__Subtitle">
                Precio: {dish.price}
              </IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default List;