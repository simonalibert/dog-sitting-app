import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Booking as BookingT, FlowForm, Sitter } from '../data';
import { Calendar, Check, Heart, Money, Paw, Star, Verified } from '../icons';
import { colors, fonts, shadows, type } from '../theme';
import { ImageSlot, NavChrome, PrimaryButton } from '../ui';

export function Booking({
  form,
  sitter,
  booking,
  go,
  back,
}: {
  form: FlowForm;
  sitter: Sitter;
  booking: BookingT;
  go: () => void;
  back: () => void;
}) {
  const first = sitter.name.split(' ')[0];
  const total = booking.duration === 60 ? booking.basePrice + 12 : booking.basePrice;

  return (
    <View style={styles.screen}>
      <NavChrome active={4} onBack={back} />
      <View style={styles.flow}>
        <View style={styles.mark}>
          <View style={styles.markHalo} />
          <View style={styles.badge}>
            <Check size={30} strokeWidth={2.6} color={colors.white} />
          </View>
          <View style={styles.markPaw}>
            <Paw size={18} color={colors.sage600} />
          </View>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 14 }}>
          <Text style={[type.screenTitleSm, { textAlign: 'center' }]}>Almost there!</Text>
          <Text style={[type.screenSub, { textAlign: 'center', marginTop: 10 }]}>Review the details and confirm your walk.</Text>
        </View>

        <View style={styles.card}>
          <Row>
            <ImageSlot size={44} uri={sitter.avatar} />
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Sitter</Text>
              <View style={styles.valRow}>
                <Text style={styles.rowValue}>{sitter.name}</Text>
                {sitter.verified && <Verified size={14} color={colors.sage} />}
              </View>
            </View>
            <View style={styles.sub}>
              <Star size={12} fill={colors.star} />
              <Text style={styles.subText}>{sitter.rating}</Text>
            </View>
          </Row>
          <Divider />
          <Row>
            <View style={styles.ico}>
              <Calendar size={20} color={colors.inkSoft} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Date &amp; time</Text>
              <Text style={styles.rowValue}>
                {booking.dow}, Jun {booking.day} · {booking.time}
              </Text>
            </View>
            <Text style={styles.subText}>{booking.duration} min</Text>
          </Row>
          <Divider />
          <Row>
            <View style={[styles.ico, { backgroundColor: colors.coral100 }]}>
              <Heart size={18} fill={colors.terracotta} color={colors.terracotta} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Your dog</Text>
              <Text style={styles.rowValue}>
                {form.name} · {form.breed}
              </Text>
            </View>
          </Row>
          <Divider />
          <Row total>
            <View style={styles.ico}>
              <Money size={20} color={colors.inkSoft} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Total</Text>
            </View>
            <Text style={styles.total}>${total}.00</Text>
          </Row>
        </View>

        <Text style={styles.note}>
          {first} can't wait to meet {form.name} — you'll get a reminder before the walk.
        </Text>

        <View style={styles.foot}>
          <PrimaryButton title="Confirm booking" onPress={go} />
        </View>
      </View>
    </View>
  );
}

function Row({ children, total }: { children: React.ReactNode; total?: boolean }) {
  return <View style={[styles.row, total && { paddingVertical: 15 }]}>{children}</View>;
}
function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  flow: { flex: 1, paddingHorizontal: 22, paddingBottom: 22 },
  mark: { alignItems: 'center', justifyContent: 'center', marginTop: 2, marginBottom: 12, height: 110 },
  markHalo: { position: 'absolute', width: 110, height: 110, borderRadius: 55, backgroundColor: colors.sage100 },
  badge: { width: 74, height: 74, borderRadius: 37, backgroundColor: colors.sage, alignItems: 'center', justifyContent: 'center', ...shadows.soft },
  markPaw: { position: 'absolute', right: 84, top: 0 },
  card: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.line, borderRadius: 20, paddingHorizontal: 16, ...shadows.card },
  row: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 12 },
  ico: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.cream200, alignItems: 'center', justifyContent: 'center' },
  rowText: { flex: 1, minWidth: 0 },
  rowLabel: { fontFamily: fonts.body800, fontSize: 12, color: colors.muted, letterSpacing: 0.3 },
  valRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  rowValue: { fontFamily: fonts.display600, fontSize: 15, color: colors.ink, marginTop: 2 },
  sub: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  subText: { fontFamily: fonts.body800, fontSize: 13, color: colors.inkSoft },
  divider: { height: 1.5, backgroundColor: colors.line, marginHorizontal: -16 },
  total: { fontFamily: fonts.display800, fontSize: 21, color: colors.terracotta600 },
  note: { textAlign: 'center', fontFamily: fonts.bodyItalic, fontSize: 13.5, lineHeight: 19.5, color: colors.inkSoft, marginTop: 14, marginHorizontal: 8 },
  foot: { marginTop: 'auto', paddingTop: 14 },
});
