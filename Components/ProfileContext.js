import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    birthDate: '',
    gender: '',
    climate: 'Mild',
    activity: 'Lightly Active',
    weight: 40,
    height: 140,
    recommended: 2500, // Рекомендуемый объём воды (ml)
    dailyIntake: 0,    // Ежедневный расход воды (ml)
    profileImage: null,
    notificationsEnabled: true,
    lastWaterUpdate: Date.now(),
  });

  const updateProfile = (newData) => {
    setProfile(prev => ({ ...prev, ...newData }));
  };

  // Функция для добавления воды (аналог addWater)
  const addWater = (amount) => {
    setProfile(prev => ({ ...prev, dailyIntake: prev.dailyIntake + amount }));
  };

  // Функция для обновления рекомендуемого объёма воды (аналог updateRecommended)
  const updateRecommended = (value) => {
    setProfile(prev => ({ ...prev, recommended: value }));
  };

  // Функция для сброса ежедневного расхода воды
  const resetIntake = () => {
    setProfile(prev => ({ ...prev, dailyIntake: 0 }));
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        addWater,
        updateRecommended,
        resetIntake,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};