import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { colors, spacing } from "../theme/theme";

export default function Screen({ children }) {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      {children}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
});
