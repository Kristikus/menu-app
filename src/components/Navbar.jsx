import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <nav className='navbar'>
        <h1>Menu App</h1>
        <div className='navbar-content'>
          <NavLink to='/' className='links'>
            Accueil
          </NavLink>
          <NavLink to='/create' className='links'>
            Nouveau Plat
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
