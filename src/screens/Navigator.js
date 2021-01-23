import React, { useEffect, useState } from 'react';
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigator() {
  const dispatch = useDispatch();
  const { loading, login } = useSelector((state) => state.auth);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    dispatch(authUser());
  }, []);

  useEffect(() => {
    setPageLoading(loading);
  }, [loading]);

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
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
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
