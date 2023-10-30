import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  Button,
} from 'react-native'

import { Modal, Portal, ActivityIndicator } from 'react-native-paper'
import Icon_Back from '../../components/icons/icon-back'
import styled from 'styled-components/native'
import {
  cameraModal,
  toggleLoadingScreen,
} from '../../store/toggle-and-content-store'
export default function NutrientsPopUp() {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions()
  const isModalVisible = cameraModal((state) => state.isActive)
  const setModalVisible = cameraModal((state) => state.setActive)
  const isLoading = toggleLoadingScreen((state) => state.isLoading)
  const nutritionContent = cameraModal((state) => state.content)

  if (isLoading) {
    return (
      <Portal style={{ flex: 1 }}>
        <Modal
          visible={isModalVisible}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            flex: 1,
            height: screenHeight,
            width: screenWidth,
          }}
        >
          <ActivityIndicator animating={true} size="large" color="#0000ff" />
        </Modal>
      </Portal>
    )
  }
  return (
    <Portal style={{ flex: 1 }}>
      <Modal
        visible={isModalVisible}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          flex: 1,
          height: screenHeight,
          width: screenWidth,
          margin: 0,
        }}
      >
        <Icon_Back
          text="Back"
          ml={7}
          onPress={() => setModalVisible(false)}
          style={{ marginTop: 10, marginBottom: 20 }}
        />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 10 }}>
          <View style={{ marginVertical:5 }}></View>
          <SubTitle>List Of Foods</SubTitle>
          {nutritionContent['foodNames'] &&
            nutritionContent['foodNames'].map((item, index) => {
              return (
                <ListContainer key={index}>
                  <SubTitle> - {item}</SubTitle>
                </ListContainer>
              )
            })}
          {!nutritionContent['foodNames'] && <SubTitle>No food found</SubTitle>}
          <View style={{ marginVertical:5 }}></View>
          <SubTitle>Nutrients</SubTitle>
          {nutritionContent['nutrients'] &&
            nutritionContent['nutrients'].map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <SubTitle>  - {item['name']}</SubTitle>
                  <SubTitle>
                    {item['amount'].toFixed(2)} {item['unit']}
                  </SubTitle>
                </View>
              )
            })}
          {!nutritionContent['nutrients'] && (
            <SubTitle>No nutrients found</SubTitle>
          )}
        </ScrollView>
      </Modal>
    </Portal>
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
  margin-horizontal: 10px;
`
