import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Passenger from '../Pages/Passenger';
import Login from '../Pages/Login';
import Registration from '../Pages/Registration';
import Profile from '../Pages/Profile';
import Driver from '../Pages/Driver';

const AppStack = createStackNavigator();

export default function Navigator(){

    return (
    <NavigationContainer>
        <AppStack.Navigator screenOptions={{ headerShown: true }} >
            <AppStack.Screen name="Login" component={Login} options={{ title: "Авторизация", headerLeft: null }}/>
            <AppStack.Screen name="Registration" component={Registration} options={{ title: "Регистрация" }}/>
            <AppStack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <AppStack.Screen name="Passenger" component={Passenger} options={{ headerShown: false }}/>
            <AppStack.Screen name="Driver" component={Driver} options={{ headerShown: false }}/>
        </AppStack.Navigator>
    </NavigationContainer>
    );
}