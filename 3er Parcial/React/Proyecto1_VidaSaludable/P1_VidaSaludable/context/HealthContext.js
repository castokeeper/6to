import React, { createContext, useState, useContext } from 'react';

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [waterCount, setWaterCount] = useState(0);
  const [completedToday, setCompletedToday] = useState([
    'Bowl de Avena con Frutas',
    'Caminata Matutina',
  ]);

  const addWater = (goal) => {
    setWaterCount((prev) => {
      if (prev < goal) {
        return prev + 1;
      }
      return prev;
    });
  };

  const removeWater = () => {
    setWaterCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const completeItem = (title) => {
    setCompletedToday((prev) => {
      if (prev.includes(title)) return prev;
      return [...prev, title];
    });
  };

  const resetDay = () => {
    setWaterCount(0);
    setCompletedToday([]);
  };

  return (
    <HealthContext.Provider
      value={{
        waterCount,
        completedToday,
        addWater,
        removeWater,
        completeItem,
        resetDay,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);
