import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <nav className='navbar'>
        <NavLink to='/' className='links'>
          <h1>Menu App</h1>
        </NavLink>
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
