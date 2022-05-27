import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextStyles from '../Styles/TextStyles';
import { RadioButton } from 'react-native-paper';

export default function Login() {

    const navigator = useNavigation();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [isTrueLogin, setIsTrueLogin] = useState(true);
    const [isTruePassword, setIsTruePassword] = useState(true);

    const [category, setCategory] = useState("P");

    const checkPassword = () => 
    {
      //-------------------------------
      if(true)
      {
        return true;
      }
      else
      {
        setIsTruePassword(false);
        return false;
      }
    };

  const checkLogin = () =>
  {
    //-------------------------------------------
    if(login == "User1" && category == 'P')
    {
      if(checkPassword())
      {
        if(true)
        {
          navigator.navigate('Profile', {login: login, isDriver: false});
        }
      }
    }
    else if(login == "Driver1" && category == 'D')
    {
      if(checkPassword())
      {
        if(true)
        {
          navigator.navigate('Profile', {login: login, isDriver: true});
        }
      }
    }
    else
    {
      setIsTrueLogin(false);
    }
  };

  const regPage = () =>
  {
    navigator.navigate("Registration");
  };

    return (
        <SafeAreaView style={styles.container}>

            <Text style={TextStyles.bigText}>Войти в систему</Text>

            <View style={{flexDirection: 'row', paddingTop: 30}}>

                <View style={styles.inputLabel}><Text style={TextStyles.mediumText}>Логин:</Text></View>
                
                <View style={{width: '70%'}}>
                    <TextInput 
                    style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                    placeholder='Login' 
                    value={login}
                    onChangeText={(text) => {setLogin(text);}}
                    autoFocus={false}
                    />
                </View>

            </View>

            {isTrueLogin ? 
                null : 
                <View style={{paddingTop: 5}}><Text style={TextStyles.errorMediumText}>Нет такого логина!</Text></View>
            }

            <View style={{flexDirection: 'row', paddingTop: 15}}>

                <View style={styles.inputLabel}><Text style={TextStyles.mediumText}>Пароль:</Text></View>

                <View style={{width: '70%'}}>
                    <TextInput 
                    style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                    placeholder='Password' 
                    value={password}
                    onChangeText={(text) => {setPassword(text)}}
                    />
                </View>

            </View>

            {isTruePassword ? 
                null :
                <View style={{paddingTop: 5}}><Text style={TextStyles.errorMediumText}>Неверный пароль!</Text></View>
            }

            <View style={{flexDirection: 'row', paddingTop: 25}}>
              <View style={{width: '30%'}}><Button style={{}} title='Войти' onPress={checkLogin}/></View>
              <View style={{width: '50%', paddingLeft: 10}}><Button style={{}} title='Регистрация' onPress={regPage}/></View>
            </View>

            <View style={{paddingTop: 20, flexDirection: 'row'}}>
              <RadioButton
                value="Пассажир"
                status={ category === 'P' ? 'checked' : 'unchecked' }
                onPress={() => setCategory('P')}
                color='blue'
              />
              <Text style={TextStyles.mediumText}>Пассажир</Text>
              <RadioButton
                value="Водитель"
                status={ category === 'D' ? 'checked' : 'unchecked' }
                onPress={() => setCategory('D')}
                color='blue'
              />
              <Text style={TextStyles.mediumText}>Водитель</Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    alignItems: 'flex-end',
    width: '30%'
  }
});