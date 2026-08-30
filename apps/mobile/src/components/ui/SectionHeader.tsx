import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { colors } from '@/theme/tokens';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <AppText variant="h3">{title}</AppText>
      {actionLabel ? (
        <Pressable onPress={onActionPress} hitSlop={10}>
          <AppText variant="smallMedium" style={styles.action}>{actionLabel}</AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  action: {
    color: colors.primary,
  },
});
