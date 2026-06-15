import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DEFAULT_DOG_PHOTO, FlowForm, TAGS } from '../data';
import { Camera, Check } from '../icons';
import { colors, fonts, shadows, type } from '../theme';
import { ImageSlot, NavChrome, PrimaryButton } from '../ui';

const SIZES: FlowForm['size'][] = ['Small', 'Medium', 'Large'];

export function Dog({
  form,
  setForm,
  go,
  back,
}: {
  form: FlowForm;
  setForm: React.Dispatch<React.SetStateAction<FlowForm>>;
  go: () => void;
  back: () => void;
}) {
  const set = <K extends keyof FlowForm>(k: K, v: FlowForm[K]) => setForm((f) => ({ ...f, [k]: v }));
  const toggleTag = (t: string) =>
    setForm((f) => ({ ...f, tags: f.tags.includes(t) ? f.tags.filter((x) => x !== t) : [...f.tags, t] }));
  const [focus, setFocus] = React.useState<string | null>(null);

  const pickPhoto = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!res.canceled && res.assets[0]) set('photoUri', res.assets[0].uri);
  };

  return (
    <View style={styles.screen}>
      <NavChrome active={2} onBack={back} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.flow} keyboardShouldPersistTaps="handled">
        <Text style={[type.screenTitleSm, { marginTop: 6, marginBottom: 12 }]}>Tell us about{'\n'}your dog</Text>

        <View style={styles.photoUp}>
          <Pressable onPress={pickPhoto} style={({ pressed }) => [styles.photoRing, pressed && { transform: [{ scale: 0.97 }] }]}>
            <ImageSlot size={78} uri={form.photoUri ?? DEFAULT_DOG_PHOTO} />
            <View style={styles.photoCam}>
              <Camera size={15} color={colors.white} />
            </View>
          </Pressable>
        </View>

        <Field label="Name">
          <TextInput
            style={styles.input}
            value={form.name}
            placeholder="Your dog's name"
            placeholderTextColor={colors.muted}
            onChangeText={(v) => set('name', v)}
            onFocus={() => setFocus('name')}
            onBlur={() => setFocus(null)}
          />
        </Field>
        <Field label="Breed">
          <TextInput
            style={styles.input}
            value={form.breed}
            placeholder="e.g. Golden Retriever"
            placeholderTextColor={colors.muted}
            onChangeText={(v) => set('breed', v)}
            onFocus={() => setFocus('breed')}
            onBlur={() => setFocus(null)}
          />
        </Field>

        <Field label="Size">
          <View style={styles.pillRow}>
            {SIZES.map((s) => {
              const active = form.size === s;
              return (
                <Pressable
                  key={s}
                  onPress={() => set('size', s)}
                  style={({ pressed }) => [styles.sizePill, shadows.soft, active && styles.sizePillActive, pressed && { transform: [{ scale: 0.94 }] }]}>
                  <Text style={[styles.sizePillText, active && styles.sizePillTextActive]}>{s}</Text>
                </Pressable>
              );
            })}
          </View>
        </Field>

        <Field label="Personality">
          <View style={styles.chipWrap}>
            {TAGS.map((t) => {
              const on = form.tags.includes(t);
              return (
                <Pressable
                  key={t}
                  onPress={() => toggleTag(t)}
                  style={({ pressed }) => [styles.chip, shadows.soft, on && styles.chipActive, pressed && { transform: [{ scale: 0.94 }] }]}>
                  {on && (
                    <View style={styles.chipDot}>
                      <Check size={11} strokeWidth={3} color={colors.white} />
                    </View>
                  )}
                  <Text style={[styles.chipText, on && styles.chipTextActive]}>{t}</Text>
                </Pressable>
              );
            })}
          </View>
        </Field>

        <View style={styles.foot}>
          <PrimaryButton title="Continue" onPress={go} disabled={!form.name.trim()} />
        </View>
      </ScrollView>
    </View>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  flow: { paddingHorizontal: 22, paddingBottom: 28 },
  photoUp: { alignItems: 'center', marginBottom: 22 },
  photoRing: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colors.cream200,
    borderWidth: 2.5,
    borderColor: colors.cream300,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCam: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.cream,
    ...shadows.soft,
  },
  fieldLabel: { fontFamily: fonts.body800, fontSize: 13, color: colors.inkSoft, marginBottom: 7 },
  input: {
    height: 48,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 14,
    paddingHorizontal: 15,
    fontFamily: fonts.body700,
    fontSize: 15.5,
    color: colors.ink,
    ...shadows.soft,
  },
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
  sizePillActive: { backgroundColor: colors.terracotta, borderColor: colors.terracotta },
  sizePillText: { fontFamily: fonts.body800, fontSize: 14.5, color: colors.inkSoft },
  sizePillTextActive: { color: colors.white },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 38,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.line,
  },
  chipActive: { backgroundColor: colors.sage100, borderColor: colors.sage },
  chipDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.sage, alignItems: 'center', justifyContent: 'center' },
  chipText: { fontFamily: fonts.body700, fontSize: 13.5, color: colors.inkSoft },
  chipTextActive: { color: colors.sage600 },
  foot: { marginTop: 8 },
});
