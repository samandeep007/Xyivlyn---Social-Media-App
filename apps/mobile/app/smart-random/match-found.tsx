import { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/theme/tokens';

const common = [
  ['book-outline', 'Love for Books'],
  ['musical-notes-outline', 'Music Lovers'],
  ['airplane-outline', 'Travel Enthusiasts'],
] as const;

export default function MatchFoundScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/conversation' as Href);
    }, 2600);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#060A1B', '#0A0A20', '#090C20']} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.iconButton}><Ionicons name="arrow-back" size={28} color={colors.white} /></Pressable>
          <AppText variant="h2" style={styles.white}>Smart Random</AppText>
          <Pressable style={styles.safetyPill}><Ionicons name="shield-checkmark" size={18} color={colors.white} /><AppText variant="bodyMedium" style={styles.white}>Safety</AppText></Pressable>
        </View>

        <View style={styles.matchHeader}><Ionicons name="sparkles" size={42} color={colors.white} /><AppText variant="display" style={styles.matchTitle}>IT’S A <AppText variant="display" style={styles.pink}>MATCH!</AppText></AppText><AppText variant="bodyLg" style={styles.dim}>You and this person vibe together.</AppText></View>

        <View style={styles.peopleRow}>
          <View style={styles.personColumn}>
            <LinearGradient colors={['#6C32F4', '#9B61FF']} style={styles.photoFrame}><View style={styles.photo}><AppText variant="display" style={styles.personInitial}>A</AppText></View></LinearGradient>
            <AppText variant="h2" style={styles.white}>Ananya</AppText><AppText variant="bodyLg" style={styles.dim}>22  ·  India 🇮🇳</AppText>
          </View>
          <LinearGradient colors={['#6C32F4', '#D43CE1', '#FF2D78']} style={styles.matchNode}><Ionicons name="people" size={25} color={colors.white} /><Ionicons name="heart" size={20} color={colors.white} style={styles.matchHeart} /></LinearGradient>
          <View style={styles.personColumn}>
            <LinearGradient colors={['#FF2D78', '#FF73A9']} style={styles.photoFrame}><View style={[styles.photo, styles.photoPink]}><AppText variant="display" style={[styles.personInitial, styles.pinkInitial]}>A</AppText></View></LinearGradient>
            <AppText variant="h2" style={styles.white}>Arjun</AppText><AppText variant="bodyLg" style={styles.dim}>23  ·  India 🇮🇳</AppText>
          </View>
        </View>

        <View style={styles.traitPanel}>
          <View style={styles.trait}><View style={styles.traitIcon}><Ionicons name="globe-outline" size={25} color="#A970FF" /></View><View><AppText variant="small" style={styles.dim}>Language</AppText><AppText variant="bodyMedium" style={styles.white}>English, Hindi</AppText></View></View>
          <View style={styles.trait}><View style={[styles.traitIcon, styles.traitPink]}><Ionicons name="heart-outline" size={25} color="#FF5AA0" /></View><View><AppText variant="small" style={styles.dim}>Intent</AppText><AppText variant="bodyMedium" style={styles.white}>Friendship</AppText></View></View>
          <View style={styles.trait}><View style={styles.traitIcon}><Ionicons name="happy-outline" size={25} color="#A970FF" /></View><View><AppText variant="small" style={styles.dim}>Vibe</AppText><AppText variant="bodyMedium" style={styles.white}>Chill</AppText></View></View>
        </View>

        <View style={styles.commonHeader}><Ionicons name="sparkles" size={18} color="#9B61FF" /><AppText variant="h2" style={styles.white}>3 things in common</AppText><Ionicons name="sparkles" size={18} color="#9B61FF" /></View>
        <View style={styles.commonRow}>{common.map(([icon, label], index) => <View key={label} style={styles.commonItem}><Ionicons name={icon} size={42} color={index === 1 ? '#FF4E99' : '#8D55FF'} /><AppText variant="small" style={styles.whiteCenter}>{label}</AppText></View>)}</View>

        <View style={styles.connectCard}>
          <View style={styles.connectIcons}><View style={[styles.userBlob, styles.blobPurple]}><Ionicons name="person" size={40} color="#9E6BFF" /></View><View style={styles.wave}><AppText variant="bodyMedium" style={styles.pink}>···∿·∿···</AppText></View><View style={[styles.userBlob, styles.blobPink]}><Ionicons name="person" size={40} color="#FF5AA0" /></View></View>
          <AppText variant="h1" style={styles.white}>Connecting...</AppText><AppText variant="body" style={styles.dim}>Creating a safe space for your conversation.</AppText>
          <View style={styles.progressTrack}><LinearGradient colors={['#6C32F4', '#B13BDD', '#FF4E99']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.progressFill} /></View>
        </View>

        <Pressable onPress={() => router.replace('/smart-random/searching' as Href)} style={({ pressed }) => [styles.skip, pressed && styles.pressed]}><Ionicons name="timer-outline" size={20} color="#FF5AA0" /><AppText variant="bodyLg" style={styles.dim}>Taking too long? <AppText variant="bodyLg" style={styles.pink}>Skip</AppText> to next</AppText><Ionicons name="chevron-forward" size={20} color="#FF7DB4" /></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#060A1B' }, content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl, maxWidth: 620, width: '100%', alignSelf: 'center' }, topBar: { minHeight: 76, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, iconButton: { width: 44, height: 44, justifyContent: 'center' },
  safetyPill: { minHeight: 44, borderRadius: radius.pill, borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)', paddingHorizontal: 14, flexDirection: 'row', gap: 7, alignItems: 'center' }, white: { color: colors.white }, dim: { color: '#B6BAC9' }, pink: { color: '#FF5AA0' },
  matchHeader: { alignItems: 'center', gap: spacing.sm, marginTop: spacing.xxl, marginBottom: spacing.xxl }, matchTitle: { color: colors.white, fontSize: 40, lineHeight: 48 },
  peopleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xxl }, personColumn: { flex: 1, alignItems: 'center', gap: spacing.sm }, photoFrame: { width: 150, height: 150, borderRadius: 75, padding: 5, marginBottom: spacing.sm }, photo: { flex: 1, borderRadius: 70, backgroundColor: '#EDE5FF', alignItems: 'center', justifyContent: 'center' }, photoPink: { backgroundColor: '#FFE8F2' }, personInitial: { color: colors.primary, fontSize: 58 }, pinkInitial: { color: colors.secondary },
  matchNode: { width: 74, height: 74, borderRadius: 37, alignItems: 'center', justifyContent: 'center', marginHorizontal: -8, zIndex: 2 }, matchHeart: { position: 'absolute', bottom: 14 },
  traitPanel: { minHeight: 96, borderRadius: radius.lg, borderWidth: 1, borderColor: 'rgba(255,255,255,0.13)', backgroundColor: 'rgba(255,255,255,0.025)', padding: spacing.md, flexDirection: 'row', justifyContent: 'space-between' }, trait: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.xs }, traitIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(123,63,240,0.14)', alignItems: 'center', justifyContent: 'center' }, traitPink: { backgroundColor: 'rgba(255,45,120,0.12)' },
  commonHeader: { marginTop: spacing.xxl, marginBottom: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.md }, commonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing.xxl }, commonItem: { width: '31%', alignItems: 'center', gap: spacing.sm }, whiteCenter: { color: colors.white, textAlign: 'center' },
  connectCard: { minHeight: 280, borderRadius: radius.xl, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.025)', alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md }, connectIcons: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }, userBlob: { width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center' }, blobPurple: { backgroundColor: 'rgba(108,50,244,0.16)' }, blobPink: { backgroundColor: 'rgba(255,45,120,0.13)' }, wave: { paddingHorizontal: spacing.sm }, progressTrack: { marginTop: spacing.lg, height: 11, width: '100%', borderRadius: radius.pill, backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' }, progressFill: { width: '74%', height: '100%', borderRadius: radius.pill },
  skip: { minHeight: 72, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: spacing.sm }, pressed: { opacity: 0.72 },
});
