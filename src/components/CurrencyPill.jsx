import { Pressable, StyleSheet, Text } from "react-native";
import { colors, spacing, fonts, radius } from "../theme/theme";
//
// En rundad knapp som visar en valutakod.
//
export default function CurrencyPill({ code, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.pill}>
      <Text style={styles.label}>{code}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  pill: {
    backgroundColor: colors.accentLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.button,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: colors.accent,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
});
