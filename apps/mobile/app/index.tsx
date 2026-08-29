import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { colors, radius, spacing } from '@/theme/tokens';

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>CHUNK 02</Text>
        </View>

        <Text style={styles.title}>My App is perfectly running.</Text>
        <Text style={styles.body}>
          Expo, TypeScript, routing, and our first shared design tokens are connected.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Foundation only</Text>
          <Text style={styles.cardBody}>
            This is a temporary developer screen. We will replace it with the approved product screens as we build each feature chunk.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
  },
  body: {
    color: colors.textMuted,
    fontSize: 17,
    lineHeight: 26,
  },
  card: {
    marginTop: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  cardBody: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
