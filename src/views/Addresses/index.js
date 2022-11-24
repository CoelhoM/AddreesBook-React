import { useContext } from 'react';
import AddressCard from '../../components/Addresses/AddressCard';
import { AddressesContext } from '../../contexts';
import styles from './styles.module.css';

const Addresses = () => {
  const { addresses, reloadAddresses } = useContext(AddressesContext);
  return (
    <div className={styles.addresses}>
      <div className="addresses-list">
        {addresses.map(address => {
          return (
            <AddressCard reloadAddresses={reloadAddresses} address={address} key={address._id} />
          );
        })}
      </div>
    </div>
  );
};

export default Addresses;
