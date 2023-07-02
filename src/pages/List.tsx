import './List.css';
import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';


interface Dish {
  name: string;
  description: string;
  price: number;
  photo: string;
  available: boolean;
}

const List: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | undefined>(undefined);
  const [order, setOrder] = useState<Dish[]>([]);

  useEffect(() => {
    fetch('https://example.com/api/dishes')
      .then((response) => response.json())
      .then((data) => setDishes(data.filter((dish: Dish) => dish.available)))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setFilteredDishes(
      dishes.filter((dish) => dish.name.toLowerCase().includes(searchText.toLowerCase()))
    );
  }, [dishes, searchText]);

  const openModal = (dish: Dish) => {
    setSelectedDish(dish);
  };

  const closeModal = () => {
    setSelectedDish(undefined);
  };
//agregar dos botones de add to order y revome to order 
  const addToOrder = (dish: Dish) => {
    setOrder([...order, dish]);
  };

  const removeOrder = (index: number) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);
  };

  const confirmOrder = () => {
    // Send order to server
    setOrder([]);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Main Menu</IonTitle>
          <IonSearchbar value={searchText} onIonChange={(e) => setSearchText(e.detail.value!)}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonMenu side="start" menuId="main-menu">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Dishes</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {filteredDishes.map((dish) => (
                <IonItem key={dish.name} onClick={() => openModal(dish)}>
                  <IonLabel>{dish.name}</IonLabel>
                  <IonLabel slot="end">{dish.price}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonMenu>
        <IonList>
          {order.map((dish, index) => (
            <IonItem key={index}>
              <IonLabel>{dish.name}</IonLabel>
              <IonLabel slot="end">{dish.price}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

export default List;