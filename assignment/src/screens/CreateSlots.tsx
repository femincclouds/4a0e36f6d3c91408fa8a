import React, { useContext, useMemo, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Title, Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";

import { AppContext } from "../contexts/AppContext";
import { ParkingLot, Slot } from "../types/context";
import { NavigationStack } from "../types/navigation";
import { CREATE_SLOTS } from "../contexts/types";

type Props = {
  navigation: NativeStackNavigationProp<NavigationStack, "CreateSlots">;
};

const CreateSlots: React.FC<Props> = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const [slots, setSlots] = useState<string>("");

  const slotCount = useMemo(
    () => Object.keys(state.parkingSlots).length,
    [state]
  );

  const handlePress = () => {
    const count = Number(slots);
    if (count !== NaN) {
      const slotMap: ParkingLot = {};
      for (let i = 0; i < count; i++) {
        const slotId = Math.random().toString();
        const slot: Slot = {
          slotId,
          createdAt: moment(),
          regNo: "",
        };
        slotMap[slotId] = slot;
      }
      Alert.alert("", "Slots created successfully!");
      dispatch({ type: CREATE_SLOTS, payload: slotMap });
      setSlots("");
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Title>{slotCount ? slotCount : "No"} slots are created so far</Title>
      <TextInput
        value={slots}
        onChangeText={setSlots}
        mode="outlined"
        label="How many slots do you want to create?"
        maxLength={2}
        keyboardType="number-pad"
        style={styles.input}
        testID="parking-create-text-input"
      />
      <Button
        mode="contained"
        onPress={handlePress}
        disabled={!slots}
        contentStyle={styles.button}
        testID="parking-create-submit-button"
      >
        Create
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

export default CreateSlots;
