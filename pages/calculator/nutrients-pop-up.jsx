import {
  View,
  useWindowDimensions,
  ScrollView,
  FlatList,
  TextInput,
  Button,
} from 'react-native'
import Text from '../../components/text'
import { Modal, Portal, ActivityIndicator } from 'react-native-paper'
import { Menu, Divider } from 'react-native-paper'

import Icon_Back from '../../components/icons/icon-back'
import styled from 'styled-components/native'
import {
  calculatorModal,
  toggleLoadingScreen,
} from '../../store/toggle-and-content-store'
import { useState, useEffect, useCallback } from 'react'
import { endPoints } from '../../utility/endPoints'
import Api from '../../api'
import { BottomSheetStore } from '../../store/toggle-and-content-store'
export default function NutrientsPopUp() {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions()
  const isModalVisible = calculatorModal((state) => state.isActive)
  const setModalVisible = calculatorModal((state) => state.setActive)
  const setLoading = calculatorModal((state) => state.setLoading)
  const isLoading = calculatorModal((state) => state.isLoading)
  const nutritionContent = calculatorModal((state) => state.content)
  const [totalAmount, setTotalAmount] = useState(0)
  const [unit, setUnit] = useState('GRAMS')
  const setContent = BottomSheetStore((state) => state.setContent)
  const content = BottomSheetStore((state) => state.content)
  const [visible, setVisible] = useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const formatResult = (foodNames, results) => {
    const mergedObject = {
      foodNames: [...content['foodNames'], foodNames],
      nutrients: [...content['nutrients']],
    }
    results.forEach((nutrition) => {
      const existingNutrientIndex = mergedObject.nutrients.findIndex(
        (nutrient) => nutrient.name === nutrition.name
      )
      if (existingNutrientIndex === -1) {
        mergedObject.nutrients.push(nutrition)
      } else {
        mergedObject.nutrients[existingNutrientIndex].amount += nutrition.amount
      }
    })
    return mergedObject
  }

  const addNutritionToList = useCallback(async () => {
    try {
      await setLoading(true)
      const data = new FormData()
      data.append('amount', totalAmount)
      data.append('unit', unit.toLowerCase())
      const ingredientsByID = await Api.post(
        endPoints.list_of_ingredients_by_id(nutritionContent.id),data
      )
      const result = await ingredientsByID.data.nutrition.nutrients
      const formatedResult = await formatResult(nutritionContent.name, result)
      console.log(formatedResult)
      await setContent(formatedResult)
      await setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
    setModalVisible(false)
  }, [totalAmount, unit, nutritionContent.id])

  if (isLoading) {
    return (
      <Portal style={{ flex: 1 }}>
        <Modal
          visible={isModalVisible}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            flex: 1,
            margin: 0,
          }}
        >
          <ActivityIndicator animating={true} size="large" color="#0000ff" />
        </Modal>
      </Portal>
    )
  }
  return (
    <Modal
      style={{
        margin: 0,
        flex: 1,
        backgroundColor: 'white',
        height: screenHeight * 0.5,
        alignSelf: 'center',
        alignContent: 'center',
        top: screenHeight * 0.15,
        borderRadius: screenHeight * 0.03,
        marginHorizontal: '10%',
      }}
      visible={isModalVisible}
      contentContainerStyle={{
        margin: 0,
        backgroundColor: 'white',
        paddingHorizontal: 30,
        height: '100%',
      }}
      onDismiss={() => setModalVisible(false)}
    >
      <Text size={"24px"} family={'Jakarta-m'} mb={5}>{nutritionContent.name}</Text>
      <Text size={"14px"} family={'Jakarta-m'} mb={5}>Amount:</Text>
      <View style={{ display: 'flex', flexDirection: 'row',alignItems:'center',justifyContent:'space-between' }}>
        <TextInput
          style={{ marginVertical: 10, borderWidth: .7, padding: 5,width:150 }}
          onChangeText={setTotalAmount}
          placeholder="10"
          maxLength={6}
          keyboardType="numeric"
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} title={unit}/>}
          contentStyle={{ backgroundColor: 'white' }}
        >
          <Menu.Item onPress={() => setUnit('grams')&closeMenu()} title="grams" />
          <Menu.Item onPress={() => setUnit('miligrams')&closeMenu()} title="miligrams" />
          <Divider />
          <Menu.Item onPress={() => setUnit('kilograms')&closeMenu()} title="kilograms" />
        </Menu>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Button title="Cancel" onPress={() => setModalVisible(false)} />
        <View style={{ width: 5 }} />
        <Button title="Confirm" onPress={() => addNutritionToList()} />
      </View>
    </Modal>
  )
}

const ListContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 30px;
`

const SubTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
`
