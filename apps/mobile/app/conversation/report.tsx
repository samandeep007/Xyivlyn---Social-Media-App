import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui';
import { colors, radius, shadows, spacing } from '@/theme/tokens';

const reasons = ['Harassment or bullying', 'Sexual or inappropriate content', 'Spam or scam', 'Hate or discrimination', 'Something else'];

export default function ConversationReportScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={26} color={colors.textStrong} /></Pressable>
          <AppText variant="h1">Report Arjun</AppText>
          <View style={styles.spacer} />
        </View>
        <View style={styles.hero}>
          <View style={styles.shield}><Ionicons name="shield-checkmark" size={36} color={colors.primary} /></View>
          <AppText variant="h2">What happened?</AppText>
          <AppText variant="body" muted style={styles.center}>Choose the reason that best describes the problem. Reports are reviewed by our safety systems.</AppText>
        </View>
        <View style={styles.card}>
          {reasons.map((reason) => (
            <Pressable key={reason} style={styles.reason} onPress={() => router.back()}>
              <AppText variant="bodyLg">{reason}</AppText>
              <Ionicons name="chevron-forward" size={21} color={colors.textSoft} />
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.blockButton} onPress={() => router.back()}>
          <Ionicons name="ban-outline" size={21} color={colors.danger} />
          <AppText variant="bodyMedium" style={styles.danger}>Block this person</AppText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background }, content: { flex: 1, padding: spacing.xl, maxWidth: 620, width: '100%', alignSelf: 'center' },
  header: { minHeight: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, back: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', ...shadows.soft }, spacer: { width: 48 },
  hero: { alignItems: 'center', gap: spacing.md, marginTop: spacing.xl, marginBottom: spacing.xxl }, shield: { width: 72, height: 72, borderRadius: 24, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, center: { textAlign: 'center', maxWidth: 420 },
  card: { borderRadius: radius.xl, backgroundColor: colors.surface, overflow: 'hidden', ...shadows.soft }, reason: { minHeight: 64, paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.divider },
  blockButton: { minHeight: 58, marginTop: spacing.lg, borderRadius: radius.lg, backgroundColor: colors.dangerSoft, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm }, danger: { color: colors.danger },
});
