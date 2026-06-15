import {
  Baloo2_500Medium,
  Baloo2_600SemiBold,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from '@expo-google-fonts/baloo-2';
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/nunito';
import React from 'react';
import { ActivityIndicator, Animated, Easing, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Booking, FlowForm, SITTERS, Sitter } from './data';
import { Booking as BookingScreen } from './screens/Booking';
import { Chat } from './screens/Chat';
import { Choice } from './screens/Choice';
import { DateTime } from './screens/DateTime';
import { Discover } from './screens/Discover';
import { Dog } from './screens/Dog';
import { LiveWalk } from './screens/LiveWalk';
import { SitterProfile } from './screens/SitterProfile';
import { Success } from './screens/Success';
import { Welcome } from './screens/Welcome';
import { colors } from './theme';

const MAX = 8;
type Dir = 'next' | 'back' | null;

export default function Flow() {
  const [fontsLoaded] = useFonts({
    Baloo2_500Medium,
    Baloo2_600SemiBold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  const [step, setStep] = React.useState(0);
  const [dir, setDir] = React.useState<Dir>(null);
  const [role, setRole] = React.useState<'owner' | 'sitter'>('owner');
  const [form, setForm] = React.useState<FlowForm>({
    name: 'Biscuit',
    breed: 'Golden Retriever',
    size: 'Medium',
    tags: ['Playful', 'Good with other dogs'],
    photoUri: null,
  });
  const [sitter, setSitter] = React.useState<Sitter>(SITTERS[0]);
  const [booking, setBooking] = React.useState<Booking>({
    dow: 'Sat',
    day: 14,
    time: '2:00 PM',
    duration: 30,
    basePrice: SITTERS[0].price,
  });

  // keep basePrice in sync with the chosen sitter
  React.useEffect(() => {
    setBooking((b) => ({ ...b, basePrice: sitter.price }));
  }, [sitter]);

  const go = (n: number) => {
    const clamped = Math.max(0, Math.min(MAX, n));
    setDir(n > step ? 'next' : 'back');
    setStep(clamped);
  };
  const next = () => go(step + 1);
  const back = () => go(step - 1);
  const restart = () => {
    setSitter(SITTERS[0]);
    go(0);
  };

  // chat modal overlay (slides up over the live walk, which keeps running underneath)
  const { width, height } = useWindowDimensions();
  const [chatMounted, setChatMounted] = React.useState(false);
  const chatAnim = React.useRef(new Animated.Value(0)).current;
  const openChat = () => {
    setChatMounted(true);
    Animated.timing(chatAnim, { toValue: 1, duration: 300, easing: Easing.bezier(0.22, 0.61, 0.36, 1), useNativeDriver: true }).start();
  };
  const closeChat = () => {
    Animated.timing(chatAnim, { toValue: 0, duration: 260, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(({ finished }) => {
      if (finished) setChatMounted(false);
    });
  };

  // two-layer push transition: incoming slides in, outgoing parallaxes out + fades.
  const anim = React.useRef(new Animated.Value(1)).current;
  const prevStepRef = React.useRef(step);
  const [outgoing, setOutgoing] = React.useState<{ step: number; dir: Exclude<Dir, null> } | null>(null);

  React.useEffect(() => {
    const from = prevStepRef.current;
    prevStepRef.current = step;
    if (dir === null || from === step) return;
    setOutgoing({ step: from, dir });
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 340,
      easing: Easing.bezier(0.22, 0.61, 0.36, 1),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setOutgoing(null);
    });
  }, [step]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.terracotta} />
      </View>
    );
  }

  const fromX = dir === 'next' ? width : dir === 'back' ? -width : 0;
  const inTranslate = anim.interpolate({ inputRange: [0, 1], outputRange: [fromX, 0] });
  const inOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.65, 1] });
  const outTo = outgoing?.dir === 'next' ? -width * 0.28 : width * 0.28;
  const outTranslate = anim.interpolate({ inputRange: [0, 1], outputRange: [0, outTo] });
  const outOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  const screens: Record<number, React.ReactNode> = {
    0: <Welcome go={next} />,
    1: <Choice role={role} setRole={setRole} go={next} back={back} />,
    2: <Dog form={form} setForm={setForm} go={next} back={back} />,
    3: <Discover sitter={sitter} setSitter={setSitter} go={next} back={back} />,
    4: <SitterProfile sitter={sitter} form={form} go={next} back={back} />,
    5: <DateTime booking={booking} setBooking={setBooking} go={next} back={back} />,
    6: <BookingScreen form={form} sitter={sitter} booking={booking} go={next} back={back} />,
    7: <Success form={form} sitter={sitter} booking={booking} track={() => go(8)} restart={restart} />,
    8: <LiveWalk sitter={sitter} form={form} booking={booking} back={() => go(7)} restart={restart} onMessage={openChat} />,
  };

  const chatTranslateY = chatAnim.interpolate({ inputRange: [0, 1], outputRange: [height, 0] });

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {outgoing && (
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.stage, { transform: [{ translateX: outTranslate }], opacity: outOpacity }]}>
          {screens[outgoing.step]}
        </Animated.View>
      )}
      <Animated.View key={step} style={[styles.stage, { transform: [{ translateX: inTranslate }], opacity: inOpacity }]}>
        {screens[step]}
      </Animated.View>
      {chatMounted && (
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateY: chatTranslateY }] }]}>
          <Chat sitter={sitter} form={form} onClose={closeChat} />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  stage: { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cream },
});
