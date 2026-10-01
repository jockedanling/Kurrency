import { colors } from "../theme/theme";
import { StyleSheet, View, ActivityIndicator } from "react-native";
// En loading View som kan användas överallt där appen väntar på data. 
export default function LoadingView() {
  return (
    <View style={styles.view}>
      <ActivityIndicator size="large" color={colors.accent}/>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
