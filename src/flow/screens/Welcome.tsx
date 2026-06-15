import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HERO_DOG } from '../data';
import { Paw } from '../icons';
import { colors, fonts, type } from '../theme';
import { ImageSlot, PrimaryButton } from '../ui';

export function Welcome({ go }: { go: () => void }) {
  return (
    <View style={styles.screen}>
      {/* decorative paw field */}
      <Paw size={18} color={colors.terracotta} />
      <View style={styles.hero}>
        <View style={[styles.blob, styles.blobSage]} />
        <View style={[styles.blob, styles.blobCoral]} />
        <View style={styles.heroImg}>
          <ImageSlot size={188} uri={HERO_DOG} />
        </View>
        <View style={[styles.heroPaw, { top: 24, right: 40, transform: [{ rotate: '18deg' }] }]}>
          <Paw size={26} color={colors.sage600} />
        </View>
        <View style={[styles.heroPaw, { bottom: 34, left: 42, transform: [{ rotate: '-22deg' }] }]}>
          <Paw size={20} color={colors.terracotta} />
        </View>
      </View>
      <View style={styles.copy}>
        <Text style={type.brandKicker}>SIMON'S</Text>
        <Text style={type.brandTitle}>Dog Sitting</Text>
        <Text style={styles.tag}>Trusted dog sitters, just around the corner.</Text>
      </View>
      <View style={styles.foot}>
        <PrimaryButton title="Get started" onPress={go} />
        <Text style={styles.mutedLine}>
          Already have an account? <Text style={styles.link}>Log in</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 26, paddingTop: 14, paddingBottom: 26 },
  hero: { position: 'relative', height: 250, alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  blob: { position: 'absolute', borderRadius: 999 },
  blobSage: { width: 210, height: 210, backgroundColor: colors.sage100, top: 18, left: 30 },
  blobCoral: { width: 140, height: 140, backgroundColor: colors.coral100, bottom: 8, right: 34 },
  heroImg: { zIndex: 2 },
  heroPaw: { position: 'absolute', zIndex: 3 },
  copy: { alignItems: 'center', marginTop: 8 },
  tag: { ...type.screenSub, textAlign: 'center', fontSize: 16.5, lineHeight: 25, marginTop: 16, maxWidth: 250 },
  foot: { marginTop: 'auto' },
  mutedLine: { textAlign: 'center', color: colors.muted, fontSize: 13.5, marginTop: 14, fontFamily: fonts.body600 },
  link: { color: colors.terracotta600, fontFamily: fonts.body800 },
});
