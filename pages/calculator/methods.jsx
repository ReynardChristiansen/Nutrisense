export const getOptimalRatio = (ratios) => {
  const ratio = ratios[ratios.length - 1]
  return ratio
}

export const createFormData = (image) => {
  const data = new FormData()
  data.append('image', {
    uri: image,
    type: 'image/jpeg',
    name: 'image.jpg',
  })
  return data
}

export const toggleCameraType = () =>
  setType((current) =>
    current === CameraType.back ? CameraType.front : CameraType.back
  )