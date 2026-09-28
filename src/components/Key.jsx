import { Pressable, Text, StyleSheet } from "react-native";
import {colors, radius, fonts} from '../theme/theme';

export default function Key({ label , onPress }) {
    return (
        <Pressable onPress={onPress} style={styles.key}>
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    key: {
        width: '31%',
        height: 64,
        backgroundColor: colors.surface,
        borderRadius: radius.button,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontsize: 28,
        color: colors.text,
        fontFamily: fonts.semiBold
    }

});

