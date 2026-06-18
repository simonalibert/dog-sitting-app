import React from 'react';
import { Image, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { Sitter } from '../data';
import { Paw, Search, Star, Verified } from '../icons';
import { colors, fonts, shadows } from '../theme';
import { FloatingBack, ImageSlot, PrimaryButton } from '../ui';
import { getDiscoverMapUrl, isMapboxConfigured } from '../mapbox';

const DESIGN_W = 322; // map coordinate space from proto.jsx

export function Discover({
  sitters,
  sitter,
  setSitter,
  go,
  back,
}: {
  sitters: Sitter[];
  sitter: Sitter;
  setSitter: (s: Sitter) => void;
  go: () => void;
  back: () => void;
}) {
  const [s, setS] = React.useState(1); // scale factor map width / 322
  const [mapSize, setMapSize] = React.useState({ width: 0, height: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    const height = e.nativeEvent.layout.height;
    setS(width / DESIGN_W);
    setMapSize({ width, height });
  };
  const first = sitter.name.split(' ')[0];

  // Generate Mapbox URL when size is known
  const mapboxUrl = React.useMemo(() => {
    if (!isMapboxConfigured || mapSize.width === 0 || mapSize.height === 0) return null;
    return getDiscoverMapUrl(mapSize.width, mapSize.height, sitters);
  }, [mapSize, sitters]);

  // Use Mapbox image as background if configured and URL is available
  const useMapbox = isMapboxConfigured && mapboxUrl !== null;

  return (
    <View style={styles.screen}>
      <View style={styles.map} onLayout={onLayout}>
        {/* Mapbox Static Image Background */}
        {useMapbox && (
          <Image
            source={{ uri: mapboxUrl! }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        )}

        {/* Fallback: Original stylized SVG map */}
        {!useMapbox && (
          <>
            <View style={[styles.street, { top: 70 * s, left: -40 * s, width: 420 * s, transform: [{ rotate: '-8deg' }] }]} />
            <View style={[styles.street, { top: 200 * s, left: -40 * s, width: 420 * s, transform: [{ rotate: '6deg' }] }]} />
            <View style={[styles.streetV, { left: 110 * s, top: -40 * s, height: 520 * s, transform: [{ rotate: '4deg' }] }]} />
            <View style={[styles.streetV, { left: 240 * s, top: -40 * s, height: 520 * s, transform: [{ rotate: '-3deg' }] }]} />
            <View style={[styles.park, { left: 150 * s, top: 96 * s, width: 70 * s, height: 70 * s }]} />
            <View style={[styles.park, { left: 24 * s, top: 150 * s, width: 60 * s, height: 46 * s }]} />
            <View style={[styles.water, { left: 200 * s, top: 220 * s, width: 130 * s, height: 150 * s }]} />
          </>
        )}

        <FloatingBack onPress={back} style={{ top: 58, left: 16 }} />

        {sitters.map((p) => {
          const active = p.id === sitter.id;
          const big = !!p.big || active;
          const dim = big ? 42 : 32;
          return (
            <Pressable
              key={p.id}
              onPress={() => setSitter(p)}
              style={({ pressed }) => [
                styles.pin,
                { left: p.x * s, top: p.y * s, zIndex: active ? 9 : 5, transform: [{ translateX: -dim / 2 }, { translateY: -dim }, { scale: pressed ? 0.9 : 1 }] },
              ]}>
              <View
                style={[
                  styles.pinDot,
                  { width: dim, height: dim, borderBottomLeftRadius: 8 },
                  big && styles.pinDotBig,
                ]}>
                <View style={{ transform: [{ rotate: '45deg' }] }}>
                  <Paw size={big ? 16 : 12} color={colors.white} />
                </View>
              </View>
            </Pressable>
          );
        })}

        <View style={styles.searchBar}>
          <Search size={17} color={colors.terracotta600} />
          <Text style={styles.searchText}>Sitters near Maple Street</Text>
        </View>
      </View>

      <View style={styles.sheet}>
        <View style={styles.grip} />
        <Text style={styles.count}>{sitters.length} sitters available nearby</Text>
        <View style={styles.sitterCard}>
          <ImageSlot size={62} uri={sitter.avatar} />
          <View style={{ flex: 1, minWidth: 0 }}>
            <View style={styles.nameRow}>
              <Text style={styles.sitterName}>{sitter.name}</Text>
              {sitter.verified && <Verified size={16} color={colors.sage} />}
            </View>
            <View style={styles.metaRow}>
              <Star size={13} fill={colors.star} />
              <Text style={styles.metaBold}>{sitter.rating}</Text>
              <Text style={styles.metaDim}>({sitter.reviews})</Text>
              <View style={styles.dotSep} />
              <Text style={styles.meta}>{sitter.dist} away</Text>
            </View>
            <Text style={styles.price}>
              <Text style={styles.priceBold}>${sitter.price}</Text>
              <Text style={styles.metaDim}> / walk</Text>
            </Text>
          </View>
        </View>
        <PrimaryButton title={`View ${first}'s profile`} onPress={go} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  map: { flex: 1, overflow: 'hidden', backgroundColor: '#E9E4D6' },
  street: { position: 'absolute', height: 13, backgroundColor: colors.cream, borderRadius: 8 },
  streetV: { position: 'absolute', width: 13, backgroundColor: colors.cream, borderRadius: 8 },
  park: { position: 'absolute', backgroundColor: colors.sage100, borderWidth: 2, borderColor: '#D8E0CB', borderRadius: 16 },
  water: { position: 'absolute', backgroundColor: '#D9E4E6', borderRadius: 50, opacity: 0.8 },
  pin: { position: 'absolute' },
  pinDot: {
    borderRadius: 50,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-45deg' }],
    borderWidth: 2.5,
    borderColor: colors.white,
    ...shadows.soft,
  },
  pinDotBig: { backgroundColor: colors.terracotta },
  searchBar: {
    position: 'absolute',
    top: 58,
    left: 68,
    right: 16,
    height: 42,
    backgroundColor: colors.card,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 15,
    ...shadows.card,
  },
  searchText: { fontFamily: fonts.body700, fontSize: 14, color: colors.inkSoft },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 22,
  },
  grip: { width: 42, height: 5, borderRadius: 3, backgroundColor: colors.cream300, alignSelf: 'center', marginBottom: 14 },
  count: { fontFamily: fonts.body800, fontSize: 13, color: colors.muted, marginBottom: 12 },
  sitterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 13,
    backgroundColor: colors.cream,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: colors.terracotta,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sitterName: { fontFamily: fonts.display700, fontSize: 17.5, color: colors.ink },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginVertical: 3 },
  meta: { fontFamily: fonts.body600, fontSize: 13, color: colors.inkSoft },
  metaBold: { fontFamily: fonts.body800, fontSize: 13, color: colors.ink },
  metaDim: { fontFamily: fonts.body600, fontSize: 13, color: colors.muted },
  dotSep: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.muted, marginHorizontal: 3 },
  price: { fontFamily: fonts.body600, fontSize: 14 },
  priceBold: { fontFamily: fonts.display700, fontSize: 18, color: colors.terracotta600 },
});
