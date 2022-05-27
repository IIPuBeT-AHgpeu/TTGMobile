import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Header from '../Blocks/Header';
import Icon from 'react-native-vector-icons/Feather';
import { Stopwatch } from 'react-native-stopwatch-timer';
import Dialog from "react-native-dialog";

export default function Driver({route}) {

    const navigator = useNavigation();
    const {login} = route.params;
    const {isDriver} = route.params;
    const {way} = route.params;
    const {stationsList} = route.params;
    const {carsList} = route.params;
    const {avrTime} = route.params;
    const {region} = route.params;
    const {price} = route.params;

    const [startClock, setStartClock] = useState(false);
    const [stopClock, setStopClock] = useState(false);

    const [start, setStart] = useState("Начать рейс");
    const [color, setColor] = useState('green');

    const [promptVis, setPromptVis] = useState(false);

    const changeStart = () => {
        if(start == "Начать рейс")
        {
          setStart("Завершить рейс");
          setColor('red');
          setStartClock(true);
          setStopClock(false);
        }
        else
        {
          setStart("Начать рейс");
          setColor('green');
          setStopClock(true);
          setStartClock(false);
          setPromptVis(true);
        }
      };

    const sendProfit = (profit) => {
        //
    };

    const sendChangeIsFull = () => {
        //    
    };

    var tripTime;
    const getTripTime = (value) => {
        tripTime = value;
    };



    return (
        <SafeAreaView style={styles.container}>
          <Header style={{flex: 1}} isDriver={isDriver} login={login}></Header>

          <MapView
          style={{flex: 9}}
          region={region}
          showsUserLocation={true}
        >
          {
            //остановки
            stationsList.map((station) =>
            {
              return (
              <Marker 
                key={station.position}
                coordinate={{
                  latitude: station.latitude,
                  longitude: station.longitude,
                }}
                title={station.name}
                description={station.description}
                anchor={{x: 0.5, y: 0.5}}
                centerOffset={{x: 0.5, y: 0.5}}
              >
                <View style={{borderRadius: 20, backgroundColor: 'blue'}}><Icon style={{color: 'white'}} name='disc' size={20}/></View>
              </Marker>)
            })
          }
          {
            //авто
            carsList.map((car, index) => 
            {
              return(
                <Marker 
                  key={index}
                  coordinate={{
                    latitude: car.latitude,
                    longitude: car.longitude,
                  }}
                  title={car.number}
                  description={car.isFull ? "Машина переполнена" : "В машине есть свободные места"}
                  anchor={{x: 0.5, y: 0.5}}
                  centerOffset={{x: 0.5, y: 0.5}}
                >
                  {
                    car.isFull 
                    ? <View><Icon style={{color: 'red'}} name='truck' size={25}/></View> 
                    : <View><Icon style={{color: 'green'}} name='truck' size={25}/></View>
                  }
                </Marker>
              );
            })
          }

          <Polyline
              coordinates={
                stationsList.map((station) => {
                  return {latitude: station.latitude, longitude: station.longitude};
                })
              }
              strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={5}
            />
          
        </MapView>

        <View style={styles.info}>
          <Text style={{fontSize: 18, alignSelf: 'center', paddingTop: 5}}>Маршрут №{way}</Text>
          <Text style={{fontSize: 17, paddingLeft: 8, paddingTop: 1}}>Среднее время движения: {avrTime} мин.</Text>
          <Text style={{fontSize: 17, paddingLeft: 8, paddingTop: 1}}>Цена проезда: {price} руб.</Text>
        </View>

        <View style={styles.mapMenuFull}><Icon style={{color: 'black'}} name='alert-circle' size={30} onPress={() => sendChangeIsFull}/></View>

        <View style={{
                position: 'absolute',
                top: '68%',
                left: '5%',
                width: '40%'
            }}
        >
            <Button color={color} title={start} onPress={() => changeStart()}/>
        </View>

        <View style={{
        position: 'absolute',
        top: '68%',
        right: '5%',
        width: '30%',
        borderWidth: 1,
        height: '5.5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
      }}
      >
        <Stopwatch laps start={startClock}
          reset={stopClock}
          options={{}}
          getTime={(value) => getTripTime(value)} 
        />
      </View>

      <Dialog.Container visible={promptVis}>
        <Dialog.Title>Укажите прибыль</Dialog.Title>
        <Dialog.Input />
        <Dialog.Button label="Это не последний рейс" onPress={() => setPromptVis(false)} />
        <Dialog.Button label="Отправить" onPress={(value) => {sendProfit(value); setPromptVis(false)}} />
      </Dialog.Container>

      <View style={styles.mapMenuSend}
      >
        <Icon style={{color: 'black'}} name='share' size={30} onPress={() => setPromptVis(true)}/>
      </View>

        </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    select: {
      position: 'absolute',
      top: '13%',
      width: '80%',
      height: '6%',
      borderWidth: 0.5,
      backgroundColor: 'white',
      alignSelf: 'center',
    },
    info: {
        position: 'absolute',
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        height: '15%',
        top: '80%', 
        borderWidth: 0.5
    },
    mapMenuSend: {
      position: 'absolute',
      width: 40,
      right: '2%',
      height: 40,
      top: '40%',
      borderWidth: 0.5,
      borderRadius: 8,
      backgroundColor: '#fffff0',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mapMenuFull: {
      position: 'absolute',
      width: 40,
      right: '2%',
      height: 40,
      bottom: '45%',
      borderWidth: 0.5,
      borderRadius: 8,
      backgroundColor: '#ff4500',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });