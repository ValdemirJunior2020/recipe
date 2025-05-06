import React, { useState } from 'react';
import './App.css';

import Auth from './components/Auth';
import IngredientSearch from './components/IngredientSearch';
import SubmitRecipe from './components/SubmitRecipe';
import SurpriseMe from './components/SurpriseMe';

// React Icons
import { FaUtensils } from 'react-icons/fa';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <header
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          padding: '80px 20px',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1
        }}></div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1><FaUtensils /> Recipe Explorer</h1>
          <p className="lead">
            Find, create, or be surprised by European dishes & desserts
          </p>
        </div>
      </header>

      <div className="container mt-4">
        <Auth user={user} setUser={setUser} />

        {user && (
          <>
            <IngredientSearch />
            <SubmitRecipe />
            <SurpriseMe />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
