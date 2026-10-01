import { Pressable, Text, StyleSheet } from "react-native";
import { colors, radius, fonts } from "../theme/theme";
//
// En enskild knapp på sifferknappsatsen. Visar en text och anropar en funktion när man trycker.
// Numpad.jsx bestämmer vad som ska hända som ska hända vid tryck.
// Key sköter bara utseendet.
//
export default function Key({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.key}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  key: {
    width: "31%",
    height: 64,
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
});
