import React, { useState } from 'react';
import axios from 'axios';
import { FaSurprise } from 'react-icons/fa';

function SurpriseMe() {
  const [recipe, setRecipe] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchGeminiRecipe = async (type) => {
    setLoading(true);
    setRecipe('');
    setImage('');

    try {
      const response = await axios.post('https://recipe-backend-h4b0.onrender.com/api/gemini', { type });
      console.log('Backend response:', response.data);

      setRecipe(response.data.recipe);
      setImage(response.data.imageUrl);
    } catch (error) {
      console.error('Gemini error:', error.response?.data || error.message);
      setRecipe('Failed to fetch recipe. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="text-center mt-5">
      <h3><FaSurprise /> Surprise Me!</h3>
      <p>Click one of the buttons below to get a random recipe:</p>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-primary" onClick={() => fetchGeminiRecipe('European dish')}>
          🍝 Surprise Me with a Dish
        </button>
        <button className="btn btn-secondary" onClick={() => fetchGeminiRecipe('Dessert')}>
          🍰 Surprise Me with a Dessert
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {image && <img src={image} alt="Dish" className="img-fluid rounded shadow mb-3" style={{ maxHeight: '300px' }} />}
      {recipe && <pre className="text-start bg-light p-3 rounded">{recipe}</pre>}
    </div>
  );
}

export default SurpriseMe;
