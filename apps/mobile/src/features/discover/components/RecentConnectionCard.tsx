import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { AppText } from '@/components/ui';
import { colors, radius } from '@/theme/tokens';

type RecentConnectionCardProps = {
  initials: string;
  time: string;
  palette: readonly [string, string];
};

export function RecentConnectionCard({ initials, time, palette }: RecentConnectionCardProps) {
  return (
    <LinearGradient colors={[...palette]} style={styles.card}>
      <View style={styles.avatar}>
        <AppText variant="smallMedium" style={styles.initials}>{initials}</AppText>
      </View>
      <View style={styles.timePill}>
        <View style={styles.onlineDot} />
        <AppText variant="caption" style={styles.time}>{time}</AppText>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    aspectRatio: 0.78,
    borderRadius: radius.md,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.primary,
    fontWeight: '800',
  },
  timePill: {
    position: 'absolute',
    bottom: 7,
    left: 7,
    right: 7,
    minHeight: 23,
    borderRadius: radius.pill,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(18,17,24,0.74)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.success,
  },
  time: {
    color: colors.white,
    fontSize: 10,
  },
});
