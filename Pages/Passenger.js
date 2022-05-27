import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import { useState } from 'react';
import Header from '../Blocks/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';
import { Stopwatch } from 'react-native-stopwatch-timer';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
//добавить отметку, добавить геолокацию...
export default function Passenger({route}) {

  const navigator = useNavigation();
  const {login} = route.params;
  const {isDriver} = route.params;

  //Стартовое значение региона.
  //"latitudeDelta" и "longitudeDelta" - параметры, предназначенные для установки масштаба карты.
  const defaultRegion = {
    latitude: 48.721210,
    longitude: 44.511220,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15
  };

  const [stationsList, setStationsList] = useState([]);
  const [carsList, setCarsList] = useState([]);
  const [price, setPrice] = useState(0);
  const [avrTime, setAvrTime] = useState(0.0);
  const [way, setWay] = useState("-");
  const [region, setRegion] = useState(defaultRegion);

  //const [location, setLocation] = useState(null);

  const [wayList, setWayList] = useState(()=>{
    /*try {
      //
      fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
      //
    } catch (error) {
      //
      console.error(error);//
      //
    }*/
    //
    return ["75", "98"];//
    //
  });

  const [startClock, setStartClock] = useState(false);
  const [stopClock, setStopClock] = useState(false);
  const [loopVar, setLoopVar] = useState(1);
  
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
    if(wayName == "-")
    {
      setStationsList([]);
      setCarsList([]);
      setRegion(defaultRegion);
      setStartClock(false);
      setStopClock(true);
      setPrice(0);
      setAvrTime(0.0);
      setLoopVar(1);
    }
    else
    {
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

      setStationsList(response.stations);
      setCarsList(response.cars);
      setRegion(regionContainingPoints(response.stations));
      setPrice(response.price);
      setAvrTime(response.avrTime);

      if(startClock)
      {
        var tmp = loopVar + 1;
        setLoopVar(tmp);
      }
      else
      {
        setLoopVar(1);
        setStartClock(true);
        setStopClock(false);
      }
    }
  };

  const updateCarsList = () => 
  {
    //fetch
    const testCars = [
      {
        number: "А000АА134rus",
        latitude: 48.7197,
        longitude: 44.50744,
        isFull: false
      },
      {
        number: "А001АА134rus",
        latitude: 48.71443,
        longitude: 44.49864,
        isFull: true
      }
    ];
    var tmp = loopVar + 1;
    setCarsList(testCars);
    setLoopVar(tmp);
    //
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    //setLocation(location);
  }
  
    return (
      <SafeAreaView style={styles.container}>
        <Header style={{flex: 1}} isDriver={isDriver} login={login}/>

        <MapView
          style={{flex: 9}}
          region={region}
          showsUserLocation={true}
          //onRegionChangeComplete={(reg)=>{setRegion(reg)}}
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

        <View style={styles.picker}>
          <Picker
            selectedValue={way}
            onValueChange={(value)=>{getWayInfo(value); setWay(value);}}
          >
            <Picker.Item key={0} label="Выберите маршрут" value="-" />
            {
              wayList.map((value, number) => 
              {
                return <Picker.Item key={number+1} label={value} value={value} />
              })
            }
          </Picker>
        </View>

        <View style={styles.info}>
          <Text style={{fontSize: 18, alignSelf: 'center', paddingTop: 5}}>Маршрут №{way}</Text>
          <Text style={{fontSize: 17, paddingLeft: 8, paddingTop: 1}}>Среднее время движения: {avrTime} мин.</Text>
          <Text style={{fontSize: 17, paddingLeft: 8, paddingTop: 1}}>Цена проезда: {price} руб.</Text>
        </View>

        <View style={styles.mapBtn}><Icon style={{color: 'black'}} name='map-pin' size={30} onPress={() => {}}/></View>

        <View 
          style={{
            position: 'absolute',
            width: '0%',
            height: '0%',
            opacity: 0
          }}
        >
          <Stopwatch
            start={startClock}
            reset={stopClock}
            getMsecs={(time)=>{
              if(time >= 15000 * loopVar)
              {
                updateCarsList();
              }
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    picker: {
      position: 'absolute',
      top: '15%',
      width: '60%',
      height: '7.5%',
      borderWidth: 1,
      backgroundColor: 'white',
      alignSelf: 'center',
      justifyContent: 'center'
    },
    mapBtn: {
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
  });