import React, { useEffect, useState } from "react";
import { StatusBar, BackHandler } from "react-native";
import * as S from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { LoadAnimation } from "../../components/LoadAnimation";
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from "styled-components/native";
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated'
import { PanGestureHandler } from "react-native-gesture-handler";

const ButtonAnimated = Animated.createAnimatedComponent(S.MyCarsButton)

export const Home: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
    ]
  }))

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX
      positionY.value = ctx.positionY + event.translationY
    },
    onEnd(){
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    }
  })

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
  }, [])

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }


  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Header>
        <S.HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && (
            <S.TotalCars>Total de {cars.length} carros</S.TotalCars>
          )}
        </S.HeaderContent>
      </S.Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <S.CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car onPress={() => handleCarDetails(item)} data={item} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[myCarsButtonStyle, { position: 'absolute', bottom: 13, right: 12 }]}>
          <ButtonAnimated onPress={handleOpenMyCars}>
                <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </S.Container>
  );
};
