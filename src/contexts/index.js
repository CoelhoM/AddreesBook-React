import { createContext, useState } from 'react';
import { getAllAddresses } from '../services/api';

export const AddressesContext = createContext({});

export const AddressesProvider = props => {
  const [addresses, setAddresses] = useState([]);

  const getAddresses = async () => {
    const { data, sucess } = await getAllAddresses();
    if (sucess) setAddresses(data);
  };

  return (
    <AddressesContext.Provider value={{ addresses, reloadAddresses: getAddresses }}>
      {props.children}
    </AddressesContext.Provider>
  );
};
