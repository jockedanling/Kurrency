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

const formatMoney = (value) =>
  new Intl.NumberFormat("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
const formatRate = (value) =>
  new Intl.NumberFormat("sv-SE", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(value);

const Home = () => {
  const [amount, setAmount] = useState("0");
  const [from, setFrom] = useState("SEK");
  const [to, setTo] = useState("EUR");
  const [rate, setRate] = useState(null); // Kursen när den har hämtats
  const [loading, setLoading] = useState(true); // true medan vi väntar
  const [error, setError] = useState(null); // felmeddelandet om något gick fel
  const [pickerFor, setPickerFor] = useState(null);
  const numericAmount = Number(amount.replace(",", "."));
  const result = rate === null ? null : convert(numericAmount, rate);
  

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
    fetchRate();
  }, [from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };
  const selectCurrency = (code) => {
    if(pickerFor === 'from') {
      setFrom(code);
    } else {
      setTo(code);
    }
    setPickerFor(null);
  }
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
        <CurrencyPill code={from} onPress={() => setPickerFor('from')} />
        <Pressable onPress={swap} style={styles.swapButton}>
          <Ionicons name="swap-horizontal" size={24} color={colors.accent} />
        </Pressable>
        <CurrencyPill code={to} onPress={() => setPickerFor('to')} />
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
      <CurrencyPicker visible={pickerFor !== null} onSelect={selectCurrency} onClose={() => setPickerFor(null)} />
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
