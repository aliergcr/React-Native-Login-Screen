import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import { authUser } from '../redux/actions/authActions';
import Loading from '../components/loading/Loading';
import { AppStyles } from '../AppStyles';
import AddDevice from './AddDevice';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigator() {
  const dispatch = useDispatch();
  const { loading, login } = useSelector((state) => state.auth);
  const [pageLoading, setpageLoading] = useState(true);

  useEffect(() => {
    dispatch(authUser());
  }, []);
  useEffect(() => {
    setpageLoading(loading);
  }, [loading]);

  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Renk Seçimi',
            headerTintColor: AppStyles.titleColor,
            headerTitleStyle: {
              fontSize: AppStyles.titleFontSize,
              ...Platform.select({
                android: { alignSelf: 'center' },
              }),
            },
            headerStyle: {
              backgroundColor: AppStyles.secondaryColor,
            },
          }}
        />
        {/* <Stack.Screen
          name="AddDevice"
          component={AddDevice}
          options={{ title: 'Cihaz Ekle' }}
        /> */}
      </Stack.Navigator>
    );
  };

  const ProfileStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profil',
            headerTintColor: AppStyles.titleColor,
            headerTitleStyle: {
              fontSize: AppStyles.titleFontSize,
              ...Platform.select({
                android: { alignSelf: 'center' },
              }),
            },
            headerStyle: {
              backgroundColor: AppStyles.secondaryColor,
            },
          }}
        />
        {/* <Stack.Screen
          name="AddDevice"
          component={AddDevice}
          options={{ title: 'Cihaz Ekle' }}
        /> */}
      </Stack.Navigator>
    );
  };

  const SettingsStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Ayarlar',
            headerTintColor: AppStyles.titleColor,
            headerTitleStyle: {
              fontSize: AppStyles.titleFontSize,
              ...Platform.select({
                android: { alignSelf: 'center' },
              }),
            },
            headerStyle: {
              backgroundColor: AppStyles.secondaryColor,
            },
          }}
        />
        <Stack.Screen
          name="AddDevice"
          component={AddDevice}
          options={{
            title: 'Cihaz Ekle',
            headerTintColor: AppStyles.titleColor,
            headerTitleStyle: {
              fontSize: AppStyles.titleFontSize,
              //alignSelf: 'center',
            },
            headerStyle: {
              backgroundColor: AppStyles.secondaryColor,
            },
          }}
        />
      </Stack.Navigator>
    );
  };

  const HomeTab = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeStack') {
              iconName = focused ? 'color-palette' : 'color-palette-outline';
            } else if (route.name === 'SettingsStack') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'ProfileStack') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: AppStyles.titleColor,
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: AppStyles.colorBackground,
            borderTopColor: '',
          },
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: 'Renk Seç',
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{ title: 'Profil' }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{ title: 'Ayarlar' }}
        />
      </Tab.Navigator>
    );
  };

  return pageLoading ? (
    <Loading backgroundcolor={AppStyles.colorBackground} />
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        {!login ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
