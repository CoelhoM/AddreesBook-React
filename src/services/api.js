import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4567/address' });

export const getAllAddresses = async () => {
  try {
    const response = await api.get('/');
    const addresses = response.data;

    return { sucess: true, data: addresses };
  } catch (error) {
    console.log(error);
    return { sucess: false, data: null };
  }
};
export const saveNewAddress = async address => {
  try {
    await api.post('/', address);

    return { sucess: true, data: null };
  } catch (error) {
    console.log(error);
    return { sucess: false, data: null };
  }
};

export const editAddress = async address => {
  try {
    await api.patch(`/${address._id}`, address);

    return { sucess: true, data: null };
  } catch (error) {
    console.log(error);
    return { sucess: false, data: null };
  }
};

export const deleteAddress = async id => {
  try {
    await api.delete(`/${id}`);

    return { sucess: true, data: null };
  } catch (error) {
    console.log(error);
    return { sucess: false, data: null };
  }
};
