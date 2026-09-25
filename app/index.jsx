import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, radius, fonts } from '../src/theme/theme';
const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Växla</Text>
        </View>
    )
}
export default Home
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
});