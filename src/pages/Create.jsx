import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'entrée',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('http://localhost:3001/menus', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(formData),
    }).then(() => {
      console.log('Recette ajoutée !');
      setIsLoading(false);
      navigate('/');
    });
  };

  return (
    <div>
      <h2 className='create-h2'>Ajouter un nouveau plat</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom du nouveau plat : </label>
        <input
          name='title'
          id='title'
          type='text'
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        ></input>
        <label>Type de plat : </label>
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
        <label>Description : </label>
        <textarea
          id='description'
          required
          value={formData.description}
          name='description'
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
        {!isLoading ? (
          <button>Créer nouveau plat</button>
        ) : (
          <button disabled>En cours d'ajout...</button>
        )}
      </form>
    </div>
  );
};

export default Create;
