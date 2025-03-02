import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const EVENTS_DATA = [
  {
    id: 1,
    name: 'Riverbank Cleanup',
    date: 'March 15, 2025',
    address: 'Riverfront Park, City Center',
    description:
      'Organize an event to clean up the riverbanks from litter and plastic with the participation of volunteers and local residents',
    image: require('../assets/photo1.jpeg'),
  },
  {
    id: 2,
    name: 'Tree Planting in the City',
    date: 'April 22, 2025',
    address: 'City Hall Square, Downtown',
    description:
      'A joint event for planting new trees in urban areas to create green spaces and improve air quality',
    image: require('../assets/photo2.jpeg'),
  },
  {
    id: 3,
    name: 'Eco Bike Parade',
    date: 'June 5, 2025',
    address: 'City Hall Square, Downtown',
    description:
      'Organize a bike parade with cyclists of all levels to raise awareness about the use of environmentally friendly modes of transportation',
    image: require('../assets/photo3.jpeg'),
  },
  {
    id: 4,
    name: 'Beach Cleanup Day',
    date: 'July 20, 2025',
    address: 'Sunny Beach, Coastal Area',
    description:
      'Collecting trash on the beach with the participation of volunteers and organizing educational events on the importance of keeping beaches clean',
    image: require('../assets/photo4.jpeg'),
  },
];

export function EventsList() {
  const navigation = useNavigation();
  const [events] = useState(EVENTS_DATA);

  const goToEventDetails = (eventItem) => {
    navigation.navigate('EventDetails', { eventItem });
  };

  return (
    <SafeAreaView style={styles.listContainer}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Events</Text>
        </View>
        {events.map((ev) => (
          <TouchableOpacity
            key={ev.id}
            style={styles.eventCard}
            onPress={() => goToEventDetails(ev)}
          >
            <Image source={ev.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{ev.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export function EventDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventItem } = route.params;

  return (
    <SafeAreaView style={styles.detailsSafeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <TouchableOpacity style={styles.backButtonOutside} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/arrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.imageWrapper}>
          <Image source={eventItem.image} style={styles.detailsImage} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.detailsTitle}>{eventItem.name}</Text>
          <View style={styles.infoRow}>
            <Image source={require('../assets/calendar.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>{eventItem.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../assets/map.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>{eventItem.address}</Text>
          </View>
          <Text style={styles.descriptionText}>{eventItem.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default {
  EventsList,
  EventDetails,
};const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
   
  
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  eventCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    margin: 12,
  },
  detailsSafeArea: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  imageWrapper: {
    width: '100%',
    height: height * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    
  },
  detailsImage: {
    width: 350,
    height: 230,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  backButtonOutside: {
    marginTop: 10,
    marginBottom:10,
    marginLeft: 20,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoIcon: {
    width: 18,
    height: 18,
    tintColor: '#444',
    marginRight: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
  },
  descriptionText: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
});