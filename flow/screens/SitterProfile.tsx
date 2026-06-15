import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlowForm, Sitter, detailsFor } from '../data';
import { Check, Clock, Heart, Paw, Shield, Star, Verified } from '../icons';
import { colors, shadows } from '../theme';
import { FloatingBack, PrimaryButton, PriceTag, Stars } from '../ui';

// Native-iOS styling proof: system font (SF Pro on device), grouped inset lists,
// monogram avatar (no photo), warm palette (cream bg + terracotta accent + paw) kept.
const SF = Platform.select({ ios: 'System', default: undefined });

export function SitterProfile({
  sitter,
  form,
  go,
  back,
}: {
  sitter: Sitter;
  form: FlowForm;
  go: () => void;
  back: () => void;
}) {
  const [fav, setFav] = React.useState(false);
  const d = detailsFor(sitter);
  const first = sitter.name.split(' ')[0];
  const anxious = form.tags.includes('Anxious with strangers');
  const trust = [
    { label: 'Identity verified', done: true },
    { label: 'Background check passed', done: sitter.verified },
    { label: 'References checked', done: true },
    { label: `${d.years} years of experience`, done: true },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
        {/* floating controls */}
        <View style={styles.topControls}>
          <FloatingBack onPress={back} style={{ position: 'relative', top: 0, left: 0 }} />
          <Pressable onPress={() => setFav((v) => !v)} style={({ pressed }) => [styles.fav, shadows.soft, pressed && { transform: [{ scale: 0.94 }] }]}>
            <Heart size={20} fill={fav ? colors.terracotta : 'none'} color={fav ? colors.terracotta : colors.muted} />
          </Pressable>
        </View>

        {/* header: monogram avatar + name */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>{sitter.name[0]}</Text>
            <View style={styles.avatarPaw}>
              <Paw size={16} color={colors.white} />
            </View>
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{sitter.name}</Text>
            {sitter.verified && <Verified size={20} color={colors.sage} />}
          </View>
          <Text style={styles.tagline}>{d.tagline}</Text>
        </View>

        {/* stat strip */}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <View style={styles.starRow}>
              <Star size={14} fill={colors.star} />
              <Text style={styles.statBig}>{sitter.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.statSub}>{sitter.reviews} reviews</Text>
          </View>
          <View style={[styles.stat, styles.statBorder]}>
            <Text style={styles.statBig}>${sitter.price}</Text>
            <Text style={styles.statSub}>per walk</Text>
          </View>
          <View style={[styles.stat, styles.statBorder]}>
            <Text style={styles.statBig}>{d.repeat}</Text>
            <Text style={styles.statSub}>repeat clients</Text>
          </View>
        </View>

        {/* About — grouped cell */}
        <SectionHeader>{`ABOUT ${first.toUpperCase()}`}</SectionHeader>
        <View style={styles.group}>
          <View style={styles.cell}>
            <Text style={styles.bio}>{d.bio}</Text>
          </View>
        </View>

        {/* Good to know — grouped list */}
        <SectionHeader>GOOD TO KNOW</SectionHeader>
        <View style={styles.group}>
          {d.attrs.map((a, i) => (
            <View key={a} style={[styles.row, i > 0 && styles.rowDivider]}>
              <View style={[styles.rowIcon, { backgroundColor: colors.sage100 }]}>
                <Check size={14} strokeWidth={3} color={colors.sage600} />
              </View>
              <Text style={styles.rowLabel}>{a}</Text>
            </View>
          ))}
        </View>

        {/* Verified — grouped list */}
        <SectionHeader>VERIFIED BY SIMON'S</SectionHeader>
        <View style={styles.group}>
          {trust.map((t, i) => (
            <View key={t.label} style={[styles.row, i > 0 && styles.rowDivider]}>
              <View style={[styles.rowIcon, { backgroundColor: t.done ? colors.sage : colors.cream300 }]}>
                {t.done ? <Check size={14} strokeWidth={3} color={colors.white} /> : <Clock size={13} color={colors.muted} />}
              </View>
              <Text style={styles.rowLabel}>{t.done ? t.label : `${t.label} · in review`}</Text>
            </View>
          ))}
        </View>

        {/* Free meet & greet — tinted callout */}
        <View style={styles.callout}>
          <View style={styles.calloutIcon}>
            <Shield size={20} color={colors.sage600} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.calloutTitle}>Free meet &amp; greet</Text>
            <Text style={styles.calloutDesc}>
              {anxious
                ? `${form.name} seems shy with new people — ${first} offers a no-cost intro walk first.`
                : `Say hi before you book — ${first} offers a free 15-min intro.`}
            </Text>
          </View>
        </View>

        {/* Reviews — grouped list */}
        <SectionHeader>RECENT REVIEWS</SectionHeader>
        <View style={styles.group}>
          {d.reviews.map((r, i) => (
            <View key={i} style={[styles.reviewCell, i > 0 && styles.rowDivider]}>
              <View style={styles.reviewHead}>
                <View style={styles.reviewAva}>
                  <Text style={styles.reviewAvaText}>{r.who[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewName}>{r.who}</Text>
                  <Text style={styles.reviewAgo}>{r.ago}</Text>
                </View>
                <Stars n={r.stars} />
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.foot}>
        <PrimaryButton title="Book a walk" onPress={go} right={<PriceTag>${sitter.price}</PriceTag>} />
      </View>
    </View>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionHeader}>{children}</Text>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  topControls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 6 },
  fav: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: { alignItems: 'center', paddingHorizontal: 22, marginTop: 4 },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: colors.coral100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: { fontFamily: SF, fontWeight: '700', fontSize: 40, color: colors.terracotta600 },
  avatarPaw: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.cream,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  name: { fontFamily: SF, fontWeight: '700', fontSize: 26, color: colors.ink, letterSpacing: 0.3 },
  tagline: { fontFamily: SF, fontWeight: '500', fontSize: 14, color: colors.inkSoft, marginTop: 3 },
  stats: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  stat: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderLeftColor: colors.line },
  starRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  statBig: { fontFamily: SF, fontWeight: '700', fontSize: 18, color: colors.ink },
  statSub: { fontFamily: SF, fontWeight: '500', fontSize: 12, color: colors.muted, marginTop: 2 },
  sectionHeader: { fontFamily: SF, fontWeight: '600', fontSize: 13, color: colors.muted, letterSpacing: 0.4, marginLeft: 32, marginTop: 26, marginBottom: 8 },
  group: { backgroundColor: colors.card, borderRadius: 14, marginHorizontal: 16, borderWidth: 1, borderColor: colors.line, overflow: 'hidden' },
  cell: { paddingHorizontal: 16, paddingVertical: 14 },
  bio: { fontFamily: SF, fontWeight: '400', fontSize: 15, lineHeight: 22, color: colors.ink },
  row: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingHorizontal: 16, paddingVertical: 13 },
  rowDivider: { borderTopWidth: 1, borderTopColor: colors.line },
  rowIcon: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontFamily: SF, fontWeight: '500', fontSize: 15, color: colors.ink, flex: 1 },
  callout: { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: colors.sage100, borderRadius: 14, marginHorizontal: 16, marginTop: 26, padding: 14 },
  calloutIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  calloutTitle: { fontFamily: SF, fontWeight: '600', fontSize: 15, color: colors.ink },
  calloutDesc: { fontFamily: SF, fontWeight: '400', fontSize: 13, color: colors.inkSoft, marginTop: 2, lineHeight: 18 },
  reviewCell: { paddingHorizontal: 16, paddingVertical: 14 },
  reviewHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  reviewAva: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.coral100, alignItems: 'center', justifyContent: 'center' },
  reviewAvaText: { fontFamily: SF, fontWeight: '700', fontSize: 14, color: colors.terracotta600 },
  reviewName: { fontFamily: SF, fontWeight: '700', fontSize: 14, color: colors.ink },
  reviewAgo: { fontFamily: SF, fontWeight: '500', fontSize: 12, color: colors.muted, marginTop: 1 },
  reviewText: { fontFamily: SF, fontWeight: '400', fontSize: 14, lineHeight: 20, color: colors.inkSoft },
  foot: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, backgroundColor: colors.cream, borderTopWidth: 1, borderTopColor: colors.line },
});
