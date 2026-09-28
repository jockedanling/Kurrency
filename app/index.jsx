import { StyleSheet, Text, View } from "react-native";
import { colors, fonts, spacing } from "../src/theme/theme";
import Screen from "../src/components/Screen";
import { useState } from "react";
import Key from "../src/components/Key";
const Home = () => {
  const [amount, setAmount] = useState("0");
  const pressDigit = (digit) => {
    if (amount.includes(",") && amount.split(",")[1].length === 2) {
      return;
    }
    if (amount === "0") {
      setAmount(digit);
    } else {
      setAmount(amount + digit);
    }
  };

  const pressComma = () => {
    if (amount.includes(",")) {
      return;
    } else {
      setAmount(amount + ",");
    }
  };
  const pressDelete = () => {
    if (amount.length === 1) {
      setAmount("0");
      return;
    } else {
      setAmount(amount.slice(0, -1));
    }
  };
  const pressKey = (key) => {
    if (key === ",") {
      pressComma();
    } else if (key === "⌫") {
      pressDelete();
    } else {
      pressDigit(key);
    }
  };
  return (
    <Screen>
      <Text style={styles.title}>Omvandla</Text>
      <Text style={styles.amount}>{amount}</Text>
      <View style={styles.keypad}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "⌫"].map(
          (key) => (
            <Key key={key} label={key} onPress={() => pressKey(key)} />
          ),
        )}
      </View>
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
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  amount: {
    fontSize: 48,
    color: colors.text,
    fontFamily: fonts.bold,
  },
});
