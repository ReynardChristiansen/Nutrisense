import BlogItem from './blog-item'
import React, { useEffect, useState, useCallback } from 'react'
import { ScrollView,View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from './header'
import BlogList from './blog-content-list'
import { Searchbar} from 'react-native-paper'
export default function BlogListScreen() {
  const [blogs, setBlogs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const onChangeSearch = (query) => setSearchQuery(query)
  useEffect(()=>setBlogs(BlogList()),[])
  const filterBlogs = useCallback(() => {
    const blogList = BlogList()
    const result = blogList.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setBlogs(result)
  }, [blogs])

  return (
    <View style={{ flex:1,backgroundColor:'white' }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          marginHorizontal:10,
          marginTop: 20,
          marginBottom: 20,
          backgroundColor: 'white',
          borderColor: '#33cc8f',
          borderWidth: 1, }}
        onSubmitEditing={() => filterBlogs()}
      />

      <ScrollView style={BlogContainer} contentContainerStyle={WrapBlogItem}>
        {blogs.map((blog, index) => (
          <BlogItem key={index} blog={blog} />

        ))}
      </ScrollView>
    </View>
  )
}

const BlogContainer = {
  width: '100%',
  paddingHorizontal: 10,
}
const WrapBlogItem = {
  display: 'flex',
  height: 'auto',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  paddingBottom: 100,
}
