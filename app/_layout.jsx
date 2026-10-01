import { Tabs } from "expo-router";
import {
  useFonts,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { colors, fonts } from "../src/theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
SplashScreen.preventAutoHideAsync(); // Gömmer startskärmen automatiskt så fort appen har startat
export default function Layout() {
  const [loaded, error] = useFonts({ // laddar de fyra Manrope-vikterna
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
  useEffect(() => { // körs varje gång när loaded eller error ändras och då gömmer startskärmen.
    if (loaded || error) { // om typsnittet inte kan laddas så visas appen med standardtypsnitt
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.line,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.medium,
        },
      }}
    >
      <Tabs.Screen
        name="index" // Måste matcha filnamnet
        options={{
          title: "Omvandla",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rates" // Måste matcha filnamnet
        options={{
          title: "Kurser",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
