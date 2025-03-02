import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import DropDown from '../Components/DropDown';
import { ProfileContext } from '../Components/ProfileContext';

export default function PersonalInfoStep1({ navigation }) {
  const { updateProfile } = useContext(ProfileContext);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const climateOptions = ['Hot and humid', 'Mild', 'Cold'];
  const [climate, setClimate] = useState('Mild');
  const activityOptions = [
    'Sedentary',
    'Lightly Active',
    'Moderately',
    'Very Active',
    'Extra Active',
  ];
  const [activity, setActivity] = useState('Lightly Active');

  const onNext = () => {
    // Обновляем контекст с введёнными данными
    updateProfile({ name, surname, birthDate, gender, climate, activity });
    navigation.navigate('PersonalInfoStep2Weight');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => { /* Назад или logout */ }}>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.headerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Info</Text>
        <TouchableOpacity onPress={onNext}>
          <Image
            source={require('../assets/accept.png')}
            style={styles.headerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the text.."
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Surname</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the text.."
          value={surname}
          onChangeText={setSurname}
        />
        <Text style={styles.label}>Date of birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the text.."
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the text.."
          value={gender}
          onChangeText={setGender}
        />
        <Text style={styles.label}>Select your climate</Text>
        <DropDown
          options={climateOptions}
          selectedValue={climate}
          onSelect={setClimate}
        />
        <Text style={styles.label}>Select your activity level</Text>
        <DropDown
          options={activityOptions}
          selectedValue={activity}
          onSelect={setActivity}
        />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  // Иконки в шапке
  headerIcon: {
    width: 50,
    height: 50,
    tintColor: 'black',
    backgroundColor:'#FFFFFF',
    borderRadius:10,
    padding:10,
    
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 14,
    marginBottom: 10,

    // Тень (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Тень (Android)
    elevation: 2,
  },
});