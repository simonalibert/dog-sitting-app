import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Check, ChevronRight, Leash, Search } from '../icons';
import { colors, fonts, radii, shadows, type } from '../theme';
import { NavChrome, PrimaryButton } from '../ui';

type Role = 'owner' | 'sitter';

export function Choice({
  role,
  setRole,
  go,
  back,
}: {
  role: Role;
  setRole: (r: Role) => void;
  go: () => void;
  back: () => void;
}) {
  return (
    <View style={styles.screen}>
      <NavChrome active={1} onBack={back} />
      <View style={styles.flow}>
        <View style={{ marginTop: 14, marginBottom: 24 }}>
          <Text style={type.screenTitle}>How can we{'\n'}help today?</Text>
          <Text style={[type.screenSub, { marginTop: 10 }]}>Are you looking for a sitter, or do you want to become one?</Text>
        </View>
        <View style={{ gap: 14 }}>
          <ChoiceCard
            selected={role === 'owner'}
            onPress={() => setRole('owner')}
            icon={<Search size={26} color={colors.terracotta600} />}
            iconBg={colors.coral100}
            title="Pet Owner"
            desc="Find a loving sitter near you"
          />
          <ChoiceCard
            selected={role === 'sitter'}
            onPress={() => setRole('sitter')}
            icon={<Leash size={26} color={colors.sage600} />}
            iconBg={colors.sage100}
            title="Dog Sitter"
            desc="Earn money caring for dogs"
          />
        </View>
        <View style={styles.foot}>
          <PrimaryButton title="Continue" onPress={go} />
        </View>
      </View>
    </View>
  );
}

function ChoiceCard({
  selected,
  onPress,
  icon,
  iconBg,
  title,
  desc,
}: {
  selected: boolean;
  onPress: () => void;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, shadows.soft, selected && styles.cardSelected, pressed && { transform: [{ scale: 0.99 }] }]}>
      <View style={[styles.ico, { backgroundColor: iconBg }]}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{desc}</Text>
      </View>
      {selected ? (
        <View style={styles.check}>
          <Check size={15} strokeWidth={2.6} color={colors.white} />
        </View>
      ) : (
        <ChevronRight size={20} color={colors.muted} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  flow: { flex: 1, paddingHorizontal: 22, paddingBottom: 22 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radii.md,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  cardSelected: { borderColor: colors.terracotta },
  ico: { width: 52, height: 52, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontFamily: fonts.display700, fontSize: 19, color: colors.ink },
  cardDesc: { fontFamily: fonts.body600, fontSize: 13.5, color: colors.inkSoft, marginTop: 3 },
  check: { width: 26, height: 26, borderRadius: 13, backgroundColor: colors.terracotta, alignItems: 'center', justifyContent: 'center' },
  foot: { marginTop: 'auto', paddingTop: 18 },
});
