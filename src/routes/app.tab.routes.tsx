import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";
import { AppStackRoutes } from "./app.stack.routes";

const { Navigator, Screen } = createBottomTabNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      MyCars: undefined;
      Splash: undefined
      Profile: undefined
    }
  }
}

export const AppTabRoutes = () => {
  return (
    <Navigator>
      <Screen name="Home" component={AppStackRoutes} />
      <Screen name="Profile" component={Home} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
};
