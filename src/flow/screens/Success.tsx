import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Booking, FlowForm, Sitter } from '../data';
import { Calendar, Check, Paw, Verified } from '../icons';
import { colors, fonts } from '../theme';
import { ImageSlot, PrimaryButton } from '../ui';

export function Success({
  form,
  sitter,
  booking,
  track,
  restart,
}: {
  form: FlowForm;
  sitter: Sitter;
  booking: Booking;
  track: () => void;
  restart: () => void;
}) {
  const first = sitter.name.split(' ')[0];
  return (
    <View style={styles.screen}>
      <View style={styles.burst}>
        <View style={[styles.paw, { top: 6, left: 54, transform: [{ rotate: '-20deg' }] }]}>
          <Paw size={20} color={colors.terracotta} />
        </View>
        <View style={[styles.paw, { bottom: 8, right: 50, transform: [{ rotate: '24deg' }] }]}>
          <Paw size={16} color={colors.terracotta} />
        </View>
        <View style={styles.ring}>
          <View style={styles.badge}>
            <Check size={40} strokeWidth={2.4} color={colors.white} />
          </View>
        </View>
      </View>

      <Text style={styles.h2}>You're all set!</Text>
      <Text style={styles.p}>
        {first}'s walk with {form.name} is booked for{' '}
        <Text style={styles.bold}>
          {booking.dow}, Jun {booking.day} at {booking.time}
        </Text>
        .
      </Text>

      <View style={styles.card}>
        <ImageSlot size={48} uri={sitter.avatar} />
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{sitter.name}</Text>
            {sitter.verified && <Verified size={14} color={colors.sage} />}
          </View>
          <View style={styles.metaRow}>
            <Calendar size={13} color={colors.inkSoft} />
            <Text style={styles.meta}>
              {booking.dow}, Jun {booking.day} · {booking.time}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.foot}>
        <PrimaryButton title="Track the walk live" onPress={track} />
        <Pressable onPress={restart}>
          <Text style={styles.link}>Back to home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 26, paddingTop: 10, paddingBottom: 26, alignItems: 'center' },
  burst: { height: 170, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  paw: { position: 'absolute', opacity: 0.5 },
  ring: { width: 128, height: 128, borderRadius: 64, backgroundColor: colors.sage100, alignItems: 'center', justifyContent: 'center' },
  badge: { width: 88, height: 88, borderRadius: 44, backgroundColor: colors.sage, alignItems: 'center', justifyContent: 'center' },
  h2: { fontFamily: fonts.display800, fontSize: 30, color: colors.ink, marginTop: 14, textAlign: 'center' },
  p: { fontFamily: fonts.body600, fontSize: 15, lineHeight: 22.5, color: colors.inkSoft, marginTop: 10, textAlign: 'center', marginHorizontal: 6 },
  bold: { fontFamily: fonts.body800, color: colors.inkSoft },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 18,
    padding: 14,
    marginTop: 22,
    width: '100%',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  name: { fontFamily: fonts.display700, fontSize: 16, color: colors.ink },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  meta: { fontFamily: fonts.body600, fontSize: 13, color: colors.inkSoft },
  foot: { marginTop: 'auto', width: '100%', alignItems: 'center' },
  link: { color: colors.terracotta600, fontFamily: fonts.body800, fontSize: 13.5, marginTop: 14 },
});
