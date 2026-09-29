import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, spacing } from "../src/theme/theme";
import Screen from "../src/components/Screen";
import { useState } from "react";
import NumPad from "../src/components/NumPad";
import CurrencyPill from "../src/components/CurrencyPill";
import Ionicons from "@expo/vector-icons/Ionicons";
const Home = () => {
  const [amount, setAmount] = useState("0");
  const [from, setFrom] = useState("SEK");
  const [to, setTo] = useState("EUR");

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Screen>
      <Text style={styles.title}>Omvandla</Text>
      <Text style={styles.amount}>{amount}</Text>
      <View style={styles.currencyRow}>
        <CurrencyPill code={from} />
        <Pressable onPress={swap} style={styles.swapButton}>
          <Ionicons name="swap-horizontal" size={24} color={colors.accent} />
        </Pressable>
        <CurrencyPill code={to} />
      </View>
      <NumPad value={amount} onChange={setAmount} />
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
});
