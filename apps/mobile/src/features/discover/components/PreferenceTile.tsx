import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/theme/tokens';

type PreferenceTileProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  accent?: 'purple' | 'pink';
};

export function PreferenceTile({ icon, label, value, accent = 'purple' }: PreferenceTileProps) {
  const iconColor = accent === 'pink' ? colors.secondary : colors.primary;

  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={25} color={iconColor} />
      <AppText variant="caption" muted numberOfLines={1} style={styles.label}>
        {label}
      </AppText>
      <AppText variant="smallMedium" numberOfLines={2} style={styles.value}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    minHeight: 110,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: 9,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  label: {
    textAlign: 'center',
  },
  value: {
    color: colors.textStrong,
    textAlign: 'center',
    lineHeight: 17,
  },
});
