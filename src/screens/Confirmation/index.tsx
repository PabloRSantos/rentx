import 'react-native-gesture-handler'
import React from "react";
import * as S from "./styles";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { StatusBar, useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation, useRoute } from '@react-navigation/native'

interface RouteParams {
  title: string
  message: string
  nextScreenRoute: string
}

export const Confirmation: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation()
  const route = useRoute()
  const { title, message, nextScreenRoute } = route.params as RouteParams

  function handleConfirm() {
    navigation.navigate(nextScreenRoute as any || 'Home')
  }

  return (
    <S.Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LogoSvg width={width} />

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>{title}</S.Title>
        <S.Message>
          {message}
        </S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton onPress={handleConfirm} title="OK" />
      </S.Footer>
    </S.Container>
  );
};
