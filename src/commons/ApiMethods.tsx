import axios from 'axios';
import { useEffect, useState } from 'react';

function ApiMethods(url: any) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    setLoading(true);
    axios.get(url, config)
      .then((response) => { setData(response.data) })
      .catch((err) => { setError(err) })
      .finally(() => { setLoading(false) })
  }, [url])

  
  const getLoginMethod = () => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    setLoading(true);
    return axios.get(url, config)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  };
  
  const postLoginMethod = async (first_name: any, last_name: any, phone: any, province:any, canton:any, district:any, street: any, email:any, password: any, password_confirmation: any ) => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    }
    console.log(first_name, last_name, phone, province, canton, district, street, email, password, password_confirmation)
    return axios.post(url, { first_name: first_name, last_name: last_name, phone: phone , province: province, canton: canton, district: district, street: street, email: email, password: password, password_confirmation: password_confirmation}, config)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err
      });
  };


  const postOrderMethod = async (client_id: any, dish_id:any, quantity:any) => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    }
    return axios.post(url, { client_id: client_id, dish_id:dish_id, quantity: quantity}, config)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err
      });
  };

  const putOrderStateMethod = (id: any,) => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    axios.put(`${url}/${id}`, {state: 3, module:1}, config)
        .then((response) => { return response.data })
        .catch((err) => { setError(err) })
  }

  const putOrderMethod = async (id: any, dish_id: any, quantity: any) => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    axios.put(`${url}/${id}`, {dish_id: dish_id, quantity: quantity}, config)
        .then((response) => { return response.data })
        .catch((err) => { setError(err) })
  }

  const putClientMethod = (id: any, first_name: any, last_name: any, phone: any, province:any, canton:any, district:any, street: any, email:any, password: any, password_confirmation: any ) => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }

    setLoading(true);
    axios.put(`${url}/${id}`, { first_name: first_name, last_name: last_name, phone: phone , province: province, canton: canton, district: district, street: street, email: email, password: password, password_confirmation: password_confirmation}, config)
        .then((response) => { return response.data })
        .catch((err) => { setError(err) })
  }



  return { data, loading, error, postLoginMethod, getLoginMethod, postOrderMethod, putOrderMethod, putClientMethod, putOrderStateMethod };
}

export default ApiMethods; 