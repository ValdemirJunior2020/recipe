import React, { useState } from 'react';
import axios from 'axios';
import { FaDice, FaDrumstickBite } from 'react-icons/fa';
import { GiCakeSlice } from 'react-icons/gi';

const SurpriseMe = () => {
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [image, setImage] = useState('');

  const fetchImage = async (query) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&searchType=image&num=1&key=${process.env.REACT_APP_GOOGLE_SEARCH_KEY}&cx=${process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID}`
      );
      console.log("Image search result:", res.data);
      if (res.data.items && res.data.items.length > 0) {
        setImage(res.data.items[0].link);
      } else {
        setImage('');
        console.warn("No image found.");
      }
    } catch (err) {
      console.error('Image error:', err.response?.data || err.message);
      setImage('');
    }
  };

  const fetchGeminiRecipe = async (type) => {
    setLoading(true);
    setError('');
    setRecipe(null);
    setImage('');

    // ✨ Add a random ID to make prompt unique every time
    const randomizer = Math.floor(Math.random() * 1000000);
    const prompt = `
      Give me a random traditional European ${type}. This is request ID #${randomizer}.
      Respond ONLY in this JSON format:
      {
        "name": "...",
        "ingredients": ["...", "..."],
        "instructions": "..."
      }
    `;

    try {
      const res = await axios.post('http://localhost:5000/api/gemini', {
        prompt: prompt
      });

      const text = res.data.candidates[0].content.parts[0].text;
      console.log('Gemini response text:', text);

      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        setRecipe(parsed);
        fetchImage(parsed.name);
      } else {
        setError("Invalid response from Gemini.");
        console.error('Could not parse recipe JSON:', text);
      }
    } catch (err) {
      console.error('Gemini error:', err.response?.data || err.message);
      setError("Failed to fetch recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <h4><FaDice /> Surprise Me</h4>
      <div className="mb-3">
        <button className="btn btn-info me-2" onClick={() => fetchGeminiRecipe('dish')} disabled={loading}>
          <FaDrumstickBite /> Surprise Dish
        </button>
        <button className="btn btn-warning" onClick={() => fetchGeminiRecipe('dessert')} disabled={loading}>
          <GiCakeSlice /> Surprise Dessert
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {recipe && (
        <div className="card p-3">
          <h5>{recipe.name}</h5>
          {image && <img src={image} alt={recipe.name} className="img-fluid mb-3" />}
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default SurpriseMe;
