import axios from 'axios';

export const getCepData = async cep => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const address = response.data;

    return { sucess: true, data: address };
  } catch (error) {
    console.log(error);
    return { sucess: false, data: null };
  }
};
