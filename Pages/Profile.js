import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Blocks/Header';
import Dialog from "react-native-dialog";
import TextStyles from "../Styles/TextStyles";

export default function Profile({route}) {

  const navigator = useNavigation();
  const {login} = route.params;
  const {isDriver} = route.params;

  const [loginInput, setLoginInput] = useState(login);
  const [passwordInput, setPasswordInput] = useState("password1");
  const [nameInput, setNameInput] = useState("Иван");
  const [passport, setPassport] = useState("0000 111222");
  const [wayName, setWayName] = useState("98");
  const [model, setModel] = useState("ГАЗель");
  const [carNumber, setCarNumber] = useState("А001АА134rus");

  const [visible, setVisible] = useState(false);

  const [status, setStatus] = useState("Эксплуатируется");

  const changeStatus = () => {
    if(status == "Эксплуатируется")
    {setStatus("На ремонте");}
    else
    {
        setVisible(true);
        setStatus("Эксплуатируется");
    }
  };

  const deleteProfile = () => 
  {

  };

  const toMap = () => {
    if(isDriver)
    {
      var response = getWayInfo(wayName);
      navigator.navigate('Driver', {
        login: loginInput, 
        isDriver: isDriver, 
        way: wayName,
        stationsList: response.stations,
        carsList: response.cars,
        avrTime: response.avrTime,
        price: response.price,
        region: regionContainingPoints(response.stations)
      });
    }
    else
    {
      navigator.navigate('Passenger', {login: loginInput, isDriver: isDriver});
    }
  };
  const exit = () => {
    navigator.navigate('Login');
  };
  const saveData = () => 
  {
    //save
    if(isDriver)
    {
      var response = getWayInfo(wayName);
      navigator.navigate('Driver', {
        login: loginInput, 
        isDriver: isDriver, 
        way: wayName,
        stationsList: response.stations,
        carsList: response.cars,
        avrTime: response.avrTime,
        price: response.price,
        region: regionContainingPoints(response.stations)
      });
    }
    else
    {
      navigator.navigate('Passenger', {login: loginInput, isDriver: isDriver});
    }
  };

  const regionContainingPoints = (points) => {
    let minLat, maxLat, minLng, maxLng;
  
    minLat = 1000;
    maxLat = 0;
    minLng = 1000;
    maxLng = 0;
  
    // calculate rect
    points.forEach(point => {
      minLat = Math.min(minLat, point.latitude);
      maxLat = Math.max(maxLat, point.latitude);
      minLng = Math.min(minLng, point.longitude);
      maxLng = Math.max(maxLng, point.longitude);
    });
  
    const midLat = (minLat + maxLat) / 2;
    const midLng = (minLng + maxLng) / 2;
  
    const deltaLat = (maxLat - minLat) + 0.05;
    const deltaLng = (maxLng - minLng) + 0.05;
    
    return {
      latitude: midLat, longitude: midLng,
      latitudeDelta: deltaLat, longitudeDelta: deltaLng,
    };
  };

  const getWayInfo = (wayName) => {
    //fetch
    var response = 
    {
      price: 25,
      avrTime: 36.75,
      stations: [
        {
          description: "The first station!",
          name: "First",
          position: 0,
          waiting: 0,
          latitude: 48.70694,
          longitude: 44.48664
        }, 
        {
          description: "The second station!",
          name: "Second",
          position: 1,
          waiting: 0,
          latitude: 48.70944,
          longitude: 44.49068
        }, 
        {
          description: "The third station!",
          name: "Third",
          position: 2,
          waiting: 0,
          latitude: 48.71428,
          longitude: 44.49875
        },  
        {
          description: "The fourth station!",
          name: "Fourth",
          position: 3,
          waiting: 0,
          latitude: 48.71968,
          longitude: 44.5074
        },
      ],
      cars: [
        {
          number: "А000АА134rus",
          latitude: 48.71761,
          longitude: 44.50405,
          isFull: false
        },
        {
          number: "А001АА134rus",
          latitude: 48.71307,
          longitude: 44.49654,
          isFull: false
        }
      ]
    };

    return response;
};
 
  return (
    <SafeAreaView style={styles.container}>
      <Header style={{flex: 12}} isDriver={isDriver} login={login}></Header>
      
    {
      !isDriver 
      ? 
          <View style={{flex: 88, paddingTop: 20, alignItems: 'center'}}>
            <Text style={TextStyles.mediumText}>Ваш профиль</Text>

            <View style={{flexDirection: 'row', paddingTop: 25}}>
              <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Имя</Text></View>
              <View style={{width: '70%'}}>
                <TextInput 
                  style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                  placeholder='Name' 
                  value={nameInput}
                  onChangeText={(value) => setNameInput(value)}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Логин</Text></View>
              <View style={{width: '70%'}}>
                <TextInput 
                  style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                  placeholder='Login'
                  value={loginInput}
                  onChangeText={(value) => setLoginInput(value)}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Пароль</Text></View>
              <View style={{width: '70%'}}>
                <TextInput 
                  style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                  placeholder='Password'
                  value={passwordInput}
                  onChangeText={(value) => setPasswordInput(value)}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', width: '80%', justifyContent: 'center', paddingTop: 10}}>
              <View style={{width: '40%'}}><Button title='К карте' onPress={toMap}/></View>
              <View style={{paddingLeft: 10, width: '45%'}}><Button  title='Сохранить' onPress={saveData}/></View>
            </View>
            <View style={{flexDirection: 'row', width: '80%', justifyContent: 'center', paddingTop: 10}}>
              <View style={{width: '40%', paddingRight: 10}}><Button title='Удалить' color={'red'} onPress={deleteProfile}/></View>
              <View style={{width: '40%'}}><Button title='Выйти' color={'red'} onPress={exit}/></View>
            </View>

          </View>
      :
          <View style={{flex: 88, paddingTop: 20, alignItems: 'center'}}>
            <Text style={TextStyles.mediumText}>Профиль</Text>

            <View style={{flexDirection: 'row', paddingTop: 15}}>
              <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Имя</Text></View>
              <View style={{width: '70%'}}>
                <TextInput 
                  style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                  placeholder='Name' 
                  value={nameInput}
                  onChangeText={(value) => setNameInput(value)}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Логин</Text></View>
              <View style={{width: '70%'}}>
                <TextInput 
                  style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                  placeholder='Login'
                  value={loginInput}
                  onChangeText={(value) => setLoginInput(value)}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Паспорт</Text></View>
              <View style={{width: '70%'}}>
                <TextInput 
                  style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                  placeholder='Passport' 
                  value={passport}
                  editable={false}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 10, alignItems: 'center'}}>
              <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Наименование маршрута</Text></View>
              <View style={{width: '70%'}}>
                <TextInput 
                  style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                  placeholder='WayName' 
                  value={wayName}
                  editable={false}
                />
              </View>
            </View>

            <Text style={TextStyles.mediumText}>Автомобиль</Text>
                <View style={{flexDirection: 'row', paddingTop: 15}}>
                    <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Номер</Text></View>
                    <View style={{width: '65%'}}>
                        <TextInput 
                            style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                            placeholder='Number' 
                            value={carNumber}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                    <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Модель</Text></View>
                    <View style={{width: '65%'}}>
                        <TextInput 
                            style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                            placeholder='Model'
                            value={model}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                    <View style={styles.inputLabel}><Text style={styles.inputLabelText}>Статус</Text></View>
                    <View style={{width: '65%'}}>
                        <TextInput 
                            style={{borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 5, fontSize: 20}} 
                            value={status}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', width: '80%', justifyContent: 'center', paddingTop: 10}}>
                    <View style={{paddingLeft: 30, width: '80%'}}><Button  title='Изменить статус' onPress={changeStatus} /></View>
                </View>

                <View style={{flexDirection: 'row', width: '80%', justifyContent: 'center', paddingTop: 10}}>
                    <View style={{width: '30%'}}><Button title='К карте' onPress={toMap}/></View>
                    <View style={{paddingLeft: 10, width: '70%'}}><Button  title='Сохранить изменения' onPress={saveData} /></View>
                </View>

                <View style={{flexDirection: 'row', width: '80%', justifyContent: 'center', paddingTop: 10}}>
                    <View style={{width: '50%'}}><Button  title='Выйти' onPress={exit} color={'red'}/></View>
                </View>

          </View>
    }

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputLabelText: {
    fontSize: 18,
    color: 'black'
  },
  inputLabel: {
    alignItems: 'flex-end',
    width: '30%',
  }
});