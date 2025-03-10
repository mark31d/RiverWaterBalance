import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { ProfileContext } from '../Components/ProfileContext';

export default function AddWater({ navigation }) {
  const [amount, setAmount] = useState('');
  const { addWater, profile } = useContext(ProfileContext);

  const handleSave = () => {
    const ml = parseInt(amount, 10);
    if (!isNaN(ml) && ml > 0) {
      addWater(ml);
      navigation.goBack();
    } else {
      navigation.goBack();
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/arrow.png')}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Add Water</Text>

          <TouchableOpacity onPress={handleSave}>
            <Image
              source={require('../assets/accept.png')}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.intakeRow}>
          <View style={styles.intakeBox}>
            <Text style={styles.intakeLabel}>Your Daily Water Intake</Text>
            <Text style={styles.intakeValue}>{profile.dailyIntake} ml</Text>
          </View>

          <View style={styles.intakeBox}>
            <Text style={styles.intakeLabel}>Recommended Water Intake</Text>
            <Text style={styles.intakeValue}>{profile.recommended} ml</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image
            source={require('../assets/Logo.png')}
            style={{
              width: 150,
              height: 150,
              transform: [{ rotate: '15deg' }],
            }}
          />
        </View>

        <View style={styles.centerContent}>
          <Text style={styles.label}>Amount of water consumed (ml)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter amount.."
            value={amount}
            onChangeText={setAmount}
          />
          <TouchableOpacity style={styles.bigButton} onPress={handleSave}>
            <Text style={styles.bigButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}const styles = StyleSheet.create({
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
  intakeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  intakeBox: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  intakeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  intakeValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerContent: {
    alignItems: 'center',
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  bigButton: {
    backgroundColor: '#B09157',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 60,
  },
  bigButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});