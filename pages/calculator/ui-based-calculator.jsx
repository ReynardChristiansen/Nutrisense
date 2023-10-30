import { View, FlatList, Image, TouchableOpacity } from 'react-native'
import { Portal, Searchbar, Text, Divider } from 'react-native-paper'
import { useCallback, useState, useEffect } from 'react'
import NutrientsPopUp from './nutrients-pop-up'
import Api from '../../api'
import { createFormDataWithText } from '../../utility/createForm'
import {
  calculatorModal,
  toggleLoadingScreen,
} from '../../store/toggle-and-content-store'
import { endPoints } from '../../utility/endPoints'

export default function UIBasedCalculator() {
  const [searchQuery, setSearchQuery] = useState('')
  const onChangeSearch = (query) => setSearchQuery(query)
  //store
  const setModalVisible = calculatorModal((state) => state.setActive)
  const isModalVisible = calculatorModal((state) => state.isActive)
  const setCalculatorContent = calculatorModal((state) => state.setContent)
  const setModalLoading = toggleLoadingScreen((state) => state.setLoading)

  const [ingredients, setIngredients] = useState([
    {
      id: 9003,
      image: 'apple.jpg',
      name: 'apple',
    },
    {
      id: 7951,
      image: 'spam.png',
      name: 'scrapple',
    },
    {
      id: 9266,
      image: 'pineapple.jpg',
      name: 'pineapple',
    },
    {
      id: 1079003,
      image: 'red-delicious-apples.png',
      name: 'red apple',
    },
    {
      id: 9019,
      image: 'applesauce.png',
      name: 'applesauce',
    },
    {
      id: 1029003,
      image: 'grannysmith-apple.png',
      name: 'tart apple',
    },
    {
      id: 1109003,
      image: 'apple.jpg',
      name: 'gala apple',
    },
  ])
  const toggleModal = useCallback(
    (active) => {
      setModalVisible(true)
      setModalLoading(true)
      if (active) {
        setModalLoading(false)
        return
      }
    },
    [setModalVisible, setModalLoading]
  )
  const get_ingredients_list = useCallback(async () => {
    try {
      const data = await createFormDataWithText(searchQuery)
      const response = await Api.post(endPoints.list_of_ingredients(), data)
      await setIngredients(response.data.results)
    } catch (err) {
      console.log(err)
    }
  }, [searchQuery])
  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: 'white' }}>
      {isModalVisible && (
        <Portal>
          <NutrientsPopUp />
        </Portal>
      )}
      <Text variant="titleSmall">UI based Nutrition Calculator</Text>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          marginVertical: 10,
          backgroundColor: 'white',
          borderColor: '#33cc8f',
          borderWidth: 1,
        }}
        onIconPress={() => console.log(searchQuery)}
        onSubmitEditing={() => get_ingredients_list()}
      />
      {ingredients.length > 0 && (
        <FlatList
          data={ingredients}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item: ingredient }) => (
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 20,
                }}
                onPress={() => {
                  setCalculatorContent(ingredient) & toggleModal(true)
                }}
              >
                <Image
                  source={{
                    uri:
                      'https://spoonacular.com/cdn/ingredients_100x100/' +
                      ingredient.image,
                  }}
                  style={{ width: 75, height: 75, borderRadius: 50 }}
                />
                <View style={{ width: 30 }}></View>
                <Text>{ingredient.name}</Text>
              </TouchableOpacity>
              <Divider />
            </View>
          )}
        />
      )}
    </View>
  )
}
