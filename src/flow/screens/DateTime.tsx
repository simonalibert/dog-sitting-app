import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Booking, DATES, TIMES } from '../data';
import { colors, fonts, shadows, type } from '../theme';
import { NavChrome, PrimaryButton, PriceTag } from '../ui';

export function DateTime({
  booking,
  setBooking,
  go,
  back,
}: {
  booking: Booking;
  setBooking: React.Dispatch<React.SetStateAction<Booking>>;
  go: () => void;
  back: () => void;
}) {
  const set = <K extends keyof Booking>(k: K, v: Booking[K]) => setBooking((b) => ({ ...b, [k]: v }));
  const total = booking.duration === 60 ? booking.basePrice + 12 : booking.basePrice;

  return (
    <View style={styles.screen}>
      <NavChrome active={3} onBack={back} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.pad} showsVerticalScrollIndicator={false}>
        <Text style={[type.screenTitleSm, { marginTop: 4, marginBottom: 16 }]}>When works{'\n'}for you?</Text>

        <Text style={styles.label}>Pick a day</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateStripOuter}
          contentContainerStyle={styles.dateStrip}>
          {DATES.map((dt) => {
            const active = booking.day === dt.d;
            return (
              <Pressable
                key={dt.d}
                onPress={() => setBooking((b) => ({ ...b, day: dt.d, dow: dt.dow }))}
                style={({ pressed }) => [styles.datePill, shadows.soft, active && styles.dateActive, pressed && { transform: [{ scale: 0.94 }] }]}>
                <Text style={[styles.dow, active && styles.onWhite]}>{dt.dow}</Text>
                <Text style={[styles.dnum, active && styles.onWhite]}>{dt.d}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.label}>Choose a time</Text>
        <View style={styles.timeGrid}>
          {TIMES.map((t) => {
            const active = booking.time === t;
            return (
              <Pressable
                key={t}
                onPress={() => set('time', t)}
                style={({ pressed }) => [styles.timeSlot, shadows.soft, active && styles.timeActive, pressed && { transform: [{ scale: 0.96 }] }]}>
                <Text style={[styles.timeText, active && styles.onWhite]}>{t}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Walk length</Text>
        <View style={styles.pillRow}>
          {([30, 60] as const).map((dur) => {
            const active = booking.duration === dur;
            return (
              <Pressable
                key={dur}
                onPress={() => set('duration', dur)}
                style={({ pressed }) => [styles.sizePill, shadows.soft, active && styles.dateActive, pressed && { transform: [{ scale: 0.94 }] }]}>
                <Text style={[styles.sizePillText, active && styles.onWhite]}>{dur} min</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.foot}>
        <PrimaryButton title="Continue" onPress={go} right={<PriceTag>${total}</PriceTag>} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  pad: { paddingHorizontal: 22, paddingBottom: 8 },
  label: { fontFamily: fonts.body800, fontSize: 13, color: colors.inkSoft, marginBottom: 9 },
  dateStripOuter: { marginHorizontal: -22, marginBottom: 14 },
  dateStrip: { gap: 9, paddingHorizontal: 22, paddingVertical: 2 },
  datePill: {
    width: 48,
    height: 60,
    borderRadius: 15,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  dateActive: { backgroundColor: colors.terracotta, borderColor: colors.terracotta },
  dow: { fontFamily: fonts.body800, fontSize: 10.5, color: colors.muted, letterSpacing: 0.4 },
  dnum: { fontFamily: fonts.display700, fontSize: 19, color: colors.ink },
  onWhite: { color: colors.white },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginBottom: 14 },
  timeSlot: {
    width: '47.8%',
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeActive: { backgroundColor: colors.terracotta, borderColor: colors.terracotta },
  timeText: { fontFamily: fonts.body800, fontSize: 14, color: colors.inkSoft },
  pillRow: { flexDirection: 'row', gap: 9 },
  sizePill: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizePillText: { fontFamily: fonts.body800, fontSize: 14.5, color: colors.inkSoft },
  foot: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 16, backgroundColor: colors.cream },
});
