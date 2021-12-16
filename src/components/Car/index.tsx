import React from 'react';
import * as S from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as ModelCar } from '../../database/model/Car';
import { useNetInfo } from '@react-native-community/netinfo';
interface Props extends RectButtonProps {
  data: ModelCar
}

export const Car: React.FC<Props> = ({ data, ...rest }) => {
  const MotorIcon = getAccessoryIcon(data.fuel_type)
  const netInfo = useNetInfo()

  return (
    <S.Container {...rest}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.period}</S.Period>
            <S.Price>R$ {netInfo.isConnected === true ? data.price : '...'}</S.Price>
          </S.Rent>

          <S.Type>
            <MotorIcon />
          </S.Type>

        </S.About>
      </S.Details>

      <S.CarImage resizeMode="contain" source={{ uri: data.thumbnail }} />
    </S.Container>
  );
};

