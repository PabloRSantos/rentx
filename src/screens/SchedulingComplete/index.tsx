import 'react-native-gesture-handler'
import React from "react";
import * as S from "./styles";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { StatusBar, useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation } from '@react-navigation/native'

export const SchedulingComplete: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation()

  function handleConfirm() {
    navigation.navigate('Home')
  }

  return (
    <S.Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LogoSvg width={width} />

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>Carro alugado</S.Title>
        <S.Message>
          Agora você só precisa ir{"\n"}até a concessionário da RENTX {"\n"}
          pegar o seu automóvel
        </S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton onPress={handleConfirm} title="OK" />
      </S.Footer>
    </S.Container>
  );
};
