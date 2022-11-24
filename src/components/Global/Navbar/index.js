import styles from './styles.module.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Navbar = props => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const goTo = route => {
    if (route === '/create-address' && route === location.pathname) {
      const idExists = searchParams.get('id');

      if (idExists) {
        searchParams.delete('id');
        setSearchParams(searchParams);
      }
      return navigate(0);
    }

    navigate(route);
  };

  const isCurrentRoute = route => (location.pathname === route ? styles.underline : '');

  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>
        <h1>Address Book - {props.titulo}</h1>
      </div>
      <div className={styles.pages}>
        <ul className={styles.routes}>
          <li>
            <a
              className={`${styles.route} ${isCurrentRoute('/create-address')}`}
              onClick={() => goTo('/create-address')}
            >
              Cadastrar Endereço
            </a>
          </li>
          <li>
            <a
              className={`${styles.route} ${isCurrentRoute('/addresses')}`}
              onClick={() => goTo('/addresses')}
            >
              Endereços Cadastrados
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
