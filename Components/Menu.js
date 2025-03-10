import React, { useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
  ImageBackground,
} from 'react-native';
import Svg, { Circle, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';
import { ProfileContext } from '../Components/ProfileContext';

const SCREEN_WIDTH = Dimensions.get('window').width;
const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default function Menu({ navigation }) {
  const { profile, updateProfile } = useContext(ProfileContext);
  const isFocused = useIsFocused();
  const dailyIntake = profile.dailyIntake || 0;
  const recommendedIntake = profile.recommended || 2500;

  const resetIntake = () => {
    updateProfile({ dailyIntake: 0 });
  };

  useEffect(() => {
    if (dailyIntake >= recommendedIntake && dailyIntake !== 0) {
      Alert.alert(
        'Congratulations!',
        "You've reached your water consumption goal for today!",
        [{ text: 'OK', onPress: () => resetIntake() }]
      );
    }
  }, [dailyIntake, recommendedIntake]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const rawProgress = dailyIntake / recommendedIntake;
  const progress = rawProgress > 1 ? 1 : rawProgress < 0 ? 0 : rawProgress;
  const strokeDashoffset = circumference - circumference * progress;
  const fillAnim = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(fillAnim, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const heightRect = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });
  const yRect = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.header}>Home</Text>
        <View style={styles.topCard}>
          <Text style={styles.reminderText}>Stay Hydrated! Remember to drink water regularly</Text>
          <View style={styles.circleWrapper}>
            <Svg width={180} height={180}>
              <Circle cx="90" cy="90" r={radius} stroke="#E0E0E0" strokeWidth={20} fill="none" />
              <Circle
                cx="90"
                cy="90"
                r={radius}
                stroke="#007AFF"
                strokeWidth={20}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
            <View style={styles.dropContainer}>
              <Svg width={80} height={100}>
                <Defs>
                  <ClipPath id="dropClip">
                    <Path d="M40,0 C53,22 80,45 80,70 C80,90 64,100 40,100 C16,100 0,90 0,70 C0,45 27,22 40,0 Z" fill="white" />
                  </ClipPath>
                </Defs>
                <Path d="M40,0 C53,22 80,45 80,70 C80,90 64,100 40,100 C16,100 0,90 0,70 C0,45 27,22 40,0 Z" fill="#E0E0E0" />
                <AnimatedRect
                  x="0"
                  y={yRect}
                  width="80"
                  height={heightRect}
                  fill="#007AFF"
                  clipPath="url(#dropClip)"
                  clipRule="evenodd"
                />
              </Svg>
              <View style={styles.dropTextWrapper}>
                <Text style={styles.dropMainNumber}>{dailyIntake}</Text>
                <Text style={styles.dropSubNumber}>/{recommendedIntake} ml</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.bottomCard}>
            <Text style={styles.intakeLabel}>Your Daily Water Intake</Text>
            <Text style={styles.intakeValue}>{dailyIntake} ml</Text>
          </View>          <View style={styles.bottomCard}>
            <Text style={styles.intakeLabel}>Recommended Water Intake</Text>
            <Text style={styles.intakeValue}>{recommendedIntake} ml</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddWater')}>
          <Text style={styles.addButtonText}>Add Water</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  header: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 20,
  },
  topCard: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  reminderText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  circleWrapper: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropContainer: {
    position: 'absolute',
    width: 80,
    height: 100,
    top: 40,
    left: 50,
  },
  dropTextWrapper: {
    position: 'absolute',
    width: 80,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropMainNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginTop: 20,
  },
  dropSubNumber: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH * 0.9,
    marginBottom: 20,
  },
  bottomCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 5,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
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
  addButton: {
    backgroundColor: '#B09157',
    paddingVertical: 14,
    paddingHorizontal: 130,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});