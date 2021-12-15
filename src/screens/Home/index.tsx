import React, { useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import * as S from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { LoadAnimation } from "../../components/LoadAnimation";
import { useNetInfo } from '@react-native-community/netinfo'

// const ButtonAnimated = Animated.createAnimatedComponent(S.MyCarsButton)

export const Home: React.FC = () => {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const netInfo = useNetInfo()
  // const positionY = useSharedValue(0)
  // const positionX = useSharedValue(0)

  // const myCarsButtonStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     { translateX: positionX.value },
  //     { translateY: positionY.value },
  //   ]
  // }))

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.positionX = positionX.value
  //     ctx.positionY = positionY.value
  //   },
  //   onActive(event, ctx: any){
  //     positionX.value = ctx.positionX + event.translationX
  //     positionY.value = ctx.positionY + event.translationY
  //   },
  //   onEnd(){
  //     positionX.value = withSpring(0)
  //     positionY.value = withSpring(0)
  //   }
  // })

  useEffect(() => {
    let isMounted = true
    
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        console.log(isMounted)
        isMounted && setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setLoading(false);
      }
    }

    fetchCars();
    return () => {
      isMounted = false
    }
  }, []);

  useEffect(() => {
    if(netInfo.isConnected) {
      Alert.alert('Você está On-Line')
    } else {
      Alert.alert('Você está Of-Line')
    }
  }, [netInfo.isConnected])

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
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

      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[myCarsButtonStyle, { position: 'absolute', bottom: 13, right: 12 }]}>
          <ButtonAnimated onPress={handleOpenMyCars}>
                <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </S.Container>
  );
};
