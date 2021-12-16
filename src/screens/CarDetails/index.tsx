import React, { useEffect, useState } from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import * as S from "./styles";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { StatusBar } from "react-native";
import { Car as ModelCar } from "../../database/model/Car";
import { api } from "../../services/api";
import { useNetInfo } from "@react-native-community/netinfo";
interface Params {
  car: ModelCar;
}

export const CarDetails: React.FC = () => {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;
  const netInfo = useNetInfo();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
  }));

  const sliderCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
  }));

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate("Scheduling", { car });
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    netInfo.isConnected && fetchCarUpdated();
  }, [netInfo.isConnected, car]);

  return (
    <S.Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <S.HeaderContainer style={[headerStyleAnimation]}>
        <S.Header>
          <BackButton onPress={handleBack} />
        </S.Header>

        <S.CarImages style={sliderCarsStyleAnimation}>
          <ImageSlider
            imagesUrl={
              !!carUpdated.photos
                ? carUpdated.photos
                : [{ id: car.thumbnail, photo: car.thumbnail }]
            }
          />
        </S.CarImages>
      </S.HeaderContainer>

      <S.Content onScroll={scrollHandler}>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>R$ {netInfo.isConnected ? car.price : "..."}</S.Price>
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

        <S.About>{car.about}</S.About>
      </S.Content>

      <S.Footer>
        <Button
          onPress={handleConfirmRental}
          title="Escolher período de aluguel"
          enabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === false && (
          <S.OfflineInfo>
            Conecte-se a Internet para ver mais detalhes e agendar seu carro
          </S.OfflineInfo>
        )}
      </S.Footer>
    </S.Container>
  );
};
