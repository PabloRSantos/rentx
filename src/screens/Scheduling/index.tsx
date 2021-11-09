import React from 'react';
import { useTheme } from 'styled-components/native';
import { BackButton } from '../../components/BackButton';
import * as S from './styles';
import ArrowSvg from '../../assets/arrow.svg'
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

export const Scheduling: React.FC = () => {
  const theme = useTheme()

  return (
    <S.Container>
       <S.Header>
         <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
         />
        <BackButton color={theme.colors.shape} onPress={() => {}} />
        <S.Title>Escolha uma{`\n`}data de início e{`\n`}fim do aluguel</S.Title>
        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue selected={false}>18/06/2021</S.DateValue>
          </S.DateInfo>
          <ArrowSvg />
          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={false}>18/06/2021</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar />
      </S.Content>

      <S.Footer>
        <Button title="Confirmar" />
      </S.Footer>
    </S.Container>
  );
};

