import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getHealth } from '@/api/client';

type Status = 'loading' | 'connected' | 'error';

export default function DiscoverScreen() {
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');

  async function checkBackend() {
    try {
      setStatus('loading');

      const response = await getHealth();

      setMessage(response.message);
      setStatus('connected');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unknown error');
      setStatus('error');
    }
  }

  useEffect(() => {
    void checkBackend();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>DISCOVER</Text>

        <Text style={styles.title}>
          Random Social Discovery
        </Text>

        <View style={styles.card}>
          {status === 'loading' && (
            <>
              <ActivityIndicator size="large" />
              <Text style={styles.statusText}>
                Checking backend...
              </Text>
            </>
          )}

          {status === 'connected' && (
            <>
              <Text style={styles.success}>
                ✓ Backend connected
              </Text>

              <Text style={styles.message}>
                {message}
              </Text>
            </>
          )}

          {status === 'error' && (
            <>
              <Text style={styles.error}>
                Backend connection failed
              </Text>

              <Text style={styles.message}>
                {message}
              </Text>

              <Pressable
                style={styles.button}
                onPress={() => void checkBackend()}
              >
                <Text style={styles.buttonText}>
                  Retry
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FAF8FF',
  },

  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  eyebrow: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 10,
  },

  title: {
    color: '#17131F',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 28,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9E5F0',
  },

  statusText: {
    marginTop: 16,
    color: '#746F7D',
    fontSize: 16,
  },

  success: {
    color: '#16A34A',
    fontSize: 20,
    fontWeight: '700',
  },

  error: {
    color: '#DC2626',
    fontSize: 18,
    fontWeight: '700',
  },

  message: {
    marginTop: 10,
    color: '#746F7D',
    fontSize: 14,
    textAlign: 'center',
  },

  button: {
    marginTop: 20,
    backgroundColor: '#7C3AED',
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
