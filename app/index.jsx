import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, spacing } from "../src/theme/theme";
import Screen from "../src/components/Screen";
import { useEffect, useState } from "react";
import NumPad from "../src/components/NumPad";
import CurrencyPill from "../src/components/CurrencyPill";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getRate } from "../src/api/frankfurter";
import { convert } from "../src/utils/convert";
import ErrorView from "../src/components/ErrorView";
import CurrencyPicker from "../src/components/CurrencyPicker";

const formatMoney = (value) => // Gör om ett tal till svensk text och ger 2 decimaler 
  new Intl.NumberFormat("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
const formatRate = (value) => // formatRate ger 4 decimaler som kurser ofta är små tal.
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
  useEffect(() => { // Kör fetchrate när skärmen visas och varje gång 'from' eller 'to' ändras.
    fetchRate();
  }, [from, to]);

  const swap = () => { // Byter plats på valutorna
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
  // Felhantering. Om hämtningen missluckas ersätts hela skärmen med ErrorView.
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
      <Text style={styles.amount}>{amount}</Text>
      <View style={styles.currencyRow}>
        <CurrencyPill code={from} onPress={() => setPickerFor("from")} />
        <Pressable onPress={swap} style={styles.swapButton}>
          <Ionicons name="swap-horizontal" size={24} color={colors.accent} />
        </Pressable>
        <CurrencyPill code={to} onPress={() => setPickerFor("to")} />
      </View>
      <Text style={styles.result}>
        {loading ? "Laddar..." : `${formatMoney(result)} ${to}`}
      </Text>
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
    fontFamily: fonts.bold,
  },
  amount: {
    fontSize: 48,
    color: colors.text,
    fontFamily: fonts.bold,
    fontVariant: ["tabular-nums"],
  },
  currencyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: spacing.lg,
  },
  swapButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  result: {
    fontSize: 48,
    color: colors.accent,
    fontFamily: fonts.bold,
    fontVariant: ["tabular-nums"],
  },
  rateText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.medium,
    marginBottom: spacing.lg,
    fontVariant: ["tabular-nums"],
  },
});
