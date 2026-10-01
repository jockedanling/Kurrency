import { Pressable, StyleSheet, View, Text } from "react-native";
import { colors, spacing, fonts, radius } from "../theme/theme";
import  Ionicons  from "@expo/vector-icons/Ionicons";
//
// Visas när ett API-anrop misslyckas. Ett felmeddelande med ikon, rubrik, felmeddelande och en button "Försök igen".
//
export default function ErrorView({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons
          name="cloud-offline-outline"
          size={32}
          color={colors.accent}
        />
      </View>
      <Text style={styles.title}>Något gick fel</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable onPress={onRetry} style={styles.button}>
        <Text style={styles.buttonLabel}>Försök igen</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  message: {
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.button,
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    justifyContent: "center",
  },
  buttonLabel: {
    color: colors.onAccent,
    fontFamily: fonts.bold,
  },
});
