import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyAK4Tn8HNnIbrdfh5e1uR5JECM3T4J99N0",
  authDomain: "finalproj-fridge.firebaseapp.com",
  databaseURL: "https://finalproj-fridge.firebaseio.com",
  projectId: "finalproj-fridge",
  storageBucket: "finalproj-fridge.appspot.com",
  messagingSenderId: "601009921612",
  appId: "1:601009921612:web:fc4ecc77b48d4cd6409ee9"
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
