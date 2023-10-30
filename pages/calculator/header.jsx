import styled from 'styled-components/native'
//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from '../../components/text'
export default function Header() {
  return (
    <HeaderView>
      <MaterialCommunityIcons name="calculator" size={50} color={'#32CC8F'}/>
      <Margin px={5} />
      <Text size={"18px"} family={'Jakarta-b'} color={'#32CC8F'}>
        Calculate What You Need
      </Text>
    </HeaderView>
  )
}

const HeaderView = styled.View`
  flex-direction: row;
  flex-wrap:wrap;
  margin: 10px 10px 2px 10px;
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
