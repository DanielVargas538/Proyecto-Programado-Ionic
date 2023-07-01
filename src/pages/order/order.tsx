import React from 'react';
 
const Order: React.FC = () => {
  // Variables y funciones para manejar la orden del cliente

  // Funciones para revisar, modificar y confirmar la orden
  const reviewOrder = () => {
    // Lógica para revisar la orden aquí
  };

  const modifyOrder = () => {
    // Lógica para modificar la orden aquí
  };

  const confirmOrder = () => {
    // Lógica para confirmar y enviar la orden aquí
  };

  return (
    <div>
      <h1>Orden</h1>
      {/* Mostrar los platos seleccionados en la orden */}
      {order.map((dish) => (
        <div key={dish.id}>
          <h3>{dish.name}</h3>
          <p>Precio: {dish.price}</p>
        </div>
      ))}
      {/* Enlaces para revisar, modificar y confirmar la orden */}
      <a href="/menu">Volver al menú principal</a>
      <button onClick={reviewOrder}>Revisar orden</button>
      <button onClick={modifyOrder}>Modificar orden</button>
      <button onClick={confirmOrder}>Confirmar orden</button>
    </div>
  );
};

export default Order;
