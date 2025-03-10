import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDown from '../Components/DropDown';
import { ProfileContext } from '../Components/ProfileContext';

export default function EditProfile({ navigation }) {
  const { profile, updateProfile } = useContext(ProfileContext);
  const [name, setName] = useState(profile.name || '');
  const [surname, setSurname] = useState(profile.surname || '');
  const [birthDate, setBirthDate] = useState(profile.birthDate || '');
  const [gender, setGender] = useState(profile.gender || '');
  const [height, setHeight] = useState(profile.height ? String(profile.height) : '');
  const [weight, setWeight] = useState(profile.weight ? String(profile.weight) : '');
  const [climate, setClimate] = useState(profile.climate || 'Mild');
  const [activity, setActivity] = useState(profile.activity || 'Lightly Active');
  const [profileImage, setProfileImage] = useState(profile.profileImage || null);

  const climateOptions = ['Hot and humid', 'Mild', 'Cold'];
  const activityOptions = ['Sedentary', 'Lightly Active', 'Moderately', 'Very Active', 'Extra Active'];

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        return;
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleSave = () => {
    const numericHeight = parseInt(height, 10) || 0;
    const numericWeight = parseInt(weight, 10) || 0;
    updateProfile({
      name,
      surname,
      birthDate,
      gender,
      height: numericHeight,
      weight: numericWeight,
      climate,
      activity,
      profileImage,
    });
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/arrow.png')}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave}>
            <Image
              source={require('../assets/accept.png')}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.imageWrapper}>
            <TouchableOpacity onPress={handleSelectImage}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholder}>
                  <Image
                    source={require('../assets/Profile.png')}
                    style={styles.placeholderIcon}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>

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
          />          <Text style={styles.label}>Date of birth</Text>
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

          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the text.."
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />

          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the text.."
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
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

          <View style={{ height: 40 }}>
            <Text></Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    width: 40,
    height: 40,
    tintColor: '#999',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});