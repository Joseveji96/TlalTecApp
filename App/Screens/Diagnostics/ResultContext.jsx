// ResultContext.js
import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext(null);

export const useResult = () => useContext(ResultContext);

export const ResultContextProvider = ({ children }) => {
  const [resultado, setResultado] = useState('');

  const updateResultado = (value) => {
    setResultado(value);
  };

  return (
    <ResultContext.Provider value={{ resultado, updateResultado }}>
      {children}
    </ResultContext.Provider>
  );
};
