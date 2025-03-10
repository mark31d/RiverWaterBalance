import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../Components/ProfileContext';
import { launchImageLibrary } from 'react-native-image-picker';

export default function Profile() {
  const { profile, updateProfile } = useContext(ProfileContext);
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [editRecommendedModalVisible, setEditRecommendedModalVisible] = useState(false);
  const [recommendedInput, setRecommendedInput] = useState(String(profile.recommended));

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      else if (response.errorMessage) Alert.alert('Error', response.errorMessage);
      else if (response.assets && response.assets.length > 0) {
        updateProfile({ profileImage: response.assets[0].uri });
      }
    });
  };

  const saveRecommended = () => {
    const newVal = parseInt(recommendedInput, 10);
    if (!isNaN(newVal) && newVal > 0) {
      updateProfile({ recommended: newVal });
      setEditRecommendedModalVisible(false);
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.headerIconWrapper} onPress={handleEditProfile}>
            <Image source={require('../assets/pencil.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.topSection}>
            <TouchableOpacity onPress={handleSelectImage} style={styles.imageWrapper}>
              {profile.profileImage ? (
                <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
              ) : (
                <Image source={require('../assets/Profile.png')} style={styles.profileImage} />
              )}
            </TouchableOpacity>
            <Text style={styles.userName}>{profile.name} {profile.surname}</Text>
            <Text style={styles.birthDate}>{profile.birthDate}</Text>
            <Text style={styles.goalText}>Your goal is the amount of water per day</Text>
            <View style={styles.goalContainer}>
              <Text style={styles.goalNumber}>{profile.recommended}</Text>
              <Text style={styles.goalUnit}>(ml)</Text>
              <TouchableOpacity onPress={() => {
                setRecommendedInput(String(profile.recommended));
                setEditRecommendedModalVisible(true);
              }}>
                <Image source={require('../assets/pencil.png')} style={styles.pencilIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.menuSection}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                Alert.alert(
                  'Developer Website',
                  'This feature will be available in future versions.'
                )
              }
            >
              <Text style={styles.menuText}>Developer Website</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>                Alert.alert('Privacy Policy', 'This feature will be available in future versions.')
              }
            >
              <Text style={styles.menuText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                Alert.alert('Terms of Use', 'This feature will be available in future versions.')
              }
            >
              <Text style={styles.menuText}>Terms of Use</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={editRecommendedModalVisible}
          onRequestClose={() => setEditRecommendedModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Edit Water per Day</Text>
              <TextInput
                style={styles.inputModal}
                value={recommendedInput}
                onChangeText={setRecommendedInput}
                keyboardType="numeric"
                placeholder="Enter new value"
              />
              <TouchableOpacity style={styles.modalButton} onPress={saveRecommended}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
  topSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 12,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  birthDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  goalText: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  goalNumber: {
    fontSize: 24,
    color: '#B09157',
    fontWeight: 'bold',
  },
  pencilIcon: {
    width: 20,
    height: 20,
    tintColor: '#B09157',
    marginLeft: 8,
  },
  goalUnit: {
    fontSize: 15,
    color: '#B09157',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  menuSection: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#000',
  },
  inputModal: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#B09157',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});