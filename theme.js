export const colors = {
  black: '#1E1E1E',
  white: '#F1F1F1',
  grey1: '#E0E0E0',
  grey2: '#797979',
  focusBg: '#FFF7F0',
  focusTxt: '#242375',
  calmBg: '#FAFAC8',
  calmTxt: '#000000',
}

export const typography = {
  family: {
    medium: 'Jakarta-m',
    semiBold: 'Jakarta-sb',
    bold: 'Jakarta-b',

    robotoSerifMedium: 'RobotoSerif-m',
    robotoSerifSemiBold: 'RobotoSerif-sb',
    robotoSerifBold: 'RobotoSerif-b',

    ptSerifRegular: 'PTSerif-r',
    ptSerifBold: 'PTSerif-b',

    interMedium: 'Inter-m',
    interSemiBold: 'Inter-sb',
    interBold: 'Inter-b',

    openDyslexicRegular: 'OpenDyslexic3-r',
    openDyslexicBold: 'OpenDyslexic3-b',

    comicRegular: 'Comic-r',
    comicBold: 'Comic-b',
  },
  heading: {
    sz: '18px',
    sz_i: 18,
  },
  subheading: {
    sz: '12px',
    sz_i: 12,
  },
  body: {
    sz: '14px',
    sz_i: 14,
  },
  label: {
    sz: '15px',
    sz_i: 15,
  },
  mini: {
    sz: '10px',
    sz_i: 10,
  },
}
const styles={
  container:{
    flex:1,
    backgroundColor:colors.white,
    alignItems:'center',
    justifyContent:'center',
  },
}
export default { colors, typography,styles }
