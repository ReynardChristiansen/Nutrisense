import { useCallback, useState, useEffect} from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper'
// import { View, Image } from 'react-native';
import { blogModal, toggleLoadingScreen } from '../../store/toggle-and-content-store'
import { useNavigation } from '@react-navigation/native';
export default function BlogItem(props) {
  const { title, date, author, content, image, tags } = props.blog;
  const setModalContent = blogModal((state) => state.setContent);
  const navigation = useNavigation();

  const readMore = () => {
    setModalContent(props.blog);
    navigation.navigate('Blog Page');
  };


  return (
    <Card
      style={{
        marginVertical: 8,
        marginHorizontal: 5,
        paddingTop: 15,
        paddingBottom: 8,
        width: 370,
        backgroundColor: '#ffff',
        elevation: 3,
      }}
    >
      <Card.Title
        title={title}
        titleNumberOfLines={2}
        titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
        style={{ width: '100%', marginBottom: 3 }}
      />

      <Card.Cover
        source={{ uri: image }}
        style={{ height: 200, marginHorizontal: 14, marginBottom: 20 }}
      />
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={5} style={{ textAlign: 'justify', fontSize:16 }}>
          {content.substring(0,200)+"..."}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button style={{ display: 'none' }}>Cancel</Button>
        <Button buttonColor="#33cc8f" onPress={readMore}>
          Read More
        </Button>
      </Card.Actions>
    </Card>
  );
}