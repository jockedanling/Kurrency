import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Omvandla" }} />
      <Tabs.Screen name="rates" options={{ title: "Kurser" }} />
    </Tabs>
  );
}
