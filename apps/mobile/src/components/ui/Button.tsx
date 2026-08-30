import type { ComponentProps, ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { AppText } from './AppText';
import { colors, gradients, radius, spacing } from '@/theme/tokens';

type PressableProps = ComponentProps<typeof Pressable>;
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';

type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: Variant;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  fullWidth = true,
  style,
  ...props
}: ButtonProps) {
  const content = (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.white} />
      ) : (
        <>
          {leftIcon}
          <AppText
            variant="button"
            style={variant === 'outline' || variant === 'ghost' ? styles.darkLabel : styles.lightLabel}
          >
            {label}
          </AppText>
          {rightIcon}
        </>
      )}
    </View>
  );

  if (variant === 'gradient') {
    return (
      <Pressable
        {...props}
        disabled={disabled || loading}
        style={(state) => [
          fullWidth && styles.fullWidth,
          (disabled || loading) && styles.disabled,
          state.pressed && styles.pressed,
          typeof style === 'function' ? style(state) : style,
        ]}
      >
        <LinearGradient
          colors={[...gradients.brand]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.base}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      style={(state) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        state.pressed && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    minHeight: 52,
    paddingHorizontal: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  gradient: {},
  lightLabel: {
    color: colors.textOnPrimary,
  },
  darkLabel: {
    color: colors.primary,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
