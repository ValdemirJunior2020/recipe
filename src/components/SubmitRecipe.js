import React, { useState } from 'react';
import { db, collection, addDoc } from '../services/firebase';

const SubmitRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ingredientList = ingredients.split(',').map(item => item.trim());

    try {
      await addDoc(collection(db, 'recipes'), {
        name,
        ingredients: ingredientList,
        instructions,
        country
      });
      setMessage('✅ Recipe submitted successfully!');
      setName('');
      setIngredients('');
      setInstructions('');
      setCountry('');
    } catch (error) {
      setMessage('❌ Error submitting recipe.');
      console.error(error);
    }
  };

  return (
    <div className="mt-5">
      <h4>🍲 Submit a New Recipe</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Recipe Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Ingredients (comma-separated)"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Instructions"
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Country (optional)"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit Recipe</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default SubmitRecipe;
