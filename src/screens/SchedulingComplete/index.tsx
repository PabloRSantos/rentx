import React from "react";
import * as S from "./styles";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";

export const SchedulingComplete: React.FC = () => {
  const { width } = useWindowDimensions();

  return (
    <S.Container>
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
        <ConfirmButton title="OK" />
      </S.Footer>
    </S.Container>
  );
};
