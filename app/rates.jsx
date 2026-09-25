import { StyleSheet, Text, View } from 'react-native';
const Rates = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rates</Text>
        </View>
    )
}
export default Rates
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F4F5F8',
    padding: 24,
    },
    title: {
        color: `#14161C`,
        fontSize: 28,
        fontWeight: '700'
    },
})