import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, radius, fonts} from '../src/theme/theme';
const Rates = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kurser</Text>
        </View>
    )
}
export default Rates
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    },
    title: {
        color: colors.text,
        fontSize: 28,
        fontFamily: fonts.bold,
    },
})