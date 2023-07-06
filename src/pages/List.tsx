import { useHistory } from 'react-router';
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
    IonCol 
  } from '@ionic/react';
  import ApiMethods from '../commons/ApiMethods';
  import { environment } from '../environments/environment.dev';

  import '../pages/List.css';

  const List: React.FC = () => {
    const { data } = ApiMethods(`${environment.apiEndpoint}/dishes_availables`);
    const history = useHistory();
    const [counters, setCounters] = useState<{ [dishId: number]: number }>({});
    const [expandedItems, setExpandedItems] = useState<number[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const { postOrderMethod } = ApiMethods (`${environment.apiEndpoint}/orders`);

    const toggleExpansion = (dishId: number) => {
      if (expandedItems.includes(dishId)) {
        setExpandedItems(expandedItems.filter(id => id !== dishId));
      } else {
        setExpandedItems([...expandedItems, dishId]);
      }
    };

    const incrementCounter = (dishId: number, dishName: string) => {
      setCounters(prevCounters => ({
        ...prevCounters,
        [dishId]: (prevCounters[dishId] || 1) + 1
      }));
      setName(dishName);
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

    const sendOrder = (dishId: number, quantity: number) => {
      postOrderMethod(sessionStorage.getItem('clientIdLoggin') ,dishId, quantity)
        .then(() => {
          setMessage('Se ha solicitado una nueva orden')
          console.log('Se ha solicitado una nueva orden')
          window.location.reload();
        })
        .catch((error) => {
          setMessage('Error al solicitar la orden')
          console.log('Error al solicitar la orden')
        });
    };

    if (!data) {
      return <h1>Cargando...</h1>;
    } else {
      console.log(data);
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
            <div className="button-container">
              <IonTitle className="Ion__Title">Menu de platillos</IonTitle>
              <IonButton className="Ion__logout" onClick={() => { sessionStorage.setItem('clientLogginIn', 'false'); window.location.href = "/login"; }}>
                Cerrar Sesión
              </IonButton>
            </div>
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
                          <IonButton className="Counter__Button" onClick={() => incrementCounter(dish.id, dish.name)}>
                            +
                          </IonButton>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                        <IonButton onClick={() => sendOrder(dish.id, counters[dish.id] || 1)}>
                            Enviar: {counters[dish.id] || 1} ordenes
                          </IonButton>
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

  export default List;