import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { Confirmation } from "../screens/Confirmation";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { CarDTO } from "../dtos/CarDTO";
import { Car } from "../database/model/Car";
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CarDetails: { car: Car };
      Scheduling: { car: Car };
      Confirmation: { title: string; message: string; nextScreenRoute?: string };
      MyCars: undefined;
      SchedulingDetails: {
        car: Car;
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
