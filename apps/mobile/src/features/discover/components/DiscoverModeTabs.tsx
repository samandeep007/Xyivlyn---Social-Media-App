import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/theme/tokens';

export type DiscoverMode = 'for-you' | 'campus' | 'global' | 'surprise';

type DiscoverModeTabsProps = {
  value: DiscoverMode;
  onChange: (value: DiscoverMode) => void;
};

const items: Array<{
  value: DiscoverMode;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
}> = [
  { value: 'for-you', label: 'For You' },
  { value: 'campus', label: 'Campus', icon: 'school' },
  { value: 'global', label: 'Global', icon: 'globe-outline' },
  { value: 'surprise', label: 'Surprise Me', icon: 'sparkles' },
];

export function DiscoverModeTabs({ value, onChange }: DiscoverModeTabsProps) {
  return (
    <View style={styles.shell}>
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <Pressable
            key={item.value}
            onPress={() => onChange(item.value)}
            style={({ pressed }) => [
              styles.item,
              selected && styles.selected,
              pressed && styles.pressed,
            ]}
          >
            <AppText
              variant="smallMedium"
              numberOfLines={1}
              style={[styles.label, selected && styles.selectedLabel]}
            >
              {item.label}
            </AppText>
            {item.icon ? (
              <Ionicons
                name={item.icon}
                size={14}
                color={selected ? colors.white : colors.textStrong}
              />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 3,
    marginBottom: spacing.xxl,
  },
  item: {
    flex: 1,
    minHeight: 39,
    paddingHorizontal: 6,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  selected: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.textStrong,
    fontSize: 12,
  },
  selectedLabel: {
    color: colors.white,
  },
  pressed: {
    opacity: 0.82,
  },
});
