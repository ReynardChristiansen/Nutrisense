

export const createFormDataWithImages = (image) => {
  const data = new FormData()
  data.append('image', {
    uri: image,
    type: 'image/jpeg',
    name: 'image.jpg',
  })
  return data
}


export const createFormDataWithText = (query) => {
  const data = new FormData()
  data.append('query',query)
  return data
}