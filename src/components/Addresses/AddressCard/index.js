import styles from './styles.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { deleteAddress } from '../../../services/api';

const AddressCard = ({ address, reloadAddresses }) => {
  const handleDelete = async () => {
    try {
      const { sucess } = await deleteAddress(address._id);
      if (!sucess) throw Error();

      reloadAddresses();
      alert('Endereço deletado com sucesso!');
    } catch (error) {
      console.log(error);
      alert('Ops, houve algum problema ao tentar deletar o endereço');
    }
  };

  return (
    <div className={styles['address-card']}>
      <div className={styles.dados}>
        <p>Nome: {address.apelido}</p>
        <p>CEP: {address.cep}</p>
        <p>
          Endereço: {address.endereco}, {address.numero}
        </p>
        <p>Bairro: {address.bairro}</p>
        <p>Cidade: {address.cidade}</p>
        <p>Estado: {address.estado}</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.delete} onClick={handleDelete}>
          Deletar
        </button>
        <Link className={styles.edit} to={`/create-address?id=${address._id}`}>
          Editar
        </Link>
      </div>
    </div>
  );
};

export default AddressCard;
