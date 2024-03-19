import { useState } from 'react';
import MenuList from '../components/MenuList';
import useFetch from '../utils/useFetch';
import ButtonFilter from '../components/ButtonFilter';

const Home = () => {
  const {
    error,
    isPending,
    data: menus,
  } = useFetch('http://localhost:3001/menus');

  // nouveau tableau avec les catégories uniques (plat et entrée)
  const filteredCategories = [
    // ...new Set(menus?.map((filteredCategory) => filteredCategory.category)),
    'entrée',
    'plat',
    'dessert',
  ];

  const [filterCategory, setFilterCategory] = useState(filteredCategories);

  return (
    <div className='home'>
      <div className='home-main'>
        <div className='home-main_menu'>
          <h2>Filtres</h2>
          {menus && (
            <ButtonFilter
              filteredCategories={filteredCategories}
              setFilterCategory={setFilterCategory}
            />
          )}
        </div>
        {menus && <MenuList titre='Toutes les recettes' menus={menus} />}
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default Home;
