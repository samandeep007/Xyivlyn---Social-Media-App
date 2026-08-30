import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { getHealth } from '@/api/client';
import { Screen } from '@/components/Screen';
import { AppText, Button, Card, Chip, SectionHeader } from '@/components/ui';
import { colors, radius, spacing } from '@/theme/tokens';

type ApiStatus = 'checking' | 'connected' | 'error';

export default function DiscoverScreen() {
  const [status, setStatus] = useState<ApiStatus>('checking');

  async function checkBackend() {
    try {
      setStatus('checking');
      await getHealth();
      setStatus('connected');
    } catch {
      setStatus('error');
    }
  }

  useEffect(() => {
    void checkBackend();
  }, []);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <View style={styles.brandMark}>
          <Ionicons name="heart" size={22} color={colors.white} />
        </View>
        <AppText variant="h2">Discover</AppText>
        <View style={styles.premiumPill}>
          <Ionicons name="diamond" size={13} color={colors.primary} />
          <AppText variant="smallMedium" style={styles.premiumText}>Premium</AppText>
        </View>
      </View>

      <View style={styles.tabs}>
        <Chip label="For You" selected />
        <Chip label="Campus" />
        <Chip label="Global" />
        <Chip label="Surprise Me" />
      </View>

      <Card variant="soft" style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <Ionicons name="sparkles" size={30} color={colors.white} />
        </View>
        <AppText variant="h1" style={styles.centerText}>Smart Random</AppText>
        <AppText muted style={styles.centerText}>
          Connect with someone new based on shared vibes and interests.
        </AppText>
        <Button label="Start Searching" variant="gradient" />
      </Card>

      <Card style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View style={[
            styles.statusDot,
            status === 'connected' && styles.statusConnected,
            status === 'error' && styles.statusError,
          ]} />
          <View style={styles.statusCopy}>
            <AppText variant="smallMedium">
              {status === 'checking' && 'Checking backend'}
              {status === 'connected' && 'Backend connected'}
              {status === 'error' && 'Backend unavailable'}
            </AppText>
            <AppText variant="caption" muted>
              Development status only — this disappears when real Discover ships.
            </AppText>
          </View>
          {status === 'error' ? (
            <Button label="Retry" variant="ghost" fullWidth={false} onPress={() => void checkBackend()} />
          ) : null}
        </View>
      </Card>

      <SectionHeader title="Your Preferences" actionLabel="Edit" />

      <View style={styles.preferenceRow}>
        {[
          ['people-outline', 'Looking for', 'Everyone'],
          ['globe-outline', 'Languages', 'English, Hindi'],
          ['sparkles-outline', 'Interests', '8 selected'],
          ['heart-outline', 'Vibe', 'Chill'],
        ].map(([icon, label, value]) => (
          <Card key={label} style={styles.preferenceCard}>
            <Ionicons name={icon as never} size={23} color={colors.primary} />
            <AppText variant="caption" muted>{label}</AppText>
            <AppText variant="smallMedium">{value}</AppText>
          </Card>
        ))}
      </View>

      <Card variant="lavender" style={styles.safetyCard}>
        <View style={styles.safetyIcon}>
          <Ionicons name="shield-checkmark-outline" size={22} color={colors.white} />
        </View>
        <View style={styles.safetyCopy}>
          <AppText variant="smallMedium" style={styles.primaryText}>Your safety matters</AppText>
          <AppText variant="small" muted>
            Smart moderation and community reviews help keep this space respectful.
          </AppText>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandMark: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.primarySoft,
  },
  premiumText: {
    color: colors.primary,
  },
  tabs: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: spacing.xxl,
  },
  heroCard: {
    gap: spacing.lg,
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    marginBottom: spacing.lg,
    borderColor: colors.primarySoft,
  },
  heroIcon: {
    width: 70,
    height: 70,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  statusCard: {
    marginBottom: spacing.xxl,
    paddingVertical: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.warning,
  },
  statusConnected: {
    backgroundColor: colors.success,
  },
  statusError: {
    backgroundColor: colors.danger,
  },
  statusCopy: {
    flex: 1,
  },
  preferenceRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.md,
    marginBottom: spacing.xxl,
  },
  preferenceCard: {
    flex: 1,
    minWidth: 0,
    padding: 10,
    gap: 5,
  },
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  safetyIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyCopy: {
    flex: 1,
  },
  primaryText: {
    color: colors.primary,
  },
});
