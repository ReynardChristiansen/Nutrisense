import styled from 'styled-components/native'
import Text from '../../components/text'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Header() {
  return (
    <HeaderView>
      {/* <Icon_Back text="Back" ml={7} /> */}
      <MaterialCommunityIcons name="post-outline" size={50} color={'#32CC8F'}/>
      <Margin px={5} />
      <Text size={"25px"} family={'Jakarta-b'} color={'#32CC8F'}>
        Explore What You Want To Know
      </Text>
    </HeaderView>
  )
}

const HeaderView = styled.View`
  flex-direction: row;
  flex-wrap:wrap;
  margin: 10px 10px 10px 10px;
  align-items:center;
`

const HorizontalAlign = styled.View`
  flex-direction: row;
  background-color: #fff;
  border: 4px solid ${({ theme }) => theme.colors.grey1};
  border-radius: 50px;
  padding: 5px 10px;
`

const Margin = styled.View`
  width: ${(props) => props.px}px;
`
