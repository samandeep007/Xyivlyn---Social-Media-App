import type { ComponentProps } from 'react';
import { View, StyleSheet } from 'react-native';

import { colors, radius, shadows, spacing } from '@/theme/tokens';

type ViewProps = ComponentProps<typeof View>;
type Variant = 'default' | 'soft' | 'lavender';

type CardProps = ViewProps & {
  variant?: Variant;
  elevated?: boolean;
};

export function Card({ variant = 'default', elevated = false, style, ...props }: CardProps) {
  return (
    <View
      {...props}
      style={[
        styles.base,
        styles[variant],
        elevated && shadows.soft,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  default: {
    backgroundColor: colors.surface,
  },
  soft: {
    backgroundColor: colors.surfaceSoft,
  },
  lavender: {
    backgroundColor: colors.surfaceLavender,
  },
});
