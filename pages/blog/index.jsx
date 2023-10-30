import styled, { useTheme } from 'styled-components/native'
import FullPageBlog from './fullpage-blog'
import { createStackNavigator } from '@react-navigation/stack'
import BlogListScreen from './blog-list'
export default function BlogPage() {
  const theme = useTheme()
  //do some fetching to the backend
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator >
      <Stack.Screen name="Blog" component={BlogListScreen} />
      <Stack.Screen name="Blog Page" component={FullPageBlog} />
    </Stack.Navigator>
  )
}


