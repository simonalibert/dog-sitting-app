// Shared UI primitives matching styles.css
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Back, Paw, Star } from './icons';
import { colors, fonts, radii, shadows } from './theme';

/** Primary terracotta CTA (.btn .btn-primary .btn-lg). `right` pushes a price tag to the far end. */
export function PrimaryButton({
  title,
  onPress,
  disabled,
  right,
  sage,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  right?: React.ReactNode;
  sage?: boolean;
}) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.btnLg,
        sage ? styles.btnSage : styles.btnPrimary,
        !sage && shadows.btn,
        right ? styles.btnSplit : null,
        disabled && styles.btnDisabled,
        pressed && !disabled && styles.btnPressed,
      ]}>
      <Text style={[styles.btnText, sage && styles.btnTextSage]}>{title}</Text>
      {right}
    </Pressable>
  );
}

export function PriceTag({ children }: { children: React.ReactNode }) {
  return <Text style={styles.priceTag}>{children}</Text>;
}

/** Circular/rounded image placeholder well (<image-slot>). */
export function ImageSlot({
  size,
  round = true,
  radius = 12,
  border,
  initial,
  uri,
}: {
  size: number;
  round?: boolean;
  radius?: number;
  border?: number;
  initial?: string;
  uri?: string | null;
}) {
  const br = round ? size / 2 : radius;
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: br,
          backgroundColor: colors.cream200,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        border ? { borderWidth: border, borderColor: colors.cream } : null,
      ]}>
      {uri ? (
        <Image source={{ uri }} style={{ width: '100%', height: '100%', borderRadius: br }} resizeMode="cover" />
      ) : initial ? (
        <Text style={{ fontFamily: fonts.display700, fontSize: size * 0.38, color: colors.terracotta600 }}>{initial}</Text>
      ) : (
        <Paw size={size * 0.42} color={colors.cream300} />
      )}
    </View>
  );
}

/** Top nav: back button + 4-segment progress bar. */
export function NavChrome({ active, onBack }: { active: number; onBack: () => void }) {
  return (
    <View style={styles.navRow}>
      <Pressable onPress={onBack} style={({ pressed }) => [styles.navBack, pressed && { transform: [{ scale: 0.94 }] }]}>
        <Back />
      </Pressable>
      <View style={styles.stepbar}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={[styles.step, i <= active && styles.stepOn]} />
        ))}
      </View>
      <View style={{ width: 28 }} />
    </View>
  );
}

export function Stars({ n = 5, size = 12 }: { n?: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 1 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} fill={i < n ? colors.star : colors.cream300} />
      ))}
    </View>
  );
}

/** Floating rounded-square back button used over the map / cover. */
export function FloatingBack({ onPress, style }: { onPress: () => void; style?: ViewStyle }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.mapBack, shadows.card, style, pressed && { transform: [{ scale: 0.94 }] }]}>
      <Back />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnLg: {
    width: '100%',
    height: 54,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnSplit: { justifyContent: 'space-between', paddingHorizontal: 22 },
  btnPrimary: { backgroundColor: colors.terracotta },
  btnSage: { backgroundColor: colors.sage100 },
  btnDisabled: { opacity: 0.5 },
  btnPressed: { transform: [{ scale: 0.97 }] },
  btnText: { fontFamily: fonts.body800, fontSize: 16.5, color: colors.white },
  btnTextSage: { color: colors.sage600 },
  priceTag: { fontFamily: fonts.display700, fontSize: 16.5, color: colors.white },
  navRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 22, paddingTop: 6, paddingBottom: 6 },
  navBack: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  stepbar: { flexDirection: 'row', gap: 6, flex: 1 },
  step: { height: 6, borderRadius: 3, flex: 1, backgroundColor: colors.cream300 },
  stepOn: { backgroundColor: colors.terracotta },
  mapBack: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
});
