import { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { AppText, SectionHeader } from '@/components/ui';
import { DiscoverMode, DiscoverModeTabs } from '@/features/discover/components/DiscoverModeTabs';
import { PreferenceTile } from '@/features/discover/components/PreferenceTile';
import { RecentConnectionCard } from '@/features/discover/components/RecentConnectionCard';
import { colors, radius, shadows, spacing } from '@/theme/tokens';

const recentConnections = [
  { initials: 'AM', time: '2h ago', palette: ['#6B58E8', '#C8BFFF'] as const },
  { initials: 'JR', time: '5h ago', palette: ['#E6A06E', '#F5D9C8'] as const },
  { initials: 'SK', time: '1d ago', palette: ['#D9568F', '#F7C7DC'] as const },
  { initials: 'MK', time: '1d ago', palette: ['#566779', '#CAD4DC'] as const },
];

export default function DiscoverScreen() {
  const [mode, setMode] = useState<DiscoverMode>('for-you');
  const router = useRouter();

  return (
    <Screen scroll>
      <View style={styles.header}>
        <LinearGradient colors={['#FF3D8E', '#F82471']} style={styles.brandMark}>
          <Ionicons name="people" size={20} color={colors.white} />
          <Ionicons name="heart" size={16} color={colors.white} style={styles.brandHeart} />
        </LinearGradient>

        <AppText variant="h2" style={styles.headerTitle}>Discover</AppText>

        <Pressable style={({ pressed }) => [styles.premiumPill, pressed && styles.pressed]}>
          <Ionicons name="sparkles" size={14} color={colors.primary} />
          <AppText variant="smallMedium" style={styles.premiumText}>Premium</AppText>
        </Pressable>
      </View>

      <DiscoverModeTabs value={mode} onChange={setMode} />

      <LinearGradient
        colors={['#6540EA', '#7B39E8', '#E13BB5', '#FF478F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroGlowOne} />
        <View style={styles.heroGlowTwo} />
        <View style={styles.starOne} />
        <View style={styles.starTwo} />
        <View style={styles.starThree} />

        <View style={[styles.personBubble, styles.personTopLeft]}>
          <AppText variant="smallMedium" style={styles.personInitials}>AR</AppText>
        </View>
        <View style={[styles.personBubble, styles.personTopRight]}>
          <AppText variant="smallMedium" style={styles.personInitials}>NJ</AppText>
        </View>
        <View style={[styles.personBubble, styles.personBottomLeft]}>
          <AppText variant="smallMedium" style={styles.personInitials}>KS</AppText>
        </View>
        <View style={[styles.personBubble, styles.personBottomRight]}>
          <AppText variant="smallMedium" style={styles.personInitials}>RM</AppText>
        </View>

        <View style={styles.heroLogo}>
          <Ionicons name="people" size={44} color={colors.white} />
          <Ionicons name="heart" size={34} color={colors.white} style={styles.heroHeart} />
        </View>

        <AppText variant="h1" style={styles.heroTitle}>Smart Random</AppText>
        <AppText variant="bodyLg" style={styles.heroSubtitle}>
          Connect with someone new{`\n`}based on shared vibes & interests.
        </AppText>

        <Pressable
          onPress={() => router.push('/smart-random/setup' as Href)}
          style={({ pressed }) => [styles.searchButton, pressed && styles.searchPressed]}
        >
          <AppText variant="button" style={styles.searchButtonText}>Start Searching</AppText>
          <Ionicons name="sparkles" size={19} color={colors.primary} />
        </Pressable>
      </LinearGradient>

      <View style={styles.dailyPassCard}>
        <View style={styles.dailyPassIcon}>
          <Ionicons name="ticket" size={26} color={colors.secondary} />
        </View>
        <View style={styles.dailyPassCopy}>
          <AppText variant="h3">Daily Pass</AppText>
          <AppText variant="small" muted>
            Pick your preferences and get one free match every day.
          </AppText>
        </View>
        <View style={styles.dailyPassActionColumn}>
          <Pressable style={({ pressed }) => [styles.usePassButton, pressed && styles.pressed]}>
            <AppText variant="smallMedium" style={styles.usePassText}>Use Pass</AppText>
          </Pressable>
          <AppText variant="caption" muted>1 free left</AppText>
        </View>
      </View>

      <SectionHeader title="Your Preferences" actionLabel="Edit" />
      <View style={styles.preferenceRow}>
        <PreferenceTile icon="people-outline" label="Looking for" value="Everyone" />
        <PreferenceTile icon="globe-outline" label="Languages" value="English, Hindi" />
        <PreferenceTile icon="sparkles" label="Interests" value="8 selected" accent="pink" />
        <PreferenceTile icon="heart-outline" label="Vibe" value="Chill" accent="pink" />
      </View>

      <Pressable style={({ pressed }) => [styles.safetyCard, pressed && styles.pressed]}>
        <LinearGradient colors={['#7442F3', '#5A2AE4']} style={styles.safetyIcon}>
          <Ionicons name="shield-checkmark-outline" size={24} color={colors.white} />
        </LinearGradient>
        <View style={styles.safetyCopy}>
          <AppText variant="smallMedium" style={styles.safetyTitle}>Your safety matters</AppText>
          <AppText variant="small" muted>
            We use smart moderation and community reviews to keep this space safe for everyone.
          </AppText>
        </View>
        <Ionicons name="chevron-forward" size={22} color={colors.primary} />
      </Pressable>

      <SectionHeader title="Recently Connected" actionLabel="See All" />
      <View style={styles.recentRow}>
        {recentConnections.map((item) => (
          <RecentConnectionCard
            key={`${item.initials}-${item.time}`}
            initials={item.initials}
            time={item.time}
            palette={item.palette}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandMark: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandHeart: {
    position: 'absolute',
    bottom: 6,
  },
  headerTitle: {
    color: colors.textStrong,
  },
  premiumPill: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    backgroundColor: colors.primarySoft,
  },
  premiumText: {
    color: colors.primary,
  },
  pressed: {
    opacity: 0.78,
  },
  hero: {
    minHeight: 400,
    borderRadius: radius.xl,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xxl,
    paddingTop: 96,
    paddingBottom: 28,
    marginBottom: spacing.lg,
    ...shadows.raised,
  },
  heroGlowOne: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(128,81,255,0.28)',
    left: -70,
    top: 42,
  },
  heroGlowTwo: {
    position: 'absolute',
    width: 310,
    height: 310,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,76,165,0.22)',
    right: -100,
    bottom: -55,
  },
  starOne: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
    top: 52,
    left: 105,
  },
  starTwo: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.9)',
    top: 85,
    right: 110,
  },
  starThree: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.85)',
    top: 132,
    left: 148,
  },
  personBubble: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  personInitials: {
    color: colors.primary,
    fontWeight: '800',
  },
  personTopLeft: {
    top: 28,
    left: 45,
  },
  personTopRight: {
    top: 58,
    right: 40,
  },
  personBottomLeft: {
    top: 155,
    left: 24,
  },
  personBottomRight: {
    top: 175,
    right: 22,
  },
  heroLogo: {
    width: 86,
    height: 86,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  heroHeart: {
    position: 'absolute',
    bottom: 7,
  },
  heroTitle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 31,
    lineHeight: 36,
  },
  heroSubtitle: {
    color: colors.white,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.95,
  },
  searchButton: {
    width: '76%',
    minHeight: 54,
    marginTop: 20,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    ...shadows.soft,
  },
  searchPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  searchButtonText: {
    color: colors.primary,
  },
  dailyPassCard: {
    minHeight: 98,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.xxl,
  },
  dailyPassIcon: {
    width: 54,
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: colors.secondarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  dailyPassCopy: {
    flex: 1,
    gap: 2,
    paddingRight: spacing.sm,
  },
  dailyPassActionColumn: {
    alignItems: 'center',
    gap: 4,
  },
  usePassButton: {
    minWidth: 84,
    minHeight: 39,
    borderRadius: radius.md,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  usePassText: {
    color: colors.white,
  },
  preferenceRow: {
    flexDirection: 'row',
    gap: 7,
    marginTop: spacing.md,
    marginBottom: spacing.xxl,
  },
  safetyCard: {
    minHeight: 91,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceLavender,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.xxl,
  },
  safetyIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  safetyCopy: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  safetyTitle: {
    color: '#4321A7',
    marginBottom: 2,
  },
  recentRow: {
    flexDirection: 'row',
    gap: 9,
    marginTop: spacing.md,
    paddingBottom: spacing.sm,
  },
});
