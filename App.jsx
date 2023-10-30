import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components/native'

// pages
import CameraScreen from './pages/camera'
import CalculatorScreen from './pages/calculator'
import BlogScreen from './pages/blog'

//navigators
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

//utilities
import theme from './theme'
import { routesName } from './routes'
import { LogBox } from 'react-native'

//react native paper
import { Modal, Portal, Button, Provider } from 'react-native-paper'
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

const Tab = createMaterialBottomTabNavigator()

export default function App({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    'Jakarta-m': require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
    'Jakarta-sb': require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'Jakarta-b': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync()
      }, 100000)
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }
  return (
    <GestureHandlerRootView style={{ flex: 1, fontFamily: 'Jakarta-m'}}>
      <NavigationContainer onLayout={onLayoutRootView} style={{ backgroundColor:'white' }}>
        <Provider>
          <ThemeProvider theme={theme}>
            <Tab.Navigator
              initialRouteName={routesName.camera}
              backBehavior="order"
              tabBarPosition="bottom"
              activeColor="#32CC8F"
              inactiveColor='grey'
              activeBackground="#fff"
              shifting={true}
              labeled={true}
              screenOptions={{
                tabBarColor: '#fff',
              }}
            >
              <Tab.Screen
                name={routesName.home}
                component={CameraScreen}
                options={{
                  headerShown: false,
                  tabBarLabel: routesName.home,
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="home"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name={routesName.calculator}
                component={CalculatorScreen}
                options={{
                  tabBarLabel: routesName.calculator,
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="calculator"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name={routesName.blog}
                component={BlogScreen}
                style={{ display: 'none' }}
                options={{
                  headerShown: false,
                  tabBarLabel: routesName.blog,
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="post-outline"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          </ThemeProvider>
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
