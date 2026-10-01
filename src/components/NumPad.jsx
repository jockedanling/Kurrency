import { View, StyleSheet } from "react-native";
import Key from "./Key";
import { spacing } from "../theme/theme";
//
// Hela sifferknappsatsen med tolv knappar och den bestämmer reglerna för hur beloppet får se ut.
//
export default function NumPad({ value, onChange }) {
  // Finns det redan två decimaler händer ingenting
  const pressDigit = (digit) => {
    if (value.includes(",") && value.split(",")[1].length === 2) {
      return;
    }
    if (value === "0") {
      // står det bara '0' ersätts nollan med siffran.
      onChange(digit);
    } else {
      // annars läggs siffran till sist
      onChange(value + digit);
    }
  };

  const pressComma = () => {
    // Lägger till ett kommatecken om det inte redan finns ett.
    if (value.includes(",")) {
      return;
    } else {
      onChange(value + ",");
    }
  };
  const pressDelete = () => {
    // Tar bort sista tecknet. finns det bara ett tecken blir det '0' istället för en tom sträng.
    if (value.length === 1) {
      onChange("0");
      return;
    } else {
      onChange(value.slice(0, -1));
    }
  };
  const pressKey = (key) => {
    // Tar emot alla tryck och skickar vidare till rätt funktion.
    if (key === ",") {
      pressComma();
    } else if (key === "⌫") {
      pressDelete();
    } else {
      pressDigit(key);
    }
  };
  return (
    <View style={styles.keypad}>
      {["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "⌫"].map(
        (key) => (
          <Key key={key} label={key} onPress={() => pressKey(key)} />
        ),
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});
