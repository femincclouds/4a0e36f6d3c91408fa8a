import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationStack } from "../types/navigation";
import Home from "../screens/Home";
import CreateSlots from "../screens/CreateSlots";
import RegisterSlots from "../screens/RegisterSlots";
import ClearSlots from "../screens/ClearSlots";

const { Navigator, Screen } = createNativeStackNavigator<NavigationStack>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} />
        <Screen
          name="CreateSlots"
          component={CreateSlots}
          options={{ title: "Create Slots" }}
        />
        <Screen
          name="RegisterSlots"
          component={RegisterSlots}
          options={{ title: "Register Slots" }}
        />
        <Screen
          name="ClearSlots"
          component={ClearSlots}
          options={{ title: "Clear Slots" }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
