import type { ComponentProps } from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors, typography } from '@/theme/tokens';

type TextProps = ComponentProps<typeof Text>;
type Variant = keyof typeof typography;

type AppTextProps = TextProps & {
  variant?: Variant;
  muted?: boolean;
};

export function AppText({
  variant = 'body',
  muted = false,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        typography[variant],
        muted && styles.muted,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  muted: {
    color: colors.textMuted,
  },
});
