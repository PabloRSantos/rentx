import React from "react";
import { StatusBar } from "react-native";
import * as S from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";

export const Home: React.FC = () => {
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
          <S.TotalCars>Total de 12 carros</S.TotalCars>
        </S.HeaderContent>
      </S.Header>

      <S.CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Car
            data={{
              thumbnail: "https://pngimg.com/uploads/audi/audi_PNG99491.png",
              name: "Audi",
              brand: "RS 5 Coupé",
              rent: {
                price: 120,
                period: "Ao dia",
              },
            }}
          />
        )}
      />
    </S.Container>
  );
};
