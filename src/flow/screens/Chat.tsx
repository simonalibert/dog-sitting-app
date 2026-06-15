import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlowForm, Sitter } from '../data';
import { ArrowRight, Back, Verified } from '../icons';
import { colors, fonts, shadows } from '../theme';
import { ImageSlot } from '../ui';

type Msg = { id: number; from: 'them' | 'me'; text: string };

export function Chat({ sitter, form, onClose }: { sitter: Sitter; form: FlowForm; onClose: () => void }) {
  const first = sitter.name.split(' ')[0];
  const [messages, setMessages] = React.useState<Msg[]>([
    { id: 1, from: 'them', text: `Hi! Just picked ${form.name} up for our walk 🐾` },
    { id: 2, from: 'them', text: `We're heading over to Maple Park now — it's a beautiful day for it.` },
    { id: 3, from: 'me', text: 'Amazing, thank you so much! 😊' },
    { id: 4, from: 'them', text: `${form.name} is full of energy today, having the best time!` },
  ]);
  const [draft, setDraft] = React.useState('');
  const scrollRef = React.useRef<ScrollView>(null);
  const nextId = React.useRef(5);

  const scrollToEnd = () => requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const id = nextId.current++;
    setMessages((m) => [...m, { id, from: 'me', text }]);
    setDraft('');
    scrollToEnd();
    // canned sitter reply for a lively demo
    setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, from: 'them', text: `Will do! I'll send ${form.name} home happy and tired 🐶` }]);
      scrollToEnd();
    }, 1300);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={onClose} style={({ pressed }) => [styles.back, pressed && { transform: [{ scale: 0.94 }] }]}>
          <Back />
        </Pressable>
        <ImageSlot size={40} uri={sitter.avatar} />
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{sitter.name}</Text>
            {sitter.verified && <Verified size={15} color={colors.sage} />}
          </View>
          <View style={styles.statusRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.status}>Active now</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToEnd}>
          <Text style={styles.dayDivider}>Today</Text>
          {messages.map((m) => (
            <View key={m.id} style={[styles.bubbleRow, m.from === 'me' ? styles.rowMe : styles.rowThem]}>
              <View style={[styles.bubble, m.from === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
                <Text style={[styles.bubbleText, m.from === 'me' && styles.bubbleTextMe]}>{m.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={draft}
            onChangeText={setDraft}
            placeholder={`Message ${first}…`}
            placeholderTextColor={colors.muted}
            multiline
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <Pressable
            onPress={send}
            style={({ pressed }) => [styles.send, !draft.trim() && styles.sendDisabled, pressed && draft.trim() && { transform: [{ scale: 0.92 }] }]}>
            <ArrowRight size={20} color={colors.white} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: colors.card,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.line,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.cream,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  name: { fontFamily: fonts.display700, fontSize: 16.5, color: colors.ink },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 1 },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.live },
  status: { fontFamily: fonts.body700, fontSize: 12, color: colors.sage600 },
  list: { padding: 18, gap: 8 },
  dayDivider: { textAlign: 'center', fontFamily: fonts.body800, fontSize: 11.5, color: colors.muted, marginBottom: 6, letterSpacing: 0.3 },
  bubbleRow: { flexDirection: 'row' },
  rowMe: { justifyContent: 'flex-end' },
  rowThem: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '78%', paddingVertical: 10, paddingHorizontal: 14, ...shadows.soft },
  bubbleThem: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.line, borderRadius: 18, borderBottomLeftRadius: 6 },
  bubbleMe: { backgroundColor: colors.terracotta, borderRadius: 18, borderBottomRightRadius: 6 },
  bubbleText: { fontFamily: fonts.body600, fontSize: 14.5, lineHeight: 20, color: colors.ink },
  bubbleTextMe: { color: colors.white },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.card,
    borderTopWidth: 1.5,
    borderTopColor: colors.line,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: colors.cream,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: fonts.body600,
    fontSize: 15,
    color: colors.ink,
  },
  send: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.btn,
  },
  sendDisabled: { opacity: 0.45 },
});
