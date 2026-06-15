// Design tokens for Simon's Dog Sitting — ported 1:1 from styles.css :root
import { Platform, TextStyle, ViewStyle } from 'react-native';

export const colors = {
  terracotta: '#E07A5F',
  terracotta600: '#CC5F44',
  terracotta700: '#B14E36',
  coral: '#F4A98C',
  coral100: '#FBE6DB',
  sage: '#8FA77E',
  sage600: '#6E8A5E',
  sage100: '#E7EDDF',
  cream: '#FBF5EC',
  cream200: '#F4EBDC',
  cream300: '#EADFCD',
  card: '#FFFDF8',
  ink: '#463E37',
  inkSoft: '#6B6258',
  muted: '#998E82',
  line: '#ECE2D3',
  star: '#E8A33D',
  live: '#3FAE6A',
  white: '#FFFFFF',
} as const;

export const radii = { lg: 26, md: 18, sm: 13 } as const;

// Font families registered via @expo-google-fonts in App. Display = Baloo 2, body = Nunito.
export const fonts = {
  display500: 'Baloo2_500Medium',
  display600: 'Baloo2_600SemiBold',
  display700: 'Baloo2_700Bold',
  display800: 'Baloo2_800ExtraBold',
  body: 'Nunito_400Regular',
  body600: 'Nunito_600SemiBold',
  body700: 'Nunito_700Bold',
  body800: 'Nunito_800ExtraBold',
  bodyItalic: 'Nunito_600SemiBold_Italic',
} as const;

// CSS box-shadows approximated as RN shadow objects (iOS) + elevation (Android).
export const shadows: Record<'card' | 'soft' | 'btn', ViewStyle> = {
  card: Platform.select({
    ios: { shadowColor: 'rgb(120,80,50)', shadowOpacity: 0.28, shadowRadius: 16, shadowOffset: { width: 0, height: 10 } },
    default: { elevation: 8 },
  })!,
  soft: Platform.select({
    ios: { shadowColor: 'rgb(120,80,50)', shadowOpacity: 0.22, shadowRadius: 9, shadowOffset: { width: 0, height: 4 } },
    default: { elevation: 4 },
  })!,
  btn: Platform.select({
    ios: { shadowColor: 'rgb(204,95,68)', shadowOpacity: 0.65, shadowRadius: 12, shadowOffset: { width: 0, height: 10 } },
    default: { elevation: 8 },
  })!,
};

// Type ramp helper
export const type = {
  brandKicker: { fontFamily: fonts.display700, fontSize: 15, letterSpacing: 5, color: colors.terracotta } as TextStyle,
  brandTitle: { fontFamily: fonts.display800, fontSize: 42, color: colors.ink, letterSpacing: -0.5 } as TextStyle,
  screenTitle: { fontFamily: fonts.display700, fontSize: 30, color: colors.ink, letterSpacing: -0.2, lineHeight: 32 } as TextStyle,
  screenTitleSm: { fontFamily: fonts.display700, fontSize: 26, color: colors.ink, letterSpacing: -0.2, lineHeight: 28 } as TextStyle,
  screenSub: { fontFamily: fonts.body600, fontSize: 15, lineHeight: 22, color: colors.inkSoft } as TextStyle,
  sectionH: { fontFamily: fonts.display700, fontSize: 15.5, color: colors.ink } as TextStyle,
};
