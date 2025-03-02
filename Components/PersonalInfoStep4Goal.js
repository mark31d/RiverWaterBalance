import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { ProfileContext } from '../Components/ProfileContext';

export default function PersonalInfoStep4Goal({ navigation }) {
  const { updateProfile } = useContext(ProfileContext);
  const [goal, setGoal] = useState('');

  const onSave = () => {
    const val = parseInt(goal, 10);
    if (!isNaN(val) && val > 0) {
      // Обновляем цель в контексте
      updateProfile({ recommended: val });
      // Переходим на вкладку с экраном воды без передачи параметров
      navigation.navigate('Tabs', {
        screen: 'WaterTab',
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.headerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Info</Text>
        <TouchableOpacity onPress={onSave}>
          <Image
            source={require('../assets/accept.png')}
            style={styles.headerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.centerContent}>
        <Text style={styles.question}>
          How much water do you want to drink per day?
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.goalInput}
            keyboardType="numeric"
            placeholder="Enter a number"
            placeholderTextColor="#BBB"
            value={goal}
            onChangeText={setGoal}
          />
        </View>
        <Text style={styles.unitLabel}>(ml)</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  /* Основной контейнер экрана */
  container: {
    flex: 1,
    backgroundColor: '#F10F1F1',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  /* Шапка: «стрелка назад», заголовок, «галочка» */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerIcon: {
    width: 50,
    height: 50,
    tintColor: 'black',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  /* Центрируем основной контент по вертикали и горизонтали */
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
  },
  /* Обёртка для поля ввода, чтобы придать ему форму квадрата */
  inputWrapper: {
    width: 190,
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // тень (iOS + Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Поле ввода внутри «квадрата» */
  goalInput: {
    fontSize: 26,
    color: '#B09157',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  unitLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#AAA',
  },
});