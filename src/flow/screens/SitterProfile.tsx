import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlowForm, Sitter, detailsFor } from '../data';
import { Check, Clock, Heart, Shield, Star, Verified } from '../icons';
import { colors, fonts, shadows } from '../theme';
import { FloatingBack, ImageSlot, PrimaryButton, PriceTag, Stars } from '../ui';

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
        <View style={styles.cover}>
          <FloatingBack onPress={back} style={{ top: 14, left: 16 }} />
          <Pressable onPress={() => setFav((v) => !v)} style={({ pressed }) => [styles.fav, shadows.card, pressed && { transform: [{ scale: 0.94 }] }]}>
            <Heart size={20} fill={fav ? colors.terracotta : 'none'} color={fav ? colors.terracotta : colors.muted} />
          </Pressable>
        </View>

        <View style={styles.body}>
          <View style={styles.avatarWrap}>
            <ImageSlot size={96} border={4} uri={sitter.avatar} />
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{sitter.name}</Text>
            {sitter.verified && <Verified size={18} color={colors.sage} />}
          </View>
          <Text style={styles.tagline}>{d.tagline}</Text>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <View style={styles.starRow}>
                <Star size={15} fill={colors.star} />
                <Text style={styles.statBig}>{sitter.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.statSub}>{sitter.reviews} REVIEWS</Text>
            </View>
            <View style={[styles.stat, styles.statBorder]}>
              <Text style={styles.statBig}>${sitter.price}</Text>
              <Text style={styles.statSub}>PER WALK</Text>
            </View>
            <View style={[styles.stat, styles.statBorder]}>
              <Text style={styles.statBig}>{d.repeat}</Text>
              <Text style={styles.statSub}>REPEAT CLIENTS</Text>
            </View>
          </View>

          <Section title={`About ${first}`}>
            <Text style={styles.bio}>{d.bio}</Text>
          </Section>

          <Section title="Good to know">
            <View style={styles.attrWrap}>
              {d.attrs.map((a) => (
                <View key={a} style={styles.attr}>
                  <Check size={13} strokeWidth={3} color={colors.sage600} />
                  <Text style={styles.attrText}>{a}</Text>
                </View>
              ))}
            </View>
          </Section>

          <Section title="Verified by Simon's">
            <View style={{ gap: 11 }}>
              {trust.map((t) => (
                <View key={t.label} style={styles.trustItem}>
                  <View style={[styles.trustCheck, !t.done && styles.trustPending]}>
                    {t.done ? <Check size={14} strokeWidth={3} color={colors.white} /> : <Clock size={13} color={colors.muted} />}
                  </View>
                  <Text style={styles.trustLabel}>{t.done ? t.label : `${t.label} · in review`}</Text>
                </View>
              ))}
            </View>
          </Section>

          <View style={{ marginTop: 18 }}>
            <View style={styles.mgCard}>
              <View style={styles.mgIco}>
                <Shield size={22} color={colors.sage600} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.mgTitle}>Free meet &amp; greet</Text>
                <Text style={styles.mgDesc}>
                  {anxious
                    ? `${form.name} seems shy with new people — ${first} offers a no-cost intro walk first.`
                    : `Say hi before you book — ${first} offers a free 15-min intro.`}
                </Text>
              </View>
            </View>
          </View>

          <Section title="Recent reviews">
            {d.reviews.map((r, i) => (
              <View key={i} style={[styles.review, i > 0 && { marginTop: 10 }]}>
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
          </Section>
        </View>
      </ScrollView>

      <View style={styles.foot}>
        <PrimaryButton title="Book a walk" onPress={go} right={<PriceTag>${sitter.price}</PriceTag>} />
      </View>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={styles.sectionH}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  cover: { height: 120, backgroundColor: '#EFDDD2' },
  fav: {
    position: 'absolute',
    top: 14,
    right: 16,
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { paddingHorizontal: 22, paddingBottom: 18, marginTop: -50 },
  avatarWrap: { alignSelf: 'center', ...shadows.card },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10 },
  name: { fontFamily: fonts.display700, fontSize: 23, color: colors.ink },
  tagline: { textAlign: 'center', fontFamily: fonts.body600, fontSize: 13.5, color: colors.inkSoft, marginTop: 2 },
  stats: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
    ...shadows.soft,
  },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 11, paddingHorizontal: 4 },
  statBorder: { borderLeftWidth: 1.5, borderLeftColor: colors.line },
  starRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  statBig: { fontFamily: fonts.display700, fontSize: 17, color: colors.ink },
  statSub: { fontFamily: fonts.body800, fontSize: 11, color: colors.muted, marginTop: 2 },
  sectionH: { fontFamily: fonts.display700, fontSize: 15.5, color: colors.ink, marginBottom: 11 },
  bio: { fontFamily: fonts.body600, fontSize: 14, lineHeight: 22, color: colors.inkSoft },
  attrWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  attr: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 34, paddingHorizontal: 13, borderRadius: 18, backgroundColor: colors.sage100 },
  attrText: { fontFamily: fonts.body700, fontSize: 12.5, color: colors.sage600 },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  trustCheck: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.sage, alignItems: 'center', justifyContent: 'center' },
  trustPending: { backgroundColor: colors.cream300 },
  trustLabel: { fontFamily: fonts.body700, fontSize: 13.5, color: colors.ink, flex: 1 },
  mgCard: { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: colors.sage100, borderRadius: 16, paddingVertical: 13, paddingHorizontal: 14 },
  mgIco: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  mgTitle: { fontFamily: fonts.display700, fontSize: 14, color: colors.ink },
  mgDesc: { fontFamily: fonts.body600, fontSize: 12.5, color: colors.inkSoft, marginTop: 2, lineHeight: 18 },
  review: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.line, borderRadius: 16, padding: 13, ...shadows.soft },
  reviewHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  reviewAva: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.coral100, alignItems: 'center', justifyContent: 'center' },
  reviewAvaText: { fontFamily: fonts.display700, fontSize: 14, color: colors.terracotta600 },
  reviewName: { fontFamily: fonts.body800, fontSize: 13.5, color: colors.ink },
  reviewAgo: { fontFamily: fonts.body700, fontSize: 11.5, color: colors.muted },
  reviewText: { fontFamily: fonts.body600, fontSize: 13, lineHeight: 19.5, color: colors.inkSoft },
  foot: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 16, backgroundColor: colors.cream },
});
