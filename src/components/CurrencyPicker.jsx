import { Modal, StyleSheet, Text, View, Pressable } from "react-native";
import { colors, spacing, fonts, radius } from "../theme/theme";
export default function CurrencyPicker({ visible, onSelect, onClose }) {
  return (
    <Modal
      visible={visible} // true = visas, false = dold
      animationType="slide" // glider upp underifrån
      presentationStyle="pageSheet" // IOS-stil: kort som täcker det mesta av skärmen
      onRequestClose={onClose} // körs när användaren drar ner kortet
    >
      <View style={styles.view}>
        <Text style={styles.title}>Välj valuta</Text>
        <Pressable style={styles.button} onPress={() => onSelect("EUR")}>
          <Text style={styles.title}>Välj EUR</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.surface,
    borderRadius: radius.button,
    padding: spacing.lg,
  },
});
