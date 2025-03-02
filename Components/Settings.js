import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import { ProfileContext } from '../Components/ProfileContext';
import { useAudio } from './AudioContext';

const { width, height } = Dimensions.get('window');

const Settings = ({ navigation }) => {
  const { isMusicPlaying, setIsMusicPlaying, volume, setVolume } = useAudio();
  const { profile, updateProfile } = useContext(ProfileContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    profile.notificationsEnabled !== undefined ? profile.notificationsEnabled : true
  );
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(profile.rating || 0);

  useEffect(() => {
    updateProfile({ musicEnabled: isMusicPlaying, musicVolume: volume, notificationsEnabled, rating });
  }, [isMusicPlaying, volume, notificationsEnabled, rating]);

  const increaseVolume = () => {
    setVolume(prev => Math.min(1, prev + 0.1));
  };

  const decreaseVolume = () => {
    setVolume(prev => Math.max(0, prev - 0.1));
  };

  const submitRating = () => {
    setRatingModalVisible(false);
    Alert.alert('Thank you!', 'Thank you for your feedback!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerIconWrapper} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/arrow.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/Logo.png')} style={styles.logo} />
         
        </View>
        <TouchableOpacity style={styles.rateButton} onPress={() => { setRating(0); setRatingModalVisible(true); }}>
          <Text style={styles.rateButtonText}>Rate us!</Text>
        </TouchableOpacity>
        {rating > 0 && (
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Text key={star} style={styles.star}>
                {star <= rating ? '★' : '☆'}
              </Text>
            ))}
          </View>
        )}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
            trackColor={{ false: '#767577', true: '#B09157' }}
            thumbColor={notificationsEnabled ? '#fff' : '#fff'}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Music</Text>
          <Switch
            value={isMusicPlaying}
            onValueChange={setIsMusicPlaying}
            trackColor={{ false: '#767577', true: '#B09157' }}
            thumbColor={isMusicPlaying ? '#fff' : '#fff'}
          />
        </View>
        <View style={styles.volumeContainer}>
          <TouchableOpacity style={styles.volumeButton} onPress={decreaseVolume}>
            <Text style={styles.volumeButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
          <TouchableOpacity style={styles.volumeButton} onPress={increaseVolume}>
            <Text style={styles.volumeButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={ratingModalVisible}
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Rate Us</Text>            <View style={styles.starsContainerModal}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text style={styles.starModal}>
                    {star <= rating ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={submitRating}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 30,
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
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
  },
  rotatedImage: {
    width: width * 0.4,
    height: width * 0.1,
    resizeMode: 'contain',
    transform: [{ rotate: '15deg' }],
    marginTop: 8,
  },
  rateButton: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.01,
  },
  rateButtonText: {
    fontSize: width * 0.05,
    color: '#B09157',
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    width: '100%',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    width: '100%',
    justifyContent: 'space-between',
  },
  volumeButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#B09157',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeButtonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  volumeText: {
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
  starsContainerModal: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starModal: {
    fontSize: 30,
    marginHorizontal: 5,
    color: '#FFD700',
  },
  modalButton: {
    backgroundColor: '#B09157',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 20,
    marginHorizontal: 2,
    color: '#FFD700',
  },
});

export default Settings;