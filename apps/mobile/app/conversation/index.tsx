import { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui';
import { colors, radius, shadows, spacing } from '@/theme/tokens';

type Message = {
  id: string;
  text: string;
  mine: boolean;
  time: string;
};

const partner = {
  name: 'Arjun',
  age: 23,
  country: 'India 🇮🇳',
};

function clockLabel(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `00:${minutes}:${remainder}`;
}

export default function ConversationScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [elapsed, setElapsed] = useState(12);
  const [draft, setDraft] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [partnerTyping, setPartnerTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  }, [messages, partnerTyping]);

  const hasMessages = messages.length > 0;

  const connectionCopy = useMemo(
    () => (hasMessages ? "You're talking with each other" : "You're talking with each other"),
    [hasMessages],
  );

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const mine: Message = { id: `${Date.now()}-me`, text, mine: true, time };
    setMessages((current) => [...current, mine]);
    setDraft('');
    setPartnerTyping(true);

    setTimeout(() => {
      const replies = [
        'Hey! 👋 Nice to meet you here.',
        "How's your day going so far?",
        'Same here! ☕ Working on a side project right now. What kind of things are you into?',
        'That sounds fun. I’m into music, travel and good conversations too ✨',
      ];
      const reply = replies[Math.min(messages.length, replies.length - 1)];
      const replyNow = new Date();
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-partner`,
          text: reply,
          mine: false,
          time: replyNow.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        },
      ]);
      setPartnerTyping(false);
    }, 950);
  }

  function nextPerson() {
    Alert.alert('Find someone new?', 'This will end the current conversation.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Find next',
        style: 'destructive',
        onPress: () => router.replace('/smart-random/searching' as Href),
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.circleButton} hitSlop={8}>
              <Ionicons name="arrow-back" size={27} color={colors.textStrong} />
            </Pressable>

            <View style={styles.profileBlock}>
              <View style={styles.avatarWrap}>
                <LinearGradient colors={['#DCCBFF', '#F1E8FF']} style={styles.avatarRing}>
                  <View style={styles.avatar}><AppText style={styles.avatarLetter}>A</AppText></View>
                </LinearGradient>
                <View style={styles.onlineDot} />
              </View>
              <View style={styles.profileCopy}>
                <View style={styles.nameRow}>
                  <AppText variant="h1" style={styles.name}>{partner.name}</AppText>
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                </View>
                <AppText variant="bodyLg">{partner.age}  ·  {partner.country}</AppText>
                <View style={styles.onlineRow}>
                  <View style={styles.smallOnlineDot} />
                  <AppText variant="body">Online</AppText>
                </View>
              </View>
            </View>

            <View style={styles.headerActions}>
              <Pressable style={styles.headerAction} onPress={() => Alert.alert('Safety', 'Safety controls will be connected to the moderation backend in a later chunk.') }>
                <View style={styles.circleButton}><Ionicons name="shield-checkmark-outline" size={27} color="#46506A" /></View>
                <AppText variant="smallMedium" style={styles.actionLabel}>Safety</AppText>
              </Pressable>
              <Pressable style={styles.headerAction} onPress={() => Alert.alert('More', 'More conversation actions will be added with the full conversation lifecycle.') }>
                <View style={styles.circleButton}><Ionicons name="ellipsis-horizontal" size={27} color="#202943" /></View>
                <AppText variant="smallMedium" style={styles.actionLabel}>More</AppText>
              </Pressable>
            </View>
          </View>

          <LinearGradient colors={['#FAF6FF', '#FFF7FC']} style={styles.connectedCard}>
            <View style={styles.connectedIcon}><Ionicons name="shield-checkmark-outline" size={27} color={colors.primary} /></View>
            <View style={styles.connectedText}>
              <AppText variant="h3" style={styles.primaryText}>Connected</AppText>
              <AppText variant="bodyLg">{connectionCopy}</AppText>
            </View>
            <View style={styles.timerPill}>
              <Ionicons name="shield-checkmark-outline" size={22} color={colors.primary} />
              <AppText variant="h3" style={styles.timerText}>{clockLabel(elapsed)}</AppText>
              <Ionicons name="chevron-forward" size={22} color="#5B647A" />
            </View>
          </LinearGradient>

          <View style={styles.modeTabs}>
            <Pressable style={[styles.modeTab, styles.activeMode]}>
              <Ionicons name="chatbubble-ellipses-outline" size={26} color={colors.primary} />
              <AppText variant="bodyLg" style={styles.activeModeText}>Text</AppText>
            </Pressable>
            <Pressable style={styles.modeTab} onPress={() => Alert.alert('Voice', 'Voice calling will be wired to LiveKit in the realtime conversation phase.') }>
              <Ionicons name="call-outline" size={27} color="#626B84" />
              <AppText variant="bodyLg" style={styles.modeText}>Voice</AppText>
            </Pressable>
            <Pressable style={styles.modeTab} onPress={() => Alert.alert('Video', 'Video calling will be wired to LiveKit in the realtime conversation phase.') }>
              <Ionicons name="videocam-outline" size={28} color="#626B84" />
              <AppText variant="bodyLg" style={styles.modeText}>Video</AppText>
            </Pressable>
          </View>

          <ScrollView
            ref={scrollRef}
            style={styles.conversationArea}
            contentContainerStyle={[styles.conversationContent, !hasMessages && styles.emptyContent]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {!hasMessages ? (
              <View style={styles.helloState}>
                <View style={styles.helloGraphic}>
                  <View style={[styles.bubbleGraphic, styles.purpleBubble]}><AppText style={styles.dotGraphic}>•••</AppText></View>
                  <View style={[styles.bubbleGraphic, styles.pinkBubble]}><Ionicons name="heart" size={42} color={colors.white} /></View>
                </View>
                <AppText variant="display" style={styles.helloTitle}>Say hello 👋</AppText>
                <AppText variant="bodyLg" style={styles.helloSub}>Be kind, be real, and enjoy the conversation.</AppText>
                <View style={styles.tipPill}>
                  <Ionicons name="bulb-outline" size={20} color={colors.primary} />
                  <AppText variant="bodyMedium" style={styles.primaryText}>Tip: Ask something interesting!</AppText>
                </View>
              </View>
            ) : (
              <>
                <View style={styles.todayPill}><AppText variant="smallMedium" style={styles.muted}>Today</AppText></View>
                {messages.map((message) => (
                  <View key={message.id} style={[styles.messageRow, message.mine && styles.myMessageRow]}>
                    {!message.mine && <View style={styles.miniAvatar}><AppText style={styles.miniAvatarText}>A</AppText></View>}
                    <View style={[styles.messageColumn, message.mine && styles.myMessageColumn]}>
                      {message.mine ? (
                        <LinearGradient colors={['#6C32F4', '#A13CE8', '#F12B93']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.myBubble}>
                          <AppText variant="bodyLg" style={styles.myBubbleText}>{message.text}</AppText>
                        </LinearGradient>
                      ) : (
                        <View style={styles.partnerBubble}><AppText variant="bodyLg">{message.text}</AppText></View>
                      )}
                      <View style={[styles.messageMeta, message.mine && styles.myMessageMeta]}>
                        <AppText variant="small" style={styles.metaText}>{message.time}</AppText>
                        {message.mine && <Ionicons name="checkmark-done" size={17} color="#65708E" />}
                      </View>
                    </View>
                  </View>
                ))}
                {partnerTyping && (
                  <View style={styles.messageRow}>
                    <View style={styles.miniAvatar}><AppText style={styles.miniAvatarText}>A</AppText></View>
                    <View style={styles.typingBubble}><AppText style={styles.typingDots}>● ● ●</AppText></View>
                  </View>
                )}
              </>
            )}
          </ScrollView>

          <View style={styles.quickActions}>
            <Pressable style={styles.quickAction} onPress={nextPerson}>
              <View style={[styles.quickIcon, styles.purpleSoft]}><Ionicons name="shuffle" size={25} color={colors.primary} /></View>
              <View><AppText variant="bodyMedium">Next</AppText><AppText variant="small" muted>Find someone new</AppText></View>
            </Pressable>
            <View style={styles.actionDivider} />
            <Pressable style={styles.quickAction} onPress={() => setFavorite((value) => !value)}>
              <View style={[styles.quickIcon, styles.pinkSoft]}><Ionicons name={favorite ? 'heart' : 'heart-outline'} size={25} color={colors.secondary} /></View>
              <View><AppText variant="bodyMedium">Stay Connected</AppText><AppText variant="small" muted>{favorite ? 'Added to favorites' : 'Add to favorites'}</AppText></View>
            </Pressable>
            <View style={styles.actionDivider} />
            <Pressable style={styles.quickAction} onPress={() => router.push('/conversation/report' as Href)}>
              <View style={[styles.quickIcon, styles.purpleSoft]}><Ionicons name="flag-outline" size={25} color={colors.primary} /></View>
              <View><AppText variant="bodyMedium">Report</AppText><AppText variant="small" muted>Report or block</AppText></View>
            </Pressable>
          </View>

          <View style={styles.composerWrap}>
            <Pressable style={styles.plusButton} onPress={() => Alert.alert('Attachments', 'Media and attachment support will be implemented with messaging storage.') }>
              <LinearGradient colors={['#6C32F4', '#7F20F7']} style={styles.gradientCircle}><Ionicons name="add" size={31} color={colors.white} /></LinearGradient>
            </Pressable>
            <View style={styles.inputShell}>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={sendMessage}
                placeholder="Type a message..."
                placeholderTextColor="#7A8299"
                style={styles.input}
                returnKeyType="send"
              />
              <Ionicons name="happy-outline" size={28} color="#65708B" />
            </View>
            <Pressable onPress={sendMessage} disabled={!draft.trim()} style={({ pressed }) => [styles.sendButton, pressed && styles.pressed, !draft.trim() && styles.disabled]}>
              <LinearGradient colors={['#6C32F4', '#C02CDF', '#FF2D78']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientCircle}>
                <Ionicons name="paper-plane" size={25} color={colors.white} />
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.privacyRow}>
            <Ionicons name="lock-closed" size={16} color="#59637D" />
            <AppText variant="small" style={styles.privacyCopy}>Your conversation is private and end-to-end encrypted.</AppText>
            <AppText variant="smallMedium" style={styles.primaryText}>Learn more</AppText>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: spacing.lg },
  header: { minHeight: 112, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  circleButton: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', ...shadows.soft },
  profileBlock: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatarWrap: { width: 78, height: 78 },
  avatarRing: { width: 78, height: 78, borderRadius: 39, padding: 5 },
  avatar: { flex: 1, borderRadius: 34, backgroundColor: '#EEE7E3', alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { fontSize: 30, fontWeight: '800', color: '#3D2B27' },
  onlineDot: { position: 'absolute', right: 0, bottom: 4, width: 18, height: 18, borderRadius: 9, backgroundColor: colors.success, borderWidth: 3, borderColor: colors.white },
  profileCopy: { flex: 1, gap: 2 }, nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 }, name: { fontSize: 27 },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 7 }, smallOnlineDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.success },
  headerActions: { flexDirection: 'row', gap: spacing.md }, headerAction: { alignItems: 'center', gap: 5 }, actionLabel: { color: '#3D465F' },
  connectedCard: { minHeight: 82, borderRadius: radius.lg, borderWidth: 1, borderColor: '#EADFFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
  connectedIcon: { width: 52, height: 52, borderRadius: radius.md, backgroundColor: '#F0E7FF', alignItems: 'center', justifyContent: 'center' },
  connectedText: { flex: 1, paddingHorizontal: spacing.md }, primaryText: { color: colors.primary },
  timerPill: { minHeight: 48, borderRadius: radius.pill, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: spacing.md, backgroundColor: 'rgba(255,255,255,0.55)' }, timerText: { color: '#313A51', fontVariant: ['tabular-nums'] },
  modeTabs: { minHeight: 68, borderRadius: radius.lg, backgroundColor: colors.surface, flexDirection: 'row', overflow: 'hidden', borderWidth: 1, borderColor: colors.border, ...shadows.soft },
  modeTab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, borderBottomWidth: 3, borderBottomColor: colors.transparent },
  activeMode: { borderBottomColor: colors.secondary }, activeModeText: { color: colors.primary, fontWeight: '700' }, modeText: { color: '#566079', fontWeight: '600' },
  conversationArea: { flex: 1, minHeight: 230 }, conversationContent: { paddingVertical: spacing.xl, gap: spacing.md }, emptyContent: { flexGrow: 1, justifyContent: 'center' },
  helloState: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxl }, helloGraphic: { width: 190, height: 142, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  bubbleGraphic: { width: 100, height: 78, borderRadius: 34, position: 'absolute', alignItems: 'center', justifyContent: 'center' }, purpleBubble: { backgroundColor: '#E7D8FF', left: 24, top: 18 }, pinkBubble: { backgroundColor: '#FF8DC1', right: 18, bottom: 10 }, dotGraphic: { fontSize: 30, letterSpacing: 4, color: '#BD8BFF' },
  helloTitle: { marginTop: spacing.sm }, helloSub: { textAlign: 'center', marginTop: spacing.sm, color: '#283149' }, tipPill: { marginTop: spacing.xl, minHeight: 48, borderRadius: radius.pill, borderWidth: 1.5, borderColor: '#D8C3FF', backgroundColor: '#FBF8FF', paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: 9 },
  todayPill: { alignSelf: 'center', borderRadius: radius.pill, backgroundColor: '#F0F1F5', paddingHorizontal: 15, paddingVertical: 6, marginBottom: spacing.sm }, muted: { color: '#6B7389' },
  messageRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm }, myMessageRow: { justifyContent: 'flex-end' }, miniAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#E8DED9', alignItems: 'center', justifyContent: 'center', marginTop: 4 }, miniAvatarText: { fontWeight: '800', color: '#44312A' },
  messageColumn: { maxWidth: '76%' }, myMessageColumn: { alignItems: 'flex-end' }, partnerBubble: { backgroundColor: '#F0F1F4', borderRadius: 20, borderBottomLeftRadius: 5, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  myBubble: { borderRadius: 20, borderBottomRightRadius: 5, paddingHorizontal: spacing.lg, paddingVertical: spacing.md }, myBubbleText: { color: colors.white }, messageMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, paddingHorizontal: 4 }, myMessageMeta: { justifyContent: 'flex-end' }, metaText: { color: '#8A91A6' },
  typingBubble: { backgroundColor: '#F0F1F4', borderRadius: 18, borderBottomLeftRadius: 5, paddingHorizontal: 18, paddingVertical: 12 }, typingDots: { color: '#B48AF9', letterSpacing: 4 },
  quickActions: { minHeight: 80, borderRadius: radius.lg, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, marginBottom: spacing.md, ...shadows.soft }, quickAction: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, quickIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, purpleSoft: { backgroundColor: colors.primarySoft }, pinkSoft: { backgroundColor: colors.secondarySoft }, actionDivider: { width: 1, height: 42, backgroundColor: colors.divider, marginHorizontal: spacing.sm },
  composerWrap: { minHeight: 78, borderRadius: radius.xl, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.md, ...shadows.soft }, plusButton: { width: 48, height: 48 }, sendButton: { width: 48, height: 48 }, gradientCircle: { flex: 1, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }, inputShell: { flex: 1, minHeight: 52, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg }, input: { flex: 1, fontSize: 16, color: colors.text, paddingVertical: 12 }, pressed: { opacity: 0.72 }, disabled: { opacity: 0.45 },
  privacyRow: { minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, flexWrap: 'wrap' }, privacyCopy: { color: '#566079' },
});
