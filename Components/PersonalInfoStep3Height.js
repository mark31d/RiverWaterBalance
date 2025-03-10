import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { ProfileContext } from '../Components/ProfileContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MIN_VALUE = 140;
const MAX_VALUE = 190;
const STEP = 1;
const TICK_SPACING = 40;

export default function PersonalInfoStep3Height({ navigation }) {
  const { profile, updateProfile } = useContext(ProfileContext);
  const [height, setHeight] = useState(profile.height || 140);

  const scrollX = useRef(new Animated.Value(0)).current;
  const valuesArray = [];
  for (let val = MIN_VALUE; val <= MAX_VALUE; val += STEP) {
    valuesArray.push(val);
  }

  const currentIndex = height - MIN_VALUE;
  useEffect(() => {
    const initialOffset =
      currentIndex * TICK_SPACING - SCREEN_WIDTH / 2 + TICK_SPACING / 2;
    scrollX.setValue(initialOffset);
  }, []);

  const handleScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const rawIndex = offsetX / TICK_SPACING;
    const roundedIndex = Math.round(rawIndex);
    let newValue = MIN_VALUE + roundedIndex * STEP;
    if (newValue < MIN_VALUE) newValue = MIN_VALUE;
    if (newValue > MAX_VALUE) newValue = MAX_VALUE;
    setHeight(newValue);
  };

  const onNext = () => {
    updateProfile({ height });
    navigation.navigate('PersonalInfoStep4Goal');
  };

  return (
    <ImageBackground
      source={require('../assets/bg.png')} // <-- ваш png-файл
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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

        {/* Основной контент */}
        <View style={styles.centerContent}>
          <Text style={styles.question}>What is your height?</Text>
          <Text style={styles.bigNumber}>{height}</Text>
          <Text style={styles.unit}>cm</Text>

          <View style={styles.rulerWrapper}>
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={TICK_SPACING}
              snapToAlignment="center"
              decelerationRate="fast"
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
              onMomentumScrollEnd={handleScrollEnd}
              contentContainerStyle={{
                paddingHorizontal: SCREEN_WIDTH / 2 - TICK_SPACING / 2,
              }}
            >
              {valuesArray.map((val, index) => {
                const isMajor = val % 10 === 0;
                const inputRange = [
                  (index - 1) * TICK_SPACING,
                  index * TICK_SPACING,
                  (index + 1) * TICK_SPACING,
                ];

                // Анимируем масштаб/прозрачность
                const scale = scrollX.interpolate({
                  inputRange,
                  outputRange: isMajor ? [0.8, 1.5, 0.8] : [0.8, 1.2, 0.8],
                  extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp',
                });                return (
                  <View key={val} style={styles.tickContainer}>
                    {isMajor && (
                      <Animated.Text
                        style={[
                          styles.tickLabel,
                          { transform: [{ scale }], opacity },
                        ]}
                      >
                        {val}
                      </Animated.Text>
                    )}
                    <Animated.View
                      style={[
                        styles.lineTick,
                        isMajor ? styles.majorTick : styles.minorTick,
                        { transform: [{ scale }], opacity },
                      ]}
                    />
                  </View>
                );
              })}
            </Animated.ScrollView>
           
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

// Стили
const styles = StyleSheet.create({
  // Фоновая картинка на весь экран
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

  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 30,
    color: '#333',
    fontWeight: '600',
  },
  bigNumber: {
    fontSize: 60,
    color: '#B09157',
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },

  rulerWrapper: {
    width: '110%',
    height: 150,
    position: 'relative',
    justifyContent: 'center',
  },
  tickContainer: {
    width: TICK_SPACING,
    alignItems: 'center',
  },
  lineTick: {
    width: 2,
    backgroundColor: '#666',
  },
  majorTick: {
    height: 30,
    marginTop: 10,
  },
  minorTick: {
    height: 15,
    marginTop: 25,
  },
  tickLabel: {
    fontSize: 20,
    color: '#333',
    fontWeight: '800',
  },
  
});