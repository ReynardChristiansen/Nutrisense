import { View, TextInput } from 'react-native'
import { Button } from 'react-native-paper'
import { Text } from 'react-native-paper'
import { useState, useEffect } from 'react'
import Api from '../../api'
import { createFormDataWithText } from '../../utility/createForm'
import { BottomSheetStore } from '../../store/toggle-and-content-store'
import { endPoints } from '../../utility/endPoints'
import { formatResult } from '../../utility/formatResult'
export default function TextBasedCalculatorPage() {
  const [text, onChangeText] = useState('')
  const toggleSheet = BottomSheetStore((state) => state.isActive)
  const setContent = BottomSheetStore((state) => state.setContent)
  const get_nutrients = async () => {
    try {
      const cleanedText = await text.toString().replace(/\n/g, ' ')
      const formData = await createFormDataWithText(cleanedText)
      const nutrientsFromQuery = await Api.post(
        endPoints.get_nutrients_from_query(),
        formData
      )
      const resultFromQuery = await nutrientsFromQuery.data.items
      const formatedResult = formatResult(resultFromQuery)
      console.log(formatedResult)
      await setContent(formatedResult)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={{ padding: 10,flex:1,backgroundColor:'white' }}>
      <Text variant="titleSmall">Textbased Nutrition Calculator</Text>
      <TextInput
        multiline={true}
        autoCorrect={true}
        selectionColor={'black'}
        textAlignVertical="top"
        numberOfLines={10}
        style={{
          marginVertical: 10,
          borderColor: 'gray',
          borderWidth: 1,
          padding: 5,
        }}
        onChangeText={onChangeText}
        placeholder="Apple 1kg"
      />
      <Button
        buttonColor="#33cc8f"
        textColor="white"
        onPress={() => get_nutrients()}
      >
        Calculate
      </Button>
    </View>
  )
}
