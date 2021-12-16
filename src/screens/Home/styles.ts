import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Car } from '../../database/model/Car';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 113px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    justify-content: flex-end;
    padding: 32px 24px;
    background-color: ${({ theme }) => theme.colors.header};
`

export const HeaderContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const TotalCars = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`

export const CarList = styled(FlatList as new () => FlatList<Car>).attrs({
    contentContainerStyle: {
        padding: 24
    },
    showVerticalScrollIndicator: false
})`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`

export const MyCarsButton = styled(RectButton)`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.main};

`