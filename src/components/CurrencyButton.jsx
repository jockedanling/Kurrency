import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, fonts } from "../theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
//
// Komponent för valutakod och valuta knappen.
//
export default function CurrencyButton({ code, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.button}
      accessibilityLabel={`Byt valuta, nu ${code}`}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{code.slice(0, 2)}</Text>
      </View>
      <Text style={styles.code}>{code}</Text>
      <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  code: {
    color: colors.text,
    fontSize: 18,
    fontFamily: fonts.extraBold,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: 44,
  },
  badge: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 12,
    fontFamily: fonts.extraBold,
    color: colors.textSecondary,
  },
});
