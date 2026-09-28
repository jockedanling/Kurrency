import { View, StyleSheet} from 'react-native';
import Key from './Key';
import {spacing} from '../theme/theme';
export default function NumPad({ value, onChange }) {
  const pressDigit = (digit) => {
    if (value.includes(",") && value.split(",")[1].length === 2) {
      return;
    }
    if (value === "0") {
      onChange(digit);
    } else {
      onChange(value + digit);
    }
  };

  const pressComma = () => {
    if (value.includes(",")) {
      return;
    } else {
      onChange(value + ",");
    }
  };
  const pressDelete = () => {
    if (value.length === 1) {
      onChange("0");
      return;
    } else {
      onChange(value.slice(0, -1));
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
})
