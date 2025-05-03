//import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <>
      <WebView
        source={{ uri: 'https://onmystore.netlify.app/' }}
      />
      </>
  );
}

/*
<View style={styles.container}></View>
const styles = StyleSheet.create({
  container: {
    height: "0"
  }
});
*/
