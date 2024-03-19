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
  const [deleteMessage, setDeleteMessage] = useState(false);

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

  const handleSave = () => {
    if (menu) {
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
    }
  };

  const handleCancel = () => {
    setFormEdit(false);
    setFormData(initialData);
  };

  const handleDelete = () => {
    if (menu) {
      fetch('http://localhost:3001/menus/' + menu._id, {
        method: 'DELETE',
      })
        .then(() => {
          setDeleteMessage(true);
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
      {deleteMessage && (
        <>
          <p>Recette supprimée avec succès !</p>
          <button onClick={() => navigate('/')}>Retour à l'accueil</button>
        </>
      )}

      {menu && (
        <div>
          {formEdit ? (
            <>
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
            </>
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
          <button onClick={handleCancel}>Annuler</button>
          <button onClick={handleSave}>Sauvegarder</button>
        </>
      )}
      {!formEdit && !deleteMessage && (
        <button onClick={handleChange}>Modifier</button>
      )}

      {!deleteMessage && <button onClick={handleDelete}>Supprimer</button>}
    </div>
  );
};

export default MenuDetails;
