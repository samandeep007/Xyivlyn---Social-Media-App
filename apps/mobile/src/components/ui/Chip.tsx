import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { colors, radius, spacing } from '@/theme/tokens';

type ChipProps = {
  label: string;
  selected?: boolean;
  icon?: ReactNode;
  onPress?: () => void;
};

export function Chip({ label, selected = false, icon, onPress }: ChipProps) {
  return (
    <Pressable onPress={onPress} style={[styles.base, selected && styles.selected]}>
      <View style={styles.content}>
        {icon}
        <AppText variant="smallMedium" style={selected && styles.selectedLabel}>
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 40,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  selectedLabel: {
    color: colors.white,
  },
});
