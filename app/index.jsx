import { StyleSheet, Text } from "react-native";
import { colors, fonts } from "../src/theme/theme";
import Screen from "../src/components/Screen";
import { useState } from "react";
import NumPad from "../src/components/NumPad";
const Home = () => {
  const [amount, setAmount] = useState("0");
  
  return (
    <Screen>
      <Text style={styles.title}>Omvandla</Text>
      <Text style={styles.amount}>{amount}</Text>
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
});
