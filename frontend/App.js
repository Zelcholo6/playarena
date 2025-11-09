import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, FlatList, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createNativeStackNavigator();
const API = 'http://192.168.100.25:3000'; // remplace si ton IP change

function HeaderLogo() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={require('./assets/logo.png')} style={{ width: 34, height: 34, marginRight: 8 }} />
      <Text style={{ color: '#e6f1ff', fontWeight: '700' }}>PlayArena</Text>
    </View>
  );
}

function Splash({ onDone }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(scale,   { toValue: 1, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start(() => {
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.03, duration: 500, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1.00, duration: 500, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]).start(() => setTimeout(onDone, 300));
    });
  }, []);

  return (
    <LinearGradient colors={['#0b132b', '#0d1b3a', '#0b132b']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.Image source={require('./assets/logo.png')}
        style={{ width: 220, height: 220, opacity, transform: [{ scale }] }} />
    </LinearGradient>
  );
}

function HomeScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API}/pitches?city=Riyadh`)
      .then(r => r.json())
      .then(d => setItems(d.items || d || []))
      .catch(() => setItems([]));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{
      marginHorizontal: 16, marginVertical: 10, padding: 14,
      backgroundColor: '#18233a', borderRadius: 14
    }}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: item.photos?.[0] }} style={{ width: 120, height: 80, borderRadius: 10, marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>{item.name}</Text>
          <Text style={{ color: '#a9bdd8' }}>{item.sport} · {item.surface}</Text>
          <Text style={{ color: '#a9bdd8' }}>{item.indoor ? 'Indoor' : 'Outdoor'} · {item.ac ? 'AC' : 'No AC'}</Text>
          <Text style={{ color: '#69c0ff', fontWeight: '700', marginTop: 4 }}>{item.price_per_hour_sar} SAR / h</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#0b132b' }}>
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ListHeaderComponent={<Text style={{ color: 'white', fontSize: 28, fontWeight: '800', margin: 16 }}>Terrains à Riyadh</Text>}
      />
    </View>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  if (!ready) return <Splash onDone={() => setReady(true)} />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0b132b' },
          headerTintColor: '#e6f1ff',
          headerTitle: () => <HeaderLogo />
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

