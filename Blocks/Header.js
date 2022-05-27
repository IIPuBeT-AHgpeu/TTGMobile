import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {LinearGradient} from 'expo-linear-gradient';

export default function Header(props) {

    const navigator = useNavigation();

    const exit = () => {
        navigator.navigate('Login');
    };

    const profile = () => {
      if(props.login != 'Guest')
      {
        navigator.navigate('Profile', {login: props.login, isDriver: props.isDriver});
      }
    };

  return (
        <LinearGradient colors={['#ffab00', '#ffc040', '#ffd580']} style={styles.container}>
            <Text style={{fontSize: 24, color: 'blue'}} onPress={profile}>{props.login}</Text>
            <Icon style={{paddingLeft: 20, paddingRight: 10}} name="log-out" size={40} onPress={exit}/>
        </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      backgroundColor: '#ffa500',
      height: '10%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
  });