import React from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { List, TouchableRipple } from "react-native-paper";

import { NavigationStack } from "../types/navigation";

type Props = {
  navigation: NativeStackNavigationProp<NavigationStack, "Home">;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const createSlots = () => navigation.navigate("CreateSlots");
  const registerSlots = () => navigation.navigate("RegisterSlots");
  const clearSlots = () => navigation.navigate("ClearSlots");

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Actions</List.Subheader>
        <TouchableRipple onPress={createSlots} rippleColor="rgba(0,0,0,.3)">
          <List.Item title="Create Slots" />
        </TouchableRipple>
        <TouchableRipple onPress={registerSlots} rippleColor="rgba(0,0,0,.3)">
          <List.Item title="Register Slots" />
        </TouchableRipple>
        <TouchableRipple onPress={clearSlots} rippleColor="rgba(0,0,0,.3)">
          <List.Item title="Clear Slots" />
        </TouchableRipple>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
});

export default Home;
