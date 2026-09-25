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
SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [loaded, error] = useFonts({
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Omvandla" }} />
      <Tabs.Screen name="rates" options={{ title: "Kurser" }} />
    </Tabs>
  );
}
