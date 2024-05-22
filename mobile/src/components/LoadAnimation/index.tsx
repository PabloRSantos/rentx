import React from "react";
import { Container } from "./styles";
import LottieView from "lottie-react-native";
import loadingCar from "../../assets/loadingCar.json";

export const LoadAnimation: React.FC = () => {
  return (
    <Container>
      <LottieView
        style={{ height: 200 }}
        resizeMode="contain"
        loop
        autoPlay
        source={loadingCar}
      />
    </Container>
  );
};
