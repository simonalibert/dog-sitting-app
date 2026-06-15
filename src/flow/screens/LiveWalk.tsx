import React from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Booking, FlowForm, Sitter, WALK_PHOTO } from '../data';
import { Check, Msg, Paw, Verified } from '../icons';
import { colors, fonts, shadows } from '../theme';
import { ImageSlot, PrimaryButton } from '../ui';

const ROUTE = 'M58,116 C150,90 104,198 196,198 C258,198 280,262 184,298 C122,324 152,366 100,350';
const VB_W = 322;
const VB_H = 392;

// Cubic bezier segments [P0, C1, C2, P3] in viewBox space.
const SEGMENTS = [
  [
    [58, 116],
    [150, 90],
    [104, 198],
    [196, 198],
  ],
  [
    [196, 198],
    [258, 198],
    [280, 262],
    [184, 298],
  ],
  [
    [184, 298],
    [122, 324],
    [152, 366],
    [100, 350],
  ],
] as const;

function cubic(p0: number, c1: number, c2: number, p3: number, t: number) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t * p3;
}

// Build an arc-length lookup table by sampling each segment.
const LUT = (() => {
  const pts: { x: number; y: number; d: number }[] = [];
  let total = 0;
  let prev: { x: number; y: number } | null = null;
  SEGMENTS.forEach((s) => {
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = cubic(s[0][0], s[1][0], s[2][0], s[3][0], t);
      const y = cubic(s[0][1], s[1][1], s[2][1], s[3][1], t);
      if (prev) total += Math.hypot(x - prev.x, y - prev.y);
      pts.push({ x, y, d: total });
      prev = { x, y };
    }
  });
  return { pts, total };
})();

function pointAt(p: number) {
  const target = p * LUT.total;
  const arr = LUT.pts;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].d >= target) {
      const a = arr[i - 1];
      const b = arr[i];
      const f = b.d === a.d ? 0 : (target - a.d) / (b.d - a.d);
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
    }
  }
  const last = arr[arr.length - 1];
  return { x: last.x, y: last.y };
}

export function LiveWalk({
  sitter,
  form,
  booking,
  back,
  restart,
}: {
  sitter: Sitter;
  form: FlowForm;
  booking: Booking;
  back: () => void;
  restart: () => void;
}) {
  const [pct, setPct] = React.useState(0);
  const [map, setMap] = React.useState({ w: VB_W, h: VB_H });
  const first = sitter.name.split(' ')[0];
  const dur = booking.duration || 30;

  React.useEffect(() => {
    const DURATION = 22000;
    const t0 = Date.now();
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - t0) / DURATION);
      setPct(p);
      if (p >= 1) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, []);

  const onMap = (e: LayoutChangeEvent) => setMap({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });

  // preserveAspectRatio="xMidYMid meet" mapping
  const sc = Math.min(map.w / VB_W, map.h / VB_H);
  const offX = (map.w - VB_W * sc) / 2;
  const offY = (map.h - VB_H * sc) / 2;
  const pt = pointAt(pct);
  const markerX = offX + pt.x * sc;
  const markerY = offY + pt.y * sc;

  const mins = Math.round(pct * dur);
  const dist = (pct * 1.6).toFixed(1);
  const photos = pct >= 1 ? 3 : pct > 0.7 ? 3 : pct > 0.42 ? 2 : pct > 0.16 ? 1 : 0;
  const showPhoto = pct > 0.16 && pct < 1;
  const done = pct >= 1;

  return (
    <View style={styles.screen}>
      <View style={styles.map} onLayout={onMap}>
        <Svg width="100%" height="100%" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet" style={StyleSheet.absoluteFill}>
          <Path d={ROUTE} fill="none" stroke="#E0D4BE" strokeWidth={7} strokeLinecap="round" />
          <Path
            d={ROUTE}
            fill="none"
            stroke={colors.terracotta}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={LUT.total}
            strokeDashoffset={LUT.total * (1 - pct)}
          />
          <Circle cx={58} cy={116} r={6} fill="#fff" stroke={colors.sage} strokeWidth={3} />
          <Circle cx={100} cy={350} r={12} fill={colors.sage} stroke="#fff" strokeWidth={3} />
        </Svg>

        <View style={[styles.marker, { left: markerX, top: markerY }]} pointerEvents="none">
          <View style={styles.markerRing} />
          <View style={styles.markerDot}>
            <Paw size={18} color={colors.white} />
          </View>
        </View>

        <View style={styles.topbar}>
          <View style={styles.liveDot} />
          <View style={{ flex: 1 }}>
            <Text style={styles.wtTitle}>{done ? 'Walk finished' : `${first} is walking ${form.name}`}</Text>
            <Text style={styles.wtSub}>{done ? 'Heading home now' : 'Live · near Maple Park'}</Text>
          </View>
          <Text style={styles.timer}>{mins} min</Text>
        </View>
      </View>

      <View style={styles.sheet}>
        <View style={styles.grip} />
        {done ? (
          <View style={{ alignItems: 'center', paddingTop: 4 }}>
            <View style={styles.doneBadge}>
              <Check size={32} strokeWidth={2.5} color={colors.white} />
            </View>
            <Text style={styles.doneH}>Walk complete!</Text>
            <Text style={styles.doneP}>
              {form.name} had a great time with {first}.
            </Text>
            <View style={styles.stats}>
              <Stat big={`${dur}`} sub="MINUTES" />
              <Stat big="1.6" sub="KM" border />
              <Stat big="3" sub="PHOTOS" border />
            </View>
            <PrimaryButton title="Back to home" onPress={restart} />
          </View>
        ) : (
          <>
            <View style={styles.sitterLine}>
              <ImageSlot size={42} uri={sitter.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.wsTxt}>{sitter.name}</Text>
                <Text style={styles.wsSub}>
                  On a {dur}-min walk with {form.name}
                </Text>
              </View>
              <Verified size={18} color={colors.sage} />
            </View>
            <View style={styles.stats}>
              <Stat big={`${mins}`} sub="MIN" />
              <Stat big={dist} sub="KM" border />
              <Stat big={`${photos}`} sub="PHOTOS" border />
            </View>
            {showPhoto && (
              <View style={styles.photo}>
                <ImageSlot size={58} round={false} radius={12} uri={WALK_PHOTO} />
                <View style={{ flex: 1 }}>
                  <View style={styles.wpCapRow}>
                    <Paw size={13} color={colors.terracotta} />
                    <Text style={styles.wpCap}>{form.name} is having the best time!</Text>
                  </View>
                  <Text style={styles.wpTime}>Just now · from {first}</Text>
                </View>
              </View>
            )}
            <View style={styles.actions}>
              <View style={{ flex: 1 }}>
                <PrimaryButton title="Message" sage onPress={() => {}} />
              </View>
              <View style={{ flex: 1 }}>
                <PrimaryButton title="Hide" onPress={back} />
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

function Stat({ big, sub, border }: { big: string; sub: string; border?: boolean }) {
  return (
    <View style={[styles.stat, border && styles.statBorder]}>
      <Text style={styles.statBig}>{big}</Text>
      <Text style={styles.statSub}>{sub}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  map: { flex: 1, overflow: 'hidden', backgroundColor: '#E9E4D6' },
  marker: { position: 'absolute', width: 0, height: 0, zIndex: 6 },
  markerDot: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    transform: [{ translateX: -19 }, { translateY: -19 }],
    ...shadows.btn,
  },
  markerRing: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.terracotta,
    opacity: 0.4,
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  topbar: {
    position: 'absolute',
    top: 14,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    backgroundColor: colors.card,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 14,
    ...shadows.card,
  },
  liveDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.live },
  wtTitle: { fontFamily: fonts.body800, fontSize: 13.5, color: colors.ink },
  wtSub: { fontFamily: fonts.body700, fontSize: 11.5, color: colors.muted, marginTop: 1 },
  timer: { fontFamily: fonts.display700, fontSize: 18, color: colors.terracotta600 },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 20,
  },
  grip: { width: 42, height: 5, borderRadius: 3, backgroundColor: colors.cream300, alignSelf: 'center', marginBottom: 14 },
  sitterLine: { flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 4 },
  wsTxt: { fontFamily: fonts.body800, fontSize: 14.5, color: colors.ink },
  wsSub: { fontFamily: fonts.body600, fontSize: 12, color: colors.inkSoft },
  stats: { flexDirection: 'row', marginVertical: 12, width: '100%' },
  stat: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1.5, borderLeftColor: colors.line },
  statBig: { fontFamily: fonts.display700, fontSize: 19, color: colors.ink },
  statSub: { fontFamily: fonts.body800, fontSize: 10.5, color: colors.muted, marginTop: 1 },
  photo: { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: colors.cream, borderWidth: 1.5, borderColor: colors.line, borderRadius: 16, padding: 10, marginBottom: 14 },
  wpCapRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  wpCap: { fontFamily: fonts.body800, fontSize: 13, color: colors.ink, flex: 1 },
  wpTime: { fontFamily: fonts.body700, fontSize: 11.5, color: colors.muted, marginTop: 2 },
  actions: { flexDirection: 'row', gap: 10 },
  doneBadge: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.sage, alignItems: 'center', justifyContent: 'center', marginBottom: 10, ...shadows.soft },
  doneH: { fontFamily: fonts.display800, fontSize: 21, color: colors.ink, marginBottom: 4 },
  doneP: { fontFamily: fonts.body600, fontSize: 13.5, color: colors.inkSoft, marginBottom: 14, textAlign: 'center' },
});
