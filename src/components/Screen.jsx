import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { colors, spacing } from "../theme/theme";

export default function Screen({ children }) {
  return ( // SafeAreaView lägger automatiskt till marginal där telefonens skärm hindrar.
    // Bara i toppen för längst ner sitter flikfältet och det skyddar redan mot hemindikatorn. 
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
