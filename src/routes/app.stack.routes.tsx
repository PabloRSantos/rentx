import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { Confirmation } from "../screens/Confirmation";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { CarDTO } from "../dtos/CarDTO";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";

const { Navigator, Screen } = createStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CarDetails: { car: CarDTO };
      Scheduling: { car: CarDTO };
      Confirmation: { title: string; message: string; nextScreenRoute?: string };
      MyCars: undefined;
      SchedulingDetails: {
        car: CarDTO;
        dates: string[];
        formattedDates: string[];
      };
    }
  }
}

export const AppStackRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Home"
        component={Home}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
};
