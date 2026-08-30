import { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/theme/tokens';

const preferenceItems = [
  ['people-outline', 'Everyone', 'All genders'],
  ['calendar-outline', '18 – 28', 'Age range'],
  ['location-outline', 'Global', 'Region'],
  ['globe-outline', 'English, Hindi', 'Languages'],
  ['sparkles', '8 interests', 'Selected'],
  ['heart-outline', 'Friendship', 'Intent'],
  ['happy-outline', 'Chill', 'Vibe'],
  ['shield-checkmark-outline', 'Strict', 'Matching'],
] as const;

export default function SmartRandomSearchingScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const navigated = useRef(false);

  useEffect(() => {
    const tick = setInterval(() => setSeconds((value) => value + 1), 1000);
    const demoMatch = setTimeout(() => {
      if (!navigated.current) {
        navigated.current = true;
        router.replace('/smart-random/match-found' as Href);
      }
    }, 6500);
    return () => { clearInterval(tick); clearTimeout(demoMatch); };
  }, [router]);

  const timer = `00:${String(seconds).padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#06102D', '#0A0F2D', '#071B3B']} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.iconButton}><Ionicons name="arrow-back" size={28} color={colors.white} /></Pressable>
          <View style={styles.titleBlock}><AppText variant="h2" style={styles.white}>Smart Random</AppText><View style={styles.inline}><Ionicons name="shield-checkmark-outline" size={16} color="#A78BFA" /><AppText variant="small" style={styles.dim}>Safety is our priority</AppText></View></View>
          <Pressable style={styles.safetyPill}><Ionicons name="shield-checkmark-outline" size={19} color="#A78BFA" /><AppText variant="bodyMedium" style={styles.white}>Safety</AppText></Pressable>
        </View>

        <AppText variant="display" style={styles.searchTitle}>Finding someone awesome{`\n`}for <AppText variant="display" style={styles.pink}>you...</AppText></AppText>

        <View style={styles.radar}>
          <View style={[styles.ring, styles.ringOuter]} /><View style={[styles.ring, styles.ringMid]} /><View style={[styles.ring, styles.ringInner]} />
          <LinearGradient colors={['#6C32F4', '#CF3CDC', '#FF2D78']} style={styles.radarCenter}><Ionicons name="people" size={46} color={colors.white} /><Ionicons name="heart" size={34} color={colors.white} style={styles.radarHeart} /></LinearGradient>
          <View style={[styles.searchAvatar, styles.avatarA]}><AppText variant="smallMedium" style={styles.avatarLabel}>AK</AppText></View>
          <View style={[styles.searchAvatar, styles.avatarB]}><AppText variant="smallMedium" style={styles.avatarLabel}>NM</AppText></View>
          <View style={[styles.searchAvatar, styles.avatarC]}><AppText variant="smallMedium" style={styles.avatarLabel}>PS</AppText></View>
          <View style={[styles.searchAvatar, styles.avatarD]}><AppText variant="smallMedium" style={styles.avatarLabel}>RJ</AppText></View>
          <View style={styles.dotA} /><View style={styles.dotB} /><View style={styles.dotC} />
        </View>

        <AppText variant="bodyLg" style={styles.dimCenter}>This usually takes 10–30 seconds{`\n`}You’ll be connected automatically.</AppText>
        <AppText variant="display" style={styles.timer}>{timer}</AppText>

        <View style={styles.panel}>
          <View style={styles.panelHeader}><AppText variant="h3" style={styles.white}>Your preferences</AppText><Pressable onPress={() => router.replace('/smart-random/setup' as Href)} style={styles.inline}><AppText variant="bodyMedium" style={styles.purple}>Edit</AppText><Ionicons name="chevron-forward" size={18} color="#A78BFA" /></Pressable></View>
          <View style={styles.grid}>
            {preferenceItems.map(([icon, value, label]) => (
              <View key={`${value}-${label}`} style={styles.gridItem}>
                <View style={styles.gridIcon}><Ionicons name={icon} size={22} color="#B184FF" /></View>
                <View><AppText variant="smallMedium" style={styles.white}>{value}</AppText><AppText variant="caption" style={styles.dim}>{label}</AppText></View>
              </View>
            ))}
          </View>
        </View>

        <LinearGradient colors={['rgba(102,53,244,0.22)', 'rgba(255,45,120,0.12)']} style={styles.moderationCard}>
          <View style={styles.safetyGlow}><Ionicons name="shield-checkmark" size={25} color={colors.white} /></View>
          <AppText variant="body" style={[styles.white, styles.moderationCopy]}>We use smart moderation and AI to keep this space safe and respectful for everyone.</AppText>
          <Pressable style={styles.inline}><AppText variant="smallMedium" style={styles.purple}>Learn how it works</AppText><Ionicons name="chevron-forward" size={18} color="#A78BFA" /></Pressable>
        </LinearGradient>

        <Pressable onPress={() => router.replace('/smart-random/setup' as Href)} style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}><AppText variant="button" style={styles.pink}>Cancel Search</AppText></Pressable>
        <View style={styles.footer}><Ionicons name="lock-closed-outline" size={16} color="#9DA5BE" /><AppText variant="small" style={styles.dim}>Your data is encrypted and never shared.</AppText></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#06102D' }, content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl, maxWidth: 620, width: '100%', alignSelf: 'center' },
  topBar: { minHeight: 76, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, iconButton: { width: 44, height: 44, justifyContent: 'center' },
  titleBlock: { alignItems: 'center', gap: 3 }, inline: { flexDirection: 'row', alignItems: 'center', gap: 6 }, white: { color: colors.white }, dim: { color: '#AEB6CF' }, pink: { color: '#FF5AA0' }, purple: { color: '#B184FF' },
  safetyPill: { minHeight: 44, paddingHorizontal: 14, borderRadius: radius.pill, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)', flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: 'rgba(255,255,255,0.04)' },
  searchTitle: { color: colors.white, textAlign: 'center', marginTop: spacing.xxl, fontSize: 32, lineHeight: 40 }, radar: { alignSelf: 'center', width: 390, maxWidth: '100%', aspectRatio: 1, marginTop: spacing.lg, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', borderWidth: 1, borderColor: 'rgba(181,77,255,0.48)', borderRadius: 999 }, ringOuter: { width: '88%', height: '88%' }, ringMid: { width: '68%', height: '68%', borderStyle: 'dashed' }, ringInner: { width: '47%', height: '47%' },
  radarCenter: { width: 116, height: 116, borderRadius: 58, alignItems: 'center', justifyContent: 'center', shadowColor: '#FF2D78', shadowOpacity: 0.5, shadowRadius: 32, elevation: 10 }, radarHeart: { position: 'absolute', bottom: 24 },
  searchAvatar: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#F4EFFF', borderWidth: 3, borderColor: colors.white, alignItems: 'center', justifyContent: 'center' }, avatarLabel: { color: colors.primary, fontWeight: '800' },
  avatarA: { top: '13%', left: '11%' }, avatarB: { top: '8%', right: '8%' }, avatarC: { bottom: '11%', left: '3%' }, avatarD: { bottom: '12%', right: '5%' }, dotA: { position: 'absolute', top: '22%', left: '28%', width: 9, height: 9, borderRadius: 5, backgroundColor: '#FF5AA0' }, dotB: { position: 'absolute', top: '18%', right: '25%', width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF75AE' }, dotC: { position: 'absolute', bottom: '28%', right: '13%', width: 9, height: 9, borderRadius: 5, backgroundColor: '#FF5AA0' },
  dimCenter: { color: '#AEB6CF', textAlign: 'center', lineHeight: 28 }, timer: { color: '#FF78B1', textAlign: 'center', marginVertical: spacing.md, fontSize: 34 },
  panel: { borderRadius: radius.lg, borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)', backgroundColor: 'rgba(10,16,47,0.72)', padding: spacing.lg }, panelHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap' }, gridItem: { width: '50%', minHeight: 66, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.08)' }, gridIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(139,79,255,0.14)', alignItems: 'center', justifyContent: 'center' },
  moderationCard: { marginTop: spacing.lg, minHeight: 96, borderRadius: radius.lg, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', padding: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.md }, safetyGlow: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#7B3FF0', alignItems: 'center', justifyContent: 'center' }, moderationCopy: { flex: 1 },
  cancelButton: { marginTop: spacing.lg, minHeight: 58, borderRadius: radius.pill, borderWidth: 1.5, borderColor: '#FF4E99', alignItems: 'center', justifyContent: 'center' }, footer: { minHeight: 56, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: spacing.sm }, pressed: { opacity: 0.72 },
});
