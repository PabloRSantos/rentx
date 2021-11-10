import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingComplete } from '../screens/SchedulingComplete'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { CarDTO } from '../dtos/CarDTO'

const { Navigator, Screen } = createStackNavigator()

declare global {
    namespace ReactNavigation {
      interface RootParamList {
        Home: undefined;
        CarDetails: { car: CarDTO };
        Scheduling: undefined;
        SchedulingComplete: undefined;
        SchedulingDetails: undefined;
      }
    }
  }

export const StackRoutes = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Home" component={Home} />
            <Screen name="CarDetails" component={CarDetails} />
            <Screen name="Scheduling" component={Scheduling} />
            <Screen name="SchedulingComplete" component={SchedulingComplete} />
            <Screen name="SchedulingDetails" component={SchedulingDetails} />
        </Navigator>
    )
}