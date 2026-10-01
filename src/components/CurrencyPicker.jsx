import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { colors, spacing, fonts } from "../theme/theme";
import { getCurrencies } from "../api/frankfurter";
import { useEffect, useState } from "react";
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";

//
// Ett kort som glider upp med en lista över alla valutor från API:et.
//
export default function CurrencyPicker({ visible, onSelect, onClose }) {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrencies = async () => {
    // Hämtar valutorna en gång, när komponenten skapas.
    setLoading(true);
    setError(null);
    try {
      const data = await getCurrencies();
      setCurrencies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCurrencies();
  }, []); // [] betyder 'bara första gången'
  return (
    <Modal
      visible={visible} // true = visas, false = dold
      animationType="slide" // glider upp underifrån
      presentationStyle="pageSheet" // iOS-stil: kort som täcker det mesta av skärmen
      onRequestClose={onClose} // körs när användaren drar ner kortet
    >
      <View style={styles.view}>
        <Text style={styles.title}>Välj valuta</Text>
        {loading ? (
          <LoadingView />
        ) : error ? (
          <ErrorView message={error} onRetry={fetchCurrencies} />
        ) : (
          <FlatList
            data={currencies}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => onSelect(item.code)}
                style={({ pressed }) => [
                  styles.row,
                  pressed && styles.rowPressed,
                ]}
              >
                <Text style={styles.code}>{item.code}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </Pressable>
            )}
          />
        )}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  rowPressed: { opacity: 0.5 },
  code: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
    width: 48,
  },
  name: {
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
});
