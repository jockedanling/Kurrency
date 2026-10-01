import { Pressable, Text, StyleSheet } from "react-native";
import { colors, radius, fonts } from "../theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
//
// En enskild knapp på sifferknappsatsen. Visar en text och anropar en funktion när man trycker.
// Numpad.jsx bestämmer vad som ska hända som ska hända vid tryck.
// Key sköter bara utseendet.
//
export default function Key({
  label,
  onPress,
  muted,
  icon,
  accessibilityLabel,
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      style={[styles.key, muted && styles.keyMuted]}
    >
      {icon ? (
        <Ionicons name={icon} size={28} color={colors.text} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  key: {
    flex: 1,
    minHeight: 56,
    backgroundColor: colors.surface,
    borderRadius: radius.button,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 28,
    color: colors.text,
    fontFamily: fonts.semiBold,
  },
  keyMuted: {
    backgroundColor: colors.surfaceMuted,
  },
});
