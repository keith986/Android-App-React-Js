import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <>
    <View style={styles.container}></View>
      <WebView
        source={{ uri: 'https://myonstore.netlify.app/' }}
      />
    <View style={styles.container}></View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "35"
  }
});

