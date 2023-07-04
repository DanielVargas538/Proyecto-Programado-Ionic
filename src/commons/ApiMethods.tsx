import axios from 'axios';
import { useEffect, useState } from 'react';

export async function loginApiRequest(email: string, password: string): Promise<number> {
  const url = `${process.env.REACT_APP_API_URL}/user_logs/params`;

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.get(url, {
      params: { email, password },
      ...config
    });
    return response.status;
  } catch (error: any) {
    if (error && error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Error desconocido en la solicitud');
    }
  }
}

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



  const postMethod = (name: any, price: any) => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    axios
      .post(url, { name: name, price: price }, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const putMethod = (id: any, name: any, price: any) => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    setLoading(true);
    axios.put(`${url}/${id}`, { name: name, price: price }, config)
      .then((response) => { setData(response.data) })
      .catch((err) => { setError(err) })
      .finally(() => { setLoading(false) })
  }

  const deleteMethod = (id: any) => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    setLoading(true);
    axios.delete(`${url}/${id}`, config)
      .then((response) => { setData(response.data) })
      .catch((err) => { setError(err) })
      .finally(() => { setLoading(false) })
  }

  return { data, loading, error, postMethod, putMethod, deleteMethod };
}

export default ApiMethods; 