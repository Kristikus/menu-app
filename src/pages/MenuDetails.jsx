import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../utils/useFetch';
import { useEffect, useState } from 'react';

const MenuDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    error,
    isPending,
    data: menu,
  } = useFetch('http://localhost:3001/menus/' + id);

  const [formEdit, setFormEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialData, setInitialData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (menu) {
      setFormData(menu);
      setInitialData(menu);
    }
  }, [menu]);

  const handleChange = () => {
    if (menu) {
      setFormEdit(true);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (menu) {
      const test = formData !== initialData;

      if (test) {
        fetch('http://localhost:3001/menus/' + menu._id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then(() => {
            console.log('modifié !');
          })
          .catch((err) => {
            console.log(err.message);
          });
        setFormEdit(false);
        setInitialData(formData);
        setMessage('Recette bien modifiéé !');
      } else {
        setFormEdit(false);
        setFormData(initialData);
      }
    }
  };

  const handleDelete = () => {
    if (menu) {
      fetch('http://localhost:3001/menus/' + menu._id, {
        method: 'DELETE',
      })
        .then(() => {
          setMessage('Recette bien supprimée !');
          setFormEdit(false);
          setFormData('');
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div className='menu-details'>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {menu && (
        <div>
          {formEdit ? (
            <form className='form-modify'>
              <label>Nom du plat : </label>
              <input
                type='text'
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              ></input>
              <label>Catégorie du plat : </label>
              <select
                name='category'
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value='entrée'>entrée</option>
                <option value='plat'>plat</option>
                <option value='dessert'>dessert</option>
              </select>
              <label>Description du plat : </label>
              <input
                type='text'
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              ></input>
            </form>
          ) : (
            <>
              <h2>{formData.title}</h2>
              <p className='categorie'>{formData.category}</p>
              <p>{formData.description}</p>
            </>
          )}
        </div>
      )}
      {formEdit && (
        <>
          <button onClick={handleSave}>OK</button>
        </>
      )}
      {!formEdit && !message && (
        <button onClick={handleChange}>Modifier</button>
      )}

      {!message && <button onClick={handleDelete}>Supprimer</button>}
      {message && (
        <div>
          <p>
            <i>{message}</i>
          </p>
        </div>
      )}
      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
    </div>
  );
};

export default MenuDetails;
