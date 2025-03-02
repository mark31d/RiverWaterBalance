import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Animated, 
  StyleSheet 
} from 'react-native';

const Loader = ({ onEnd }) => {
  // Анимированное значение для прогресс-бара (от 0 до 1)
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Запускаем анимацию на 5 секунд (5000 ms)
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false, // для изменения стилей ширины лучше false
    }).start(() => {
      // По завершении анимации вызываем onEnd, если он передан
      if (onEnd) onEnd();
    });
  }, [progressAnim, onEnd]);

  // Преобразуем значение 0..1 в ширину прогресс-бара от 0% до 100%
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Капля по центру */}
      <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Текст под логотипом */}
      <Text style={styles.title}>River Water Balance</Text>
      {/* Прогресс-бар внизу экрана */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',   // Белый фон
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '600',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 50,          // Расположим прогресс-бар ближе к низу
    width: '80%',
  },
  progressBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0', // Светло-серый фон
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#CEB47D',  // Золотисто-коричневый цвет (пример)
  },
});