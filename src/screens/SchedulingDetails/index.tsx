import React, { useEffect, useState } from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import * as S from "./styles";
import { Button } from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { api } from "../../services/api";
import { Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

interface Params {
  car: CarDTO;
  dates: string[];
  formattedDates: string[];
}

export const SchedulingDetails: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const route = useRoute();
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [loading, setLoading] = useState(false);
  const { car, dates, formattedDates } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    setLoading(true);
    api
      .post(`/rentals`, {
        car_id: car.id,
        user_id: 1,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      })
      .then(() =>
        navigation.navigate("Confirmation", {
          title: "Carro alugado",
          message:
            "Agora você só precisa ir\naté a concessionário da RENTX\n pegar o seu automóvel",
        })
      )
      .catch(() => {
        setLoading(false);
        Alert.alert("Não foi possivel confirmar o agendamento");
      });
  }

  const rentTotal = Number(dates.length * car.price);

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    netInfo.isConnected && fetchCarUpdated();
  }, [netInfo.isConnected, car]);

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBack} />
      </S.Header>

      <S.CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>R$ {car.price}</S.Price>
          </S.Rent>
        </S.Details>

        {carUpdated.accessories && (
          <S.Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </S.Accessories>
        )}

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{formattedDates[0]}</S.DateValue>
          </S.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{formattedDates[1]}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>
              R$ {car.price} x{dates.length} diárias
            </S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ {rentTotal}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          enabled={!loading}
          loading={loading}
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
        />
      </S.Footer>
    </S.Container>
  );
};
