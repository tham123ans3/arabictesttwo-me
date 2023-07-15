import { Alert, Platform } from 'react-native';

export const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
        window.alert(message);
    } else {
        Alert.alert(title, message);
    }
};