import { useEffect, useContext } from 'react';
import Navbar from './components/Global/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Addresses from './views/Addresses';
import CreateAddress from './views/CreateAddress';
import { AddressesContext} from './contexts';

const App = () => {
  const {reloadAddresses} = useContext(AddressesContext);
  const location = useLocation();

  useEffect(() => {
    reloadAddresses();
  }, [location]);

  const titleGroup = {
    '/': 'Endereços Cadastrados',
    '/addresses': 'Endereços Cadastrados',
    '/create-address': 'Cadastrar Endereço',
  };

  

  return (
    <div id="app">
      <Navbar titulo={titleGroup[location.pathname]} />
      <Routes>
        <Route path="/" element={<Addresses />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/create-address" element={<CreateAddress />} />
      </Routes>
    </div>
  );
};

export default App;
