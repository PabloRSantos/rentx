import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { BackButton } from '../../components/BackButton';
import * as S from './styles';
import ArrowSvg from '../../assets/arrow.svg'
import { Alert, StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar, generateInterval, MarkedDatesProps } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native'
import { DateData } from 'react-native-calendars/src/types';
import { format, addDays } from 'date-fns'
import { CarDTO } from '../../dtos/CarDTO';
 
interface RentalPeriod {
  startFormatted: string
  endFormatted: string
}

interface Params {
  car: CarDTO;
}

export const Scheduling: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute();
  const { car } = route.params as Params;
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData)
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  function handleBack() {
    navigation.goBack()
  }

  function handleConfirmRental() {
      navigation.navigate('SchedulingDetails', {
        car, 
        dates: Object.keys(markedDates),
        formattedDates: [rentalPeriod.startFormatted, rentalPeriod.endFormatted]
      })
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if(start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)
    const interval = generateInterval(start, end)
    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(addDays(new Date(firstDate), 1), 'dd/MM/yyyy'),
      endFormatted: format(addDays(new Date(endDate), 1), 'dd/MM/yyyy'),
    })
  }

  return (
    <S.Container>
       <S.Header>
         <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
         />
        <BackButton color={theme.colors.shape} onPress={handleBack} />
        <S.Title>Escolha uma{`\n`}data de início e{`\n`}fim do aluguel</S.Title>
        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</S.DateValue>
          </S.DateInfo>
          <ArrowSvg />
          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </S.Content>

      <S.Footer>
        <Button enabled={!!rentalPeriod.endFormatted} title="Confirmar" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  );
};

