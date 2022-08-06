import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";

import { AppContext } from "../contexts/AppContext";
import { Slot } from "../types/context";
import { NavigationStack } from "../types/navigation";
import { REGISTER_SLOTS } from "../contexts/types";

type Props = {
  navigation: NativeStackNavigationProp<NavigationStack, "RegisterSlots">;
};

const RegisterSlots: React.FC<Props> = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const [regNo, setRegNo] = useState<string>("");

  const handlePress = () => {
    let doesIdExist: boolean = false;
    const freeSlot = Object.keys(state.parkingSlots).find((slotKey) => {
      if (state.parkingSlots[slotKey].regNo === regNo) {
        doesIdExist = true;
      }
      return !state.parkingSlots[slotKey].regNo;
    });
    if (doesIdExist) {
      Alert.alert("", "Vehicle is already registered.");
      return;
    }
    if (!freeSlot) {
      Alert.alert("", "No slots are available right now.");
      return;
    }
    const newSlot: Slot = {
      slotId: freeSlot,
      createdAt: moment(),
      regNo,
    };
    dispatch({ type: REGISTER_SLOTS, payload: newSlot });
    Alert.alert("", "Vehicle registered successfully");
    setRegNo("");
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={regNo}
        onChangeText={setRegNo}
        mode="outlined"
        label="Enter registration number"
        maxLength={10}
        style={styles.input}
        testID="parking-drawing-registration-input"
      />
      <Button
        mode="contained"
        onPress={handlePress}
        disabled={!regNo}
        contentStyle={styles.button}
        testID="parking-drawing-add-car-button"
      >
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
  input: {
    marginBottom: 20,
  },
  button: {
    height: 50,
  },
});

export default RegisterSlots;
