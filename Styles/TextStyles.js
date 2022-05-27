import { StyleSheet } from 'react-native';

const TextStyles = StyleSheet.create({
    bigText: {
        fontSize: 30
    },
    mediumText: {
        fontSize: 22
    },
    smallText: {
        fontSize: 14
    },
    errorBigText: {
        fontSize: 30,
        color: 'red'
    },
    errorMediumText: {
        fontSize: 22,
        color: 'red'
    },
    errorSmallText: {
        fontSize: 14,
        color: 'red'
    },
    pageLinkSmallText: {
        fontSize: 14, 
        color: 'blue',
        fontWeight: 'bold'
    },
    pageLinkMediumText: {
        fontSize: 22, 
        color: 'blue',
        fontWeight: 'bold'
    }
});

export default TextStyles;