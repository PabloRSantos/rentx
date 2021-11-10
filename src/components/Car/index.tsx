import React from 'react';
import * as S from './styles';
import GasolineSvg from '../../assets/gasoline.svg'
import { RectButtonProps } from 'react-native-gesture-handler';

interface CarData {
  brand: string
  name: string
  rent: {
    period: string
    price: number
  }
  thumbnail: string
}

interface Props extends RectButtonProps {
  data: CarData
}

export const Car: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <S.Container {...rest}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.rent.period}</S.Period>
            <S.Price>R$ {data.rent.price}</S.Price>
          </S.Rent>

          <S.Type>
            <GasolineSvg />
          </S.Type>

        </S.About>
      </S.Details>

      <S.CarImage resizeMode="contain" source={{ uri: data.thumbnail }} />
    </S.Container>
  );
};

