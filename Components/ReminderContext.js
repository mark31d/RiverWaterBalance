import React, { createContext, useEffect, useContext } from 'react';
import { AppState, Alert } from 'react-native';
import { ProfileContext } from './ProfileContext';

export const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      // Показываем напоминание, только если уведомления включены
      if (nextAppState === 'background' && profile.notificationsEnabled) {
        const lastUpdate = profile.lastWaterUpdate || Date.now();
        if (Date.now() - lastUpdate > 7200000) {
          Alert.alert(
            'Hydration Reminder',
            "You haven't updated your water intake in 2 hours. Please drink water!"
          );
        }
      }
    });
    return () => subscription.remove();
  }, [profile.lastWaterUpdate, profile.notificationsEnabled]);

  return (
    <ReminderContext.Provider value={{}}>
      {children}
    </ReminderContext.Provider>
  );
};