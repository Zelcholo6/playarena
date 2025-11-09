import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_BASE } from './src/config';

export default function App() {
  const [msg, setMsg] = useState('…');

  const testApi = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/dbcheck`, { timeout: 10000 });
      setMsg(JSON.stringify(data));
    } catch (e) {
      setMsg(`ERR: ${e.message}`);
    }
  };

  return (
    <SafeAreaView style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ marginBottom: 16 }}>API: {API_BASE}</Text>
      <TouchableOpacity onPress={testApi}>
        <Text style={{ color:'#2f6bed', fontSize:22 }}>Tester la DB</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 24 }}>{msg}</Text>
    </SafeAreaView>
  );
}

