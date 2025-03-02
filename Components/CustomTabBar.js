import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Цвет фона родительского контейнера (под «пилюлей»)
const CONTAINER_BG = '#B09157';
// Цвет самой «пилюли»
const PILL_BG = '#B09157';
// Цвет иконки, когда таб НЕ активен
const INACTIVE_ICON_COLOR = '#FFFFFF';
// Цвет иконки и метки, когда таб активен
const ACTIVE_ICON_COLOR = '#FFFFEE'; // Можете изменить под свои нужды

export default function CustomTabBar({ state, descriptors, navigation }) {
  // Используем безопасные отступы для iOS (нижняя «чёлка» и т.п.)
  const insets = useSafeAreaInsets();

  return (
    // Родительский контейнер
    <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
      {/* Внутренний контейнер («пилюля») */}
      <View style={styles.tabBarInner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key] || {};
          const isFocused = state.index === index;

          // Подбираем иконку и метку по имени маршрута
          let iconSource;
          let label = '';
          switch (route.name) {
            case 'WaterTab':
              iconSource = require('../assets/water.png');
              label = 'Water';
              break;
            case 'MapTab':
              iconSource = require('../assets/map.png');
              label = 'Map';
              break;
            case 'EventsTab':
              iconSource = require('../assets/events.png');
              label = 'Events';
              break;
            default:
              iconSource = require('../assets/Profile.png');
              label = 'Profile';
          }

          // Цвет иконки
          const iconTint = isFocused ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR;

          // Обработчик нажатия
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={onPress}
              activeOpacity={0.8}
            >
              {/* Обёртка вокруг иконки */}
              <View style={[styles.iconWrapper, isFocused && styles.iconWrapperActive]}>
                <Image
                  source={iconSource}
                  style={[styles.tabIcon, { tintColor: iconTint }]}
                />
              </View>
              {/* Метка под иконкой */}
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}const styles = StyleSheet.create({
  // Родительский контейнер всей панели
  tabBar: {
    backgroundColor: CONTAINER_BG,
    alignItems: 'center',
    paddingVertical: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  // «Пилюля» со скруглёнными углами
  tabBarInner: {
    flexDirection: 'row',
    backgroundColor: PILL_BG,
    width: width * 0.999,
    height: 70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  // Каждая кнопка
  tabItem: {
    width: 60,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Обёртка иконки
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Активное состояние обёртки (подсветка)
  iconWrapperActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  // Сами иконки
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  // Метка под иконкой
  tabLabel: {
    marginTop: 2,
    fontSize: 12,
    color: INACTIVE_ICON_COLOR,
  },
  tabLabelActive: {
    color: ACTIVE_ICON_COLOR,
    fontWeight: 'bold',
  },
});