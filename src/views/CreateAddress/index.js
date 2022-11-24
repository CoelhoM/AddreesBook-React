import { useEffect, useState, useContext } from 'react';
import { editAddress, saveNewAddress } from '../../services/api';
import { getCepData } from '../../services/viacep';
import styles from './styles.module.css';
import { useSearchParams } from 'react-router-dom';
import { AddressesContext } from '../../contexts';

const CreateAddress = () => {
  const { addresses } = useContext(AddressesContext);
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');

  const editingAddress = addresses.find(address => address._id === id);

  useEffect(() => {
    if (!id || !editingAddress) return;

    const { apelido, cep, endereco, numero, bairro, cidade, estado } = editingAddress;

    setAllAddressData(apelido, cep, endereco, numero, bairro, cidade, estado);
  }, [addresses, id, editingAddress]);

  const [apelido, setApelido] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const setAllAddressData = (apelido, cep, endereco, numero, bairro, cidade, estado) => {
    setApelido(apelido);
    setCep(cep);
    setEndereco(endereco);
    setNumero(numero);
    setBairro(bairro);
    setCidade(cidade);
    setEstado(estado);
  };

  const setAddressData = (endereco, bairro, cidade, estado) => {
    setEndereco(endereco);
    setBairro(bairro);
    setCidade(cidade);
    setEstado(estado);
  };

  const cleanFields = () => {
    setCep('');
    setApelido('');
    setEndereco('');
    setBairro('');
    setCidade('');
    setEstado('');
    setNumero('');
  };

  const completeAddress = async () => {
    const { data, sucess } = await getCepData(cep);

    if (sucess && data.logradouro) {
      const { logradouro, bairro, localidade, uf } = data;

      setAddressData(logradouro, bairro, localidade, uf);
    }
  };

  useEffect(() => {
    cep.length === 8 && completeAddress();
  }, [cep]);

  const handleSubmit = async () => {
    const address = { apelido, endereco, cep, numero, bairro, cidade, estado };

    const { sucess } = editingAddress
      ? await editAddress({ ...address, _id: id })
      : await saveNewAddress(address);

    if (sucess) {
      alert('Endereço cadastrado com sucesso');
      cleanFields();
    } else {
      alert('Erro ao tentar cadastrar endereço');
    }
  };

  return (
    <div className={styles.InputFields}>
      <div className={styles.fields}>
        <input placeholder="Apelido" value={apelido} onChange={e => setApelido(e.target.value)} />
        <input placeholder="CEP" value={cep} onChange={e => setCep(e.target.value)} />
        <input
          placeholder="Endereço"
          value={endereco}
          onChange={e => setEndereco(e.target.value)}
        />
        <input placeholder="Número" value={numero} onChange={e => setNumero(e.target.value)} />
        <input placeholder="Bairro" value={bairro} onChange={e => setBairro(e.target.value)} />
        <input placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
        <input placeholder="Estado" value={estado} onChange={e => setEstado(e.target.value)} />
        <div className={styles.button}>
          <button className={styles.salvar} onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAddress;
