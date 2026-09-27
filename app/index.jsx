import { StyleSheet, Text, } from 'react-native';
import { colors, fonts } from '../src/theme/theme';
import Screen from '../src/components/Screen';
const Home = () => {
    return (
        <Screen>
<Text style={styles.title}>Omvandla</Text>
        </Screen>
    )
}
export default Home

const styles = StyleSheet.create({
      title: {
                color: colors.text,
                fontSize: 28,
                fontFamily: fonts.bold,
            }
})