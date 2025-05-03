import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <>
    <View style={styles.container}></View>
      <WebView
        source={{ uri: 'https://onmystore.netlify.app/' }}
      />
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "35"
  }
});
