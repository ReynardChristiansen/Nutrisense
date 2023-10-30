import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import { BottomSheetStore } from '../../store/toggle-and-content-store'
import styled from 'styled-components/native'
export default function BottomSheetSection() {
  const snapPoints = useMemo(() => ['5%', '30%', '50%', '100%'], [])
  const sheetRef = useRef(null)
  const bottomSheetIsActive = BottomSheetStore((state) => state.isActive)
  const bottomSheetContent = BottomSheetStore((state) => state.content)
  const bottomSheetSetContent = BottomSheetStore((state) => state.setContent)

  if (!bottomSheetIsActive) {
    return null
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      initialSnapIndex={0}
      activeOffsetY={[-2, 2]}
      failOffsetX={[-2, 2]}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          paddingBottom: 50,
          flexGrow: 1,
        }}
      >
        <SubTitle>List Of Food</SubTitle>
        {bottomSheetContent['foodNames'] &&
          bottomSheetContent['foodNames'].map((item, index) => {
            return <SubTitle key={index}> - {item.charAt(0).toUpperCase() + item.slice(1)}</SubTitle>
          })}
        <View style={{ marginVertical: 10 }}></View>
        <SubTitle>Nutrients</SubTitle>
        {bottomSheetContent['nutrients'] &&
          bottomSheetContent['nutrients'].map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <SubTitle> - {item['name']}</SubTitle>
                <SubTitle>
                  {item['amount'].toFixed(2)} {item['unit']}
                </SubTitle>
              </View>
            )
          })}
        <View style={{ marginVertical: 10 }}></View>
        <Button
          buttonColor="#33cc8f"
          textColor='white'
          onPress={() =>
            bottomSheetSetContent({ foodNames: [], nutrients: [] })
          }
        >
          Reset Nutrition
        </Button>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const SubTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  margin-horizontal: 10px;
`
