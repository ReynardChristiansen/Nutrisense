export const getOptimalRatio = (ratios) => {
  const ratio = ratios[ratios.length - 1]
  return ratio
}

export const toggleCameraType = () =>
  setType((current) =>
    current === CameraType.back ? CameraType.front : CameraType.back
  )

