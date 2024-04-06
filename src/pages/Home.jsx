import { useEffect, useState } from 'react';
import MenuList from '../components/MenuList';
import useFetch from '../utils/useFetch';
import ButtonFilter from '../components/ButtonFilter';

const Home = () => {
  const {
    error,
    isPending,
    data: menus,
  } = useFetch('http://localhost:3001/menus');

  const allCategories = ['entrée', 'plat', 'dessert'];
  const [filterCategory, setFilterCategory] = useState(allCategories);
  const [sortedMenus, setSortedMenus] = useState();

  useEffect(() => {
    const sorted = menus?.toSorted((a, b) => (a.title > b.title ? 1 : -1));
    setSortedMenus(sorted);
  }, [menus]);

  const handleFilterAllCategories = () => {
    setFilterCategory(allCategories);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory([category]);
  };

  const filteredMenus = sortedMenus?.filter((menu) =>
    filterCategory?.includes(menu.category)
  );

  return (
    <div className='home'>
      <div className='home-main'>
        <div className='home-main_menu'>
          <h2>Filtres</h2>
          {menus && (
            <ButtonFilter
              filteredCategories={allCategories}
              handleFilterAllCategories={handleFilterAllCategories}
              handleFilterCategory={handleFilterCategory}
            />
          )}
        </div>
        {menus && (
          <MenuList titre='Toutes les recettes' menus={filteredMenus} />
        )}
        {isPending && <div>En attente...</div>}
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default Home;
