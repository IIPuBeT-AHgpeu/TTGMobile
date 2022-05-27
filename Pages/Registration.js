import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextStyles from '../Styles/TextStyles';

export default function Registration() {

  const navigator = useNavigation();
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeate, setRepeate] = useState("");

  const [isEqual, setEqual] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const checkLogin = () => {
    return true;
  };

  const registrationClicked = () => 
  {
    if(password == repeate)
    {
      if(checkLogin())
      {
        navigator.navigate('Login');
      }
      else
      {
        setIsLogin(true);
      }
    }
    else
    {
      setEqual(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={TextStyles.bigText}>Регистрация</Text>

      <View style={{flexDirection: 'row', paddingTop: 25}}>
          <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Имя</Text></View>
            <View style={{width: '70%'}}>
                <TextInput 
                    style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                    placeholder='Name' 
                    value={name}
                    onChangeText={(text) => {setName(text);}}
                    autoFocus={false}
                />
            </View>
      </View>
      <View style={{flexDirection: 'row', paddingTop: 10}}>
          <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Логин</Text></View>
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

      {isLogin ? <View style={{paddingTop: 5}}><Text style={{color: 'red', fontSize: 18}}>Такой логин уже существует!</Text></View> : null}

      <View style={{flexDirection: 'row', paddingTop: 10}}>
          <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Пароль</Text></View>
          <View style={{width: '70%'}}>
                <TextInput 
                    style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                    placeholder='Password' 
                    value={password}
                    onChangeText={(text) => {setPassword(text);}}
                    autoFocus={false}
                />
            </View>
      </View>
      <View style={{flexDirection: 'row', paddingTop: 10, alignItems: 'center'}}>
          <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Повторить пароль</Text></View>
          <View style={{width: '70%'}}>
                <TextInput 
                    style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                    placeholder='Password' 
                    value={repeate}
                    onChangeText={(text) => {setRepeate(text);}}
                    autoFocus={false}
                />
            </View>
      </View>

      {isEqual ? null : <View style={{paddingTop: 5}}><Text style={{color: 'red', fontSize: 18}}>Пароли не совпадают!</Text></View>}
      
      <View style={{paddingTop: 25, alignContent: 'center', width: '50%'}}>
          <Button style={{}} title='Зарегистрироваться' onPress={registrationClicked}/>
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
  inputLabelText: {
    fontSize: 18,
    color: 'black'
  },
  inputLabel: {
    alignItems: 'flex-end',
    width: '30%'
  }
});