import { Link } from 'react-router-dom';

const MenuList = ({ menus, titre }) => {
  return (
    <div>
      <h2>{titre}</h2>
      <div className='menu-preview-container'>
        {menus?.map((menu) => (
          <Link className='links' to={`menus/${menu._id}`} key={menu._id}>
            <div className='menu-preview'>
              <h3>{menu.title.toLowerCase()}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
