// File: src/components/Auth.js
import React from 'react';
import { auth, provider, signInWithPopup, signOut } from '../services/firebase';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Auth = ({ user, setUser }) => {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(result => setUser(result.user))
      .catch(error => console.error(error));
  };

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  return (
    <div className="text-center mt-4">
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button className="btn btn-danger" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </>
      ) : (
        <button className="btn btn-primary" onClick={handleLogin}>
          <FaSignInAlt /> Login with Google
        </button>
      )}
    </div>
  );
};

export default Auth;
