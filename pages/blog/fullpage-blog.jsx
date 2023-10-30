import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import {
  Modal,
  Portal,
  ActivityIndicator,
  Card,
  Chip,
} from 'react-native-paper'
import Icon_Back from '../../components/icons/icon-back'
import styled from 'styled-components/native'
import {
  blogModal,
  toggleLoadingScreen,
} from '../../store/toggle-and-content-store'
import { useNavigation } from '@react-navigation/native'

export default function FullPageBlog() {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions()
  const isModalVisible = blogModal((state) => state.isActive)
  const setModalVisible = blogModal((state) => state.setActive)
  const isLoading = toggleLoadingScreen((state) => state.isLoading)
  const blogContent = blogModal((state) => state.content)
  const { title, date, author, content, image, tags } = blogContent
  const navigation = useNavigation()
  console.log(title, date, author, content, image, tags)
  if (isLoading) {
    return (
      <Modal
        visible={isModalVisible}
        contentContainerStyle={{
          backgroundColor: 'white',
          flex: 1,
          height: screenHeight,
          width: screenWidth,
          margin: 0,
        }}
      >
        <ActivityIndicator animating={true} size="large" color="#0000ff" />
      </Modal>
    )
  }
  return (
    <ScrollView>
      <Card
       theme={{ colors: { surface: 'transparent' } }}
        style={{
          backgroundColor: 'white',
          borderWidth: 0,
          shadowOpacity: 0,
          shadowColor: 'transparent',
        }}
      >
        <Card.Title
          title={title}
          subtitle={author}
          titleNumberOfLines={2}
          titleStyle={{ fontWeight: 'bold', fontSize: 20,textWrap: 'wrap' }}
          style={{ marginTop: 10 }}
          subtitleStyle={{ marginVertical: 5 }}
        />
        <Card.Cover
          source={{ uri: image }}
          style={{
            marginHorizontal: 14,
            marginTop: 7,
          }}
        />
        <Card.Content>
          <Text
            variant="titleLarge"
            style={{ marginVertical: 10, fontSize: 16, textAlign: 'justify' }}
          >
            {content}
          </Text>

          <Text variant="bodyMedium" style={{ marginTop: 5 }}>
            {tags != null &&
              [...tags].map((tag, index) => (
                <Chip
                  key={index}
                  style={{ backgroundColor: '#d2fcec', margin: 5 }}
                >
                  {tag}
                </Chip>
              ))}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}
