import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout } from '@/theme/tokens';

type ScreenProps = PropsWithChildren<{
  padded?: boolean;
  scroll?: boolean;
}>;

export function Screen({ children, padded = true, scroll = false }: ScreenProps) {
  if (scroll) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.scrollContent, padded && styles.padded]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.maxWidth}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={[styles.container, padded && styles.padded]}>
        <View style={[styles.maxWidth, styles.flex]}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padded: {
    paddingHorizontal: layout.screenPadding,
  },
  maxWidth: {
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 28,
  },
});
