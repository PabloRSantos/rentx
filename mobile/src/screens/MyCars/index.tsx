import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { api } from "../../services/api";
import * as S from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { LoadAnimation } from "../../components/LoadAnimation";
import { Car as ModelCar } from "../../database/model/Car";
import { parseISO, format } from "date-fns";

interface DataProps {
  id: string
  car: ModelCar
  start_date: string
  end_date: string
}

export const MyCars: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const screenIsFocus = useIsFocused()

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get<DataProps[]>(`/rentals`);

        const dataFormatted = response.data.map(data => ({
          id: data.id,
          car: data.car,
          start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
          end_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
        }))

        setCars(dataFormatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [screenIsFocus]);

  return (
    <S.Container>
      <S.Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} onPress={handleBack} />
        <S.Title>
          Escolha uma{`\n`}data de início e{`\n`}fim do aluguel
        </S.Title>
        <S.SubTitle>Conforto, segurança e praticidade.</S.SubTitle>
      </S.Header>

      <S.Content>
        <S.Appointments>
          <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
          <S.AppointmentsQuantity>{cars.length}</S.AppointmentsQuantity>
        </S.Appointments>

        {loading ? (
          <LoadAnimation />
        ) : (
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <S.CarWrapper>
                <Car data={item.car} />
                <S.CarFooter>
                  <S.CarFooterTitle>Período</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{item.start_date}</S.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <S.CarFooterDate>{item.end_date}</S.CarFooterDate>
                  </S.CarFooterPeriod>
                </S.CarFooter>
              </S.CarWrapper>
            )}
          />
        )}
      </S.Content>
    </S.Container>
  );
};
