import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function ConnectionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Connections</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
});
