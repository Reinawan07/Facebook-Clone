// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedAccessToken = await SecureStore.getItemAsync('accessToken');

        if (storedAccessToken !== null && storedAccessToken !== undefined) {
          // Token exists and is not null or undefined
          setIsSignedIn(true);
          setAccessToken(storedAccessToken);
        } else {
          // Token is null or undefined
          console.error('Access token not found or undefined.');
        }
      } catch (error) {
        console.error('Error fetching or decoding access token:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}