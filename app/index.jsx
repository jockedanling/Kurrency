import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, spacing, radius } from "../src/theme/theme";
import Screen from "../src/components/Screen";
import { useEffect, useState } from "react";
import NumPad from "../src/components/NumPad";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getRate } from "../src/api/frankfurter";
import { convert } from "../src/utils/convert";
import ErrorView from "../src/components/ErrorView";
import CurrencyPicker from "../src/components/CurrencyPicker";
import AmountRow from "../src/components/AmountRow";

// Gör om ett tal till svensk text och ger 2 decimaler
const formatMoney = (value) =>
  new Intl.NumberFormat("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
// formatRate ger 4 decimaler som kurser ofta är små tal.
const formatRate = (value) =>
  new Intl.NumberFormat("sv-SE", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(value);

const Home = () => {
  const [amount, setAmount] = useState("0"); // beloppet som sträng för att ',' och avslutande noller syns
  const [from, setFrom] = useState("SEK"); // Valutakod som start
  const [to, setTo] = useState("EUR"); // Valutakoderna som start
  const [rate, setRate] = useState(null); // Kursen när den har hämtats
  const [loading, setLoading] = useState(true); // true medan vi väntar
  const [error, setError] = useState(null); // felmeddelandet om något gick fel
  const [pickerFor, setPickerFor] = useState(null);
  const numericAmount = Number(amount.replace(",", ".")); // byter svenskt komma mot punkt så att Number() förstår det.
  const result = rate === null ? null : convert(numericAmount, rate);

  // Hämtar kursen för 'from' till 'to' från API:et och sätter loading, rate och error
  // efter hur det gick.
  const fetchRate = async () => {
    setLoading(true);
    setRate(null);
    setError(null);
    try {
      const data = await getRate(from, to);
      setRate(data.rate);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Kör fetchrate när skärmen visas och varje gång 'from' eller 'to' ändras.
    fetchRate();
  }, [from, to]);

  const swap = () => {
    // Byter plats på valutorna
    setFrom(to);
    setTo(from);
  };

  // Tar emot valutan från väljaren och sparar den på rätt sida.
  // Är den samma som på andra sidan byts håll i stället.
  const selectCurrency = (code) => {
    if (pickerFor === "from" && code === to) {
      swap();
    } else if (pickerFor === "to" && code === from) {
      swap();
    } else if (pickerFor === "from") {
      setFrom(code);
    } else {
      setTo(code);
    }
    setPickerFor(null);
  };
  // Felhantering. Om hämtningen misslyckas ersätts hela skärmen med ErrorView.
  if (error) {
    return (
      <Screen>
        <ErrorView message={error} onRetry={fetchRate} />
      </Screen>
    );
  }
  return (
    <Screen>
      <Text style={styles.title}>Omvandla</Text>
      <View style={styles.card}>
        <AmountRow
          code={from}
          value={amount}
          onPressCurrency={() => setPickerFor("from")}
        />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Pressable
            onPress={swap}
            style={styles.swapButton}
            accessibilityLabel="Byt håll på valutorna"
          >
            <Ionicons name="swap-vertical" size={20} color={colors.accent} />
          </Pressable>
          <View style={styles.dividerLine} />
        </View>
        <AmountRow
          code={to}
          value={loading ? "..." : `${formatMoney(result)}`}
          onPressCurrency={() => setPickerFor("to")}
          highlight
        />
      </View>
      {rate !== null && (
        <Text
          style={styles.rateText}
        >{`1 ${from} = ${formatRate(rate)} ${to}`}</Text>
      )}
      <NumPad value={amount} onChange={setAmount} />
      <CurrencyPicker
        visible={pickerFor !== null}
        onSelect={selectCurrency}
        onClose={() => setPickerFor(null)}
      />
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 28,
    fontFamily: fonts.extraBold,
    letterSpacing: -1
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.card,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginVertical: spacing.md,
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.line,
  },
  rateText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.medium,
    marginBottom: spacing.lg,
    fontVariant: ["tabular-nums"],
  },
});
