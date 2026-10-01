import { StyleSheet, View, Text } from "react-native";
import CurrencyButton from "./CurrencyButton";
import { colors, fonts, spacing } from "../theme/theme";

export default function AmountRow({ code, onPressCurrency, value, highlight }) {
  return (
    <View style={styles.row}>
      <CurrencyButton code={code} onPress={onPressCurrency} />
      <Text
        style={[styles.value, highlight && styles.valueHighlight]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 84,
  },
  value: {
    textAlign: "right",
    flex: 1,
    fontSize: 40,
    fontFamily: fonts.extraBold,
    color: colors.text,
    fontVariant: ["tabular-nums"],
    letterSpacing: -1,
  },
  valueHighlight: {
    color: colors.accent,
  },
});
