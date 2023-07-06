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
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        return err;
      });
  };
  
  const postLoginMethod = async (first_name: any, last_name: any, phone: any ,address: any, email:any , password: any , password_confirmation: any ) => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    }
    return axios.post(url, { first_name: first_name, last_name: last_name, phone: phone , address: address, email: email, password: password, password_confirmation: password_confirmation}, config)
      .then((response) => {
        setData(response.data);
        return response;
      })
      .catch((err) => {
        setError(err);
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
        setData(response.data);
        return response;
      })
      .catch((err) => {
        setError(err);
        return err
      });
  };

  const putOrderMethod = (id: any,) => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }

    setLoading(true);
    axios.put(`${url}/${id}`, {state: 3}, config)
        .then((response) => { setData(response.data) })
        .catch((err) => { setError(err) })
        .finally(() => { setLoading(false) })
  }



  return { data, loading, error, postLoginMethod, getLoginMethod, postOrderMethod, putOrderMethod };
}

export default ApiMethods; 