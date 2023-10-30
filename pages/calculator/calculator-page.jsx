import { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TextBasedCalculatorPage from './text-based-calculator'
import UIBasedCalculator from './ui-based-calculator'
import { View } from 'react-native'
import Header from './header'
import BottomSheet from './bottom-sheet'
import { BottomSheetStore } from '../../store/toggle-and-content-store'
export default function CalculatorPage() {
  const Tab = createMaterialTopTabNavigator()
  const [resetBottomSheetData, setResetBottomSheetData] = useState(false)
  const handleTabPress = (index) => {
    console.log(index)
    resetBottomSheet({
      foodName: [],
      nutrients: [],
    })
  }
  const resetBottomSheet = BottomSheetStore((state) => state.setContent)

  return (
    <>
      <Tab.Navigator
        initialRouteName="UI based"
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: '#33cc8f' },
        }}
      >
        <Tab.Screen
          name="UI based"
          component={UIBasedCalculator}
          listeners={({ navigation, route }) => ({
            tabPress: () => {
              handleTabPress(route.params?.index || 0)
            },
          })}
          initialParams={{ index: 0 }}
        />
        <Tab.Screen
          name="Text based"
          component={TextBasedCalculatorPage}
          listeners={({ navigation, route }) => ({
            tabPress: () => {
              handleTabPress(route.params?.index || 1)
            },
          })}
          initialParams={{ index: 1 }}
        />
      </Tab.Navigator>
      <BottomSheet />
    </>
  )
}
