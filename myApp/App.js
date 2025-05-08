//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import {WebView} from 'react-native-webview';

export default function App() {
  return (
    <>
    <View style={styles.container}></View>
    <WebView
      style={styles.container}
      source={{ uri: 'https://myonstore.netlify.app/' }}
    />
    <View style={styles.container}></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "35"
  },
});
