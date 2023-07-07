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
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonAlert 
} from '@ionic/react';
import ApiMethods from '../../../commons/ApiMethods';
import { environment } from '../../../environments/environment.dev';
import './listData.css';

const ListData: React.FC <{ Title: string, Edit: boolean, ID: number, SetEdit :any }> = (props) => {
 
  const [counters, setCounters] = useState<{ [dishId: number]: number }>({});
  const [expandedItems, setExpandedItems] = useState<number[]>([]); 
  const [header, setHeader] = useState('');
  const [message, setMessage] = useState('');
  const [searchValue, setSearchValue] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  
  const { postOrderMethod } = ApiMethods (`${environment.apiEndpoint}/orders`);
  const { putOrderMethod } = ApiMethods (`${environment.apiEndpoint}/orders/params`);

  const { data } = ApiMethods(`${environment.apiEndpoint}/dishes_for_name/${searchValue}`);

  const handleSearch = (event: InputChangeEventDetail) => {
    const searchValue = event.value || null;;
    setSearchValue(searchValue);
  };
  
  const toggleExpansion = (dishId: number) => {
    if (expandedItems.includes(dishId)) {
      setExpandedItems(expandedItems.filter(id => id !== dishId));
    } else {
      setExpandedItems([...expandedItems, dishId]);
    }
  };

  const incrementCounter = (dishId: number) => {
    setCounters(prevCounters => ({
      ...prevCounters,
      [dishId]: (prevCounters[dishId] || 1) + 1
    }));
  };

  const decrementCounter = (dishId: number) => {
    setCounters(prevCounters => {
      const currentCounter = prevCounters[dishId] || 0;
      if (currentCounter > 0) {
        return {
          ...prevCounters,
          [dishId]: currentCounter - 1
        };
      }
      return prevCounters;
    });
  };

  const handleAlertOk = () => {
    setShowAlert(false);
    window.location.reload();
  };

  const sendOrderPost = (dishId: number, quantity: number) => {
    postOrderMethod(sessionStorage.getItem('clientIdLoggin'), dishId, quantity)
      .then(() => {
        setHeader('Exito')
        setMessage('Se ha solicitado una nueva orden')
        setShowAlert(true);
      })
      .catch((error) => {
        setHeader('Error')
        setMessage('No se ha podido solicitar la orden');
        setShowAlert(true);
      });
  };

  const sendOrderPut = (dishId: number, quantity: number) => {
    putOrderMethod(props.ID ,dishId, quantity)
      .then(() => {
        setHeader('Exito')
        setMessage('Se ha actualizado la nueva orden')
        setShowAlert(true);
      })
      .catch((error) => {
        setHeader('Error')
        setMessage('No se ha podido actualizar la orden');
        setShowAlert(true);
      });
  };

  if (!data) {
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <div className="button-container">
          {(props.Edit) && (
            <IonButton className="Ion__ReturnEdit" onClick={() => { props.SetEdit(false) }}>Volver a Ordenes</IonButton>
          )}    
          <IonTitle className="Ion__Title">{props.Title}</IonTitle>
          <IonButton className="Ion__logout" onClick={() => { sessionStorage.setItem('clientLogginIn', 'false'); window.location.href = "/login"; }}>
            Cerrar Sesión
          </IonButton>
          </div>
          <IonSearchbar
            placeholder="Buscar"
            value={searchValue}
            onIonChange={(event: CustomEvent<InputChangeEventDetail>) => handleSearch(event.detail)}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Cargando...</h1>
      </IonContent>
    </IonPage>
      );
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
          <div className="button-container">
            {(props.Edit) && (
              <IonButton className="Ion__ReturnEdit" onClick={() => { props.SetEdit(false) }}>Volver a Ordenes</IonButton>
            )}    
            <IonTitle className="Ion__Title">{props.Title}</IonTitle>
            <IonButton className="Ion__logout" onClick={() => { sessionStorage.setItem('clientLogginIn', 'false'); window.location.href = "/login"; }}>
              Cerrar Sesión
            </IonButton>
            </div>
            <IonSearchbar
              placeholder="Buscar"
              value={searchValue}
              onIonChange={(event: CustomEvent<InputChangeEventDetail>) => handleSearch(event.detail)}
            ></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {data?.map((dish: any) => (
            <IonCard key={dish.id}>
              <IonCardHeader onClick={() => toggleExpansion(dish.id)}>
                <IonCardTitle>
                  Plato: {dish.name}
                </IonCardTitle>
                <IonCardSubtitle>
                  Precio: {dish.price}
                </IonCardSubtitle>
              </IonCardHeader>
              {expandedItems.includes(dish.id) && (
                <IonCardContent>
                  <IonImg src={dish.photo_url} className="Dish__Image" onClick={() => toggleExpansion(dish.id)} />
                  <IonCardSubtitle>Descripción: {dish.description}</IonCardSubtitle>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="auto">
                        <IonButton className="Counter__Button" onClick={() => decrementCounter(dish.id)}>
                          -
                        </IonButton>
                      </IonCol>
                      <IonCol size="auto">
                        <IonButton className="Counter__Button" onClick={() => incrementCounter(dish.id)}>
                          +
                        </IonButton>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                      <IonButton
                        onClick={() => {
                            if (!props.Edit) {
                            sendOrderPost(dish.id, counters[dish.id] || 1);
                            } else {
                            sendOrderPut(dish.id, counters[dish.id] || 1);
                            }
                        }}
                        >
                        Enviar: {counters[dish.id] || 1} ordenes
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
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              )}
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    );
  }
};

export default ListData;