import React, { useState } from 'react';
import { db, collection, getDocs, query } from '../services/firebase';


const IngredientSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    const inputList = ingredients.toLowerCase().split(',').map(item => item.trim());
    const q = query(collection(db, "recipes"));
    const snapshot = await getDocs(q);

    const matches = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(recipe =>
        inputList.every(item =>
          recipe.ingredients.map(i => i.toLowerCase()).includes(item)
        )
      );

    setRecipes(matches);
  };

  return (
    <div className="mt-5">
      <h4>Enter Ingredients You Have</h4>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="e.g. eggs, milk, sugar"
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
      />
      <button className="btn btn-success mb-4" onClick={handleSearch}>Find Recipes</button>

      {recipes.map(recipe => (
        <div key={recipe.id} className="card mb-3 p-3">
          <h5>{recipe.name}</h5>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
};

export default IngredientSearch;
