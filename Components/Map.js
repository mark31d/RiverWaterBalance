import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  Share,
  SafeAreaView
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  const springs = [
    {
      name: 'Harrison Hot Springs',
      city: 'British Columbia, Canada',
      coordinate: { latitude: 49.3, longitude: -121.786 },
      image: require('../assets/ph1.jpeg'),
    },
    {
      name: 'Halcyon Hot Springs',
      city: 'British Columbia, Canada',
      coordinate: { latitude: 50.4233, longitude: -117.9286 },
      image: require('../assets/ph2.jpeg'),
    },
    {
      name: 'Ainsworth Hot Springs',
      city: 'British Columbia, Canada',
      coordinate: { latitude: 49.7337, longitude: -116.9058 },
      image: require('../assets/ph3.jpeg'),
    },
    {
      name: 'Lussier Hot Springs',
      city: 'British Columbia, Canada',
      coordinate: { latitude: 49.9662, longitude: -115.6132 },
      image: require('../assets/ph4.jpeg'),
    },
    {
      name: 'Liard River Hot Springs',
      city: 'British Columbia, Canada',
      coordinate: { latitude: 59.4242, longitude: -126.1042 },
      image: require('../assets/ph5.jpeg'),
    },
  ];

  const [selectedSpring, setSelectedSpring] = useState(null);
  const [region, setRegion] = useState({
    latitude: 50.0,
    longitude: -121.0,
    latitudeDelta: 8,
    longitudeDelta: 8,
  });

  const handleDirections = (spring) => {
    const { latitude, longitude } = spring.coordinate;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleDownloadImage = (image) => {
    Alert.alert('Download', 'Downloading image...');
  };

  const handleMore = (spring) => {
    const message = `${spring.name}\n${spring.city}\nCoordinates: ${spring.coordinate.latitude}, ${spring.coordinate.longitude}`;
    Share.share({ message });
  };

  const handleCloseCard = () => {
    setSelectedSpring(null);
  };

  const handleZoomIn = () => {
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 0.8,
      longitudeDelta: prev.longitudeDelta * 0.8,
    }));
  };

  const handleZoomOut = () => {
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 0.8,
      longitudeDelta: prev.longitudeDelta / 0.8,
    }));
  };  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Map</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={region} onRegionChange={setRegion}>
          {springs.map((spring, index) => (
            <Marker
              key={index}
              coordinate={spring.coordinate}
              onPress={() => setSelectedSpring(spring)}
            >
              <View style={styles.customMarker}>
                <Image
                  source={require('../assets/water.png')}
                  style={styles.markerImage}
                />
              </View>
            </Marker>
          ))}
        </MapView>
        <View style={styles.zoomContainer}>
          <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
            <Text style={styles.zoomText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
            <Text style={styles.zoomText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedSpring && (
        <View style={styles.bottomCard}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseCard}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.bottomTitle}>{selectedSpring.name}</Text>
          <Text style={styles.bottomSubtitle}>City: {selectedSpring.city}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDirections(selectedSpring)}
            >
              <Text style={styles.actionButtonText}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDownloadImage(selectedSpring.image)}
            >
              <Text style={styles.actionButtonText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleMore(selectedSpring)}
            >
              <Text style={styles.actionButtonText}>More</Text>
            </TouchableOpacity>
          </View>
          <Image source={selectedSpring.image} style={styles.bottomImage} />
        </View>
      )}
    </SafeAreaView>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    marginBottom: -20,
    elevation: 3,
  },
  headerText: {
    marginTop: -25,
    fontSize: 25,
    fontWeight: 'bold',
  },
  mapContainer: {
    margin: 10,
    borderWidth: 2,
    borderColor: '#B09157',
    borderRadius: 15,
    overflow: 'hidden',
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  customMarker: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerImage: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  zoomContainer: {
    position: 'absolute',
    flexDirection: 'column',
    right: 15,
    bottom: 30,
  },
  zoomButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  zoomText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 16,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 16,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  bottomTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#B09157',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomImage: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    marginTop: 5,
  },
});