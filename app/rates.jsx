import { StyleSheet, Text, } from 'react-native';
import { colors, fonts} from '../src/theme/theme';
import Screen from '../src/components/Screen';
const Rates = () => {
    return (
        <Screen>
            <Text style={styles.title}>Kurser</Text>
        </Screen>
    )
}
export default Rates
const styles = StyleSheet.create({
      title: {
                color: colors.text,
                fontSize: 28,
                fontFamily: fonts.bold,
            }
})