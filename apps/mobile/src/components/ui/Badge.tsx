import { StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { colors, radius } from '@/theme/tokens';

type BadgeProps = {
  value: string | number;
};

export function Badge({ value }: BadgeProps) {
  return (
    <View style={styles.badge}>
      <AppText variant="caption" style={styles.text}>{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: '800',
  },
});
