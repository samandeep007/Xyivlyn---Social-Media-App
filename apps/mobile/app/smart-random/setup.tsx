import { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui';
import { colors, radius, shadows, spacing } from '@/theme/tokens';

type Gender = 'All genders' | 'Women' | 'Men';
type MatchMode = 'Strict' | 'Flexible';

type PreferenceRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  value: string;
  accent?: 'purple' | 'pink';
};

function PreferenceRow({ icon, title, subtitle, value, accent = 'purple' }: PreferenceRowProps) {
  const accentColor = accent === 'pink' ? colors.secondary : colors.primary;
  return (
    <Pressable style={({ pressed }) => [styles.preferenceCard, pressed && styles.pressed]}>
      <View style={[styles.preferenceIcon, accent === 'pink' && styles.preferenceIconPink]}>
        <Ionicons name={icon} size={24} color={accentColor} />
      </View>
      <View style={styles.preferenceCopy}>
        <AppText variant="bodyMedium">{title}</AppText>
        <AppText variant="small" muted>{subtitle}</AppText>
      </View>
      <AppText variant="bodyMedium" style={{ color: accentColor }}>{value}</AppText>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </Pressable>
  );
}

export default function SmartRandomSetupScreen() {
  const router = useRouter();
  const [gender, setGender] = useState<Gender>('All genders');
  const [matchMode, setMatchMode] = useState<MatchMode>('Strict');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={26} color={colors.textStrong} />
          </Pressable>
          <AppText variant="h2" style={styles.topTitle}>Smart Random Setup</AppText>
          <Pressable style={styles.premiumPill}>
            <Ionicons name="sparkles" size={15} color={colors.primary} />
            <AppText variant="smallMedium" style={styles.premiumText}>Premium</AppText>
          </Pressable>
        </View>

        <View style={styles.intro}>
          <View style={styles.introCopy}>
            <AppText variant="display">Tell us what you’re</AppText>
            <LinearGradient colors={['#6C32F4', '#C43BE9', '#FF2D78']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientTitleWrap}>
              <AppText variant="display" style={styles.gradientTitle}>looking for ✦</AppText>
            </LinearGradient>
            <AppText variant="bodyLg" muted style={styles.introSubtitle}>The more you set, the better we match.</AppText>
          </View>
          <View style={styles.orbitGraphic}>
            <View style={styles.orbitOuter} />
            <View style={styles.orbitMiddle} />
            <LinearGradient colors={['#6C32F4', '#D83CDC', '#FF2D78']} style={styles.orbitCenter}>
              <Ionicons name="people" size={30} color={colors.white} />
              <Ionicons name="heart" size={23} color={colors.white} style={styles.orbitHeart} />
            </LinearGradient>
            <View style={[styles.miniAvatar, styles.avatarOne]}><AppText variant="caption" style={styles.avatarText}>A</AppText></View>
            <View style={[styles.miniAvatar, styles.avatarTwo]}><AppText variant="caption" style={styles.avatarText}>J</AppText></View>
          </View>
        </View>

        <View style={styles.preferenceList}>
          <PreferenceRow icon="people-outline" title="Who can you meet?" subtitle="Choose who you’re open to meeting." value="Everyone" />
          <PreferenceRow icon="globe-outline" title="Languages" subtitle="Select languages you speak." value="English, Hindi" />
          <PreferenceRow icon="sparkles" title="Interests" subtitle="Pick your top interests." value="8 selected" />
          <PreferenceRow icon="heart-outline" title="What are you here for?" subtitle="Your intent helps us find better matches." value="Friendship" accent="pink" />
          <PreferenceRow icon="happy-outline" title="Your vibe" subtitle="How would you describe your vibe?" value="Chill" />
          <PreferenceRow icon="location-outline" title="Region" subtitle="Where would you like to meet people from?" value="Global" />
        </View>

        <View style={styles.largeCard}>
          <View style={styles.largeCardHeader}>
            <View style={styles.preferenceIcon}><Ionicons name="calendar-outline" size={24} color={colors.primary} /></View>
            <View style={styles.preferenceCopy}>
              <AppText variant="bodyMedium">Age Range</AppText>
              <AppText variant="small" muted>Set your preferred age range.</AppText>
            </View>
            <AppText variant="bodyMedium" style={styles.purpleText}>18 – 28</AppText>
          </View>
          <View style={styles.rangeLabels}><AppText variant="small" muted>18</AppText><AppText variant="small" muted>28</AppText></View>
          <View style={styles.rangeTrack}>
            <View style={styles.rangeActive} />
            <View style={[styles.rangeKnob, { left: '20%' }]} />
            <View style={[styles.rangeKnob, { left: '72%' }]} />
          </View>
        </View>

        <View style={styles.largeCard}>
          <View style={styles.largeCardHeader}>
            <View style={styles.preferenceIcon}><Ionicons name="male-female-outline" size={24} color={colors.primary} /></View>
            <View style={styles.preferenceCopy}>
              <AppText variant="bodyMedium">Show me</AppText>
              <AppText variant="small" muted>Select genders you want to see.</AppText>
            </View>
            <AppText variant="bodyMedium" style={styles.purpleText}>{gender}</AppText>
          </View>
          <View style={styles.segmented}>
            {(['All genders', 'Women', 'Men'] as const).map((option) => (
              <Pressable key={option} onPress={() => setGender(option)} style={[styles.segment, gender === option && styles.segmentActive]}>
                <AppText variant="smallMedium" style={gender === option && styles.segmentTextActive}>{option}</AppText>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.largeCard}>
          <View style={styles.largeCardHeader}>
            <View style={styles.preferenceIcon}><Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} /></View>
            <View style={styles.preferenceCopy}>
              <AppText variant="bodyMedium">Matching Mode</AppText>
              <AppText variant="small" muted>{matchMode === 'Strict' ? 'Strict matches follow all preferences.' : 'Flexible can widen your preferences.'}</AppText>
            </View>
            <AppText variant="bodyMedium" style={styles.purpleText}>{matchMode}</AppText>
          </View>
          <View style={styles.segmented}>
            {(['Strict', 'Flexible'] as const).map((option) => (
              <Pressable key={option} onPress={() => setMatchMode(option)} style={[styles.segment, matchMode === option && styles.segmentActive]}>
                <View style={styles.inline}><AppText variant="smallMedium" style={matchMode === option && styles.segmentTextActive}>{option}</AppText>{option === 'Strict' && <Ionicons name="sparkles" size={14} color={colors.primary} />}</View>
              </Pressable>
            ))}
          </View>
          <View style={styles.modeHint}>
            <AppText variant="small" muted>✦ Strict: Only people who fit all your preferences.</AppText>
            <AppText variant="small" muted>✦ Flexible: May show more people outside your preferences.</AppText>
          </View>
        </View>

        <LinearGradient colors={['#F5F0FF', '#FFF0F6']} style={styles.upgradeCard}>
          <LinearGradient colors={['#6C32F4', '#C83BE9']} style={styles.upgradeIcon}><Ionicons name="sparkles" size={22} color={colors.white} /></LinearGradient>
          <View style={styles.preferenceCopy}>
            <AppText variant="bodyMedium">Go <AppText variant="bodyMedium" style={styles.purpleText}>Premium</AppText> to unlock more controls</AppText>
            <AppText variant="small" muted>Advanced filters, location radius, verified only & more.</AppText>
          </View>
          <Pressable style={styles.upgradeButton}><AppText variant="smallMedium" style={styles.whiteText}>Upgrade</AppText></Pressable>
        </LinearGradient>

        <Pressable onPress={() => router.push('/smart-random/searching' as Href)}>
          {({ pressed }) => (
            <LinearGradient colors={['#6C32F4', '#B936E5', '#FF2D78']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.startButton, pressed && styles.pressed]}>
              <View style={styles.inline}><Ionicons name="sparkles" size={20} color={colors.white} /><AppText variant="h3" style={styles.whiteText}>Start Searching</AppText></View>
              <AppText variant="small" style={styles.startSubtitle}>We’ll find someone awesome for you!</AppText>
            </LinearGradient>
          )}
        </Pressable>
        <View style={styles.privacyLine}><Ionicons name="lock-closed" size={14} color={colors.textMuted} /><AppText variant="small" muted>Your preferences are private and never shared.</AppText></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl, maxWidth: 620, width: '100%', alignSelf: 'center' },
  topBar: { minHeight: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topTitle: { fontSize: 20 },
  iconButton: { width: 44, height: 44, justifyContent: 'center' },
  premiumPill: { minHeight: 36, borderRadius: radius.pill, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.primarySoft },
  premiumText: { color: colors.primary },
  intro: { minHeight: 220, flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  introCopy: { flex: 1, zIndex: 2 },
  gradientTitleWrap: { alignSelf: 'flex-start', borderRadius: 4 },
  gradientTitle: { color: colors.white, paddingHorizontal: 1 },
  introSubtitle: { marginTop: spacing.md },
  orbitGraphic: { width: 180, height: 180, alignItems: 'center', justifyContent: 'center', marginRight: -28 },
  orbitOuter: { position: 'absolute', width: 170, height: 170, borderRadius: 85, backgroundColor: 'rgba(108,50,244,0.07)' },
  orbitMiddle: { position: 'absolute', width: 125, height: 125, borderRadius: 63, backgroundColor: 'rgba(183,57,229,0.11)' },
  orbitCenter: { width: 78, height: 78, borderRadius: 39, alignItems: 'center', justifyContent: 'center' },
  orbitHeart: { position: 'absolute', bottom: 18 },
  miniAvatar: { position: 'absolute', width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surface, borderWidth: 3, borderColor: colors.white, alignItems: 'center', justifyContent: 'center', ...shadows.soft },
  avatarOne: { top: 4, left: 20 }, avatarTwo: { right: 0, bottom: 20 }, avatarText: { color: colors.primary, fontWeight: '800' },
  preferenceList: { gap: spacing.sm },
  preferenceCard: { minHeight: 86, paddingHorizontal: spacing.lg, borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  preferenceIcon: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  preferenceIconPink: { backgroundColor: colors.secondarySoft },
  preferenceCopy: { flex: 1, gap: 2 },
  largeCard: { marginTop: spacing.sm, padding: spacing.lg, borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  largeCardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  purpleText: { color: colors.primary },
  rangeLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md, paddingHorizontal: 5 },
  rangeTrack: { height: 24, justifyContent: 'center', marginHorizontal: spacing.sm },
  rangeActive: { position: 'absolute', left: '22%', right: '24%', height: 4, borderRadius: 2, backgroundColor: colors.secondary },
  rangeKnob: { position: 'absolute', width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primary, marginLeft: -12, borderWidth: 3, borderColor: colors.white, ...shadows.soft },
  segmented: { marginTop: spacing.md, minHeight: 48, flexDirection: 'row', borderRadius: radius.md, borderWidth: 1, borderColor: colors.borderStrong, overflow: 'hidden' },
  segment: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.sm },
  segmentActive: { backgroundColor: colors.primarySoft },
  segmentTextActive: { color: colors.primary },
  inline: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  modeHint: { marginTop: spacing.md, backgroundColor: colors.surfaceSoft, borderRadius: radius.md, padding: spacing.md, gap: 4 },
  upgradeCard: { marginTop: spacing.sm, padding: spacing.md, borderRadius: radius.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderWidth: 1, borderColor: colors.border },
  upgradeIcon: { width: 46, height: 46, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  upgradeButton: { minHeight: 42, paddingHorizontal: spacing.lg, justifyContent: 'center', borderRadius: radius.md, backgroundColor: colors.primary },
  whiteText: { color: colors.white },
  startButton: { minHeight: 96, marginTop: spacing.lg, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', gap: 6, ...shadows.raised },
  startSubtitle: { color: 'rgba(255,255,255,0.88)' },
  privacyLine: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  pressed: { opacity: 0.78 },
});
