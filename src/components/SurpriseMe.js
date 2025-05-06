import React, { useState } from 'react';
import axios from 'axios';
import { FaMagic } from 'react-icons/fa';

const SurpriseMe = () => {
  const [recipeText, setRecipeText] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchGeminiRecipe = async (type) => {
    try {
      setLoading(true);
      setRecipeText('');
      setRecipeImage('');

      const prompt =
        type === 'dessert'
          ? 'Give me a random European dessert recipe with ingredients and instructions.'
          : 'Give me a random European dish recipe with ingredients and instructions.';

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/gemini`, {
        prompt,
      });

      console.log('Backend response:', response.data);

      const geminiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!geminiText) throw new Error('No recipe text returned from Gemini');

      setRecipeText(geminiText);

      const titleLine = geminiText.split('\n')[0];
      const query = titleLine.replace(/[^a-zA-Z0-9 ]/g, '').trim() || 'european food';

      const imageRes = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID}&searchType=image&key=${process.env.REACT_APP_GOOGLE_SEARCH_KEY}`
      );

      const imageUrl = imageRes.data.items?.[0]?.link;
      setRecipeImage(imageUrl || '');
    } catch (error) {
      console.error('Gemini error:', error.response?.data || error.message);
      setRecipeText('Sorry, could not fetch a recipe. Try again.');
      setRecipeImage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center my-4">
      <h2><FaMagic /> Surprise Me</h2>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-primary" onClick={() => fetchGeminiRecipe('dish')}>
          🍽️ European Dish
        </button>
        <button className="btn btn-success" onClick={() => fetchGeminiRecipe('dessert')}>
          🍰 Dessert
        </button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}

      {recipeText && (
        <div className="mt-4 text-start mx-auto" style={{ maxWidth: '600px' }}>
          <pre>{recipeText}</pre>
        </div>
      )}

      {recipeImage && (
        <div className="mt-4">
          <img
            src={recipeImage}
            alt="Recipe Visual"
            className="img-fluid rounded"
            style={{ maxHeight: '400px' }}
          />
        </div>
      )}
    </div>
  );
};

export default SurpriseMe;
