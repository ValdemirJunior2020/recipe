import React, { useState } from 'react';
import axios from 'axios';
import { FaUtensils, FaIceCream } from 'react-icons/fa';

function SurpriseMe() {
  const [recipe, setRecipe] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchGeminiRecipe = async (type) => {
    try {
      setLoading(true);
      setRecipe('');
      setImageUrl('');

      const response = await axios.post(
        'https://recipe-backend-h4b0.onrender.com/api/gemini',
        { type }
      );

      console.log('Gemini response:', response.data);
      setRecipe(response.data.recipe);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Gemini error:', error);
      setRecipe('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card text-center my-4">
      <div className="card-body">
        <h5 className="card-title">🎲 Surprise Me</h5>
        <p className="card-text">Let Gemini pick a random recipe for you</p>
        <button
          className="btn btn-primary mx-2"
          onClick={() => fetchGeminiRecipe('european dish')}
        >
          <FaUtensils className="me-2" />
          Surprise Me with European Dish
        </button>
        <button
          className="btn btn-warning mx-2"
          onClick={() => fetchGeminiRecipe('dessert')}
        >
          <FaIceCream className="me-2" />
          Surprise Me with Dessert
        </button>

        {loading && <p className="mt-3">Loading...</p>}

        {recipe && (
          <div className="mt-4">
            <h6 className="fw-bold">🍽️ Gemini Recipe</h6>
            <pre className="text-start bg-light p-3 rounded">{recipe}</pre>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Recipe"
                className="img-fluid mt-3 rounded shadow"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SurpriseMe;
