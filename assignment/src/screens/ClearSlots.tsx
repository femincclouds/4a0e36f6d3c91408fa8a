import React, { useContext, useMemo } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Button, Title, List, Paragraph } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment, { Moment } from "moment";

import { AppContext } from "../contexts/AppContext";
import { httpCheck } from "../actions";
import { NavigationStack } from "../types/navigation";
import { UPDATE_SLOTS } from "../contexts/types";

type Props = {
  navigation: NativeStackNavigationProp<NavigationStack, "ClearSlots">;
};

const ClearSlots: React.FC<Props> = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);

  const slots = useMemo(() => Object.values(state.parkingSlots), [state]);

  const calculateAmount = (time: Moment) => {
    const hours: number = moment().diff(time, "hours");
    if (hours <= 2) {
      return 10;
    }
    return (hours - 1) * 10;
  };

  const calculateTime = (time: Moment) => {
    const hours: number = moment().diff(time, "hours");
    return hours || 1;
  };

  const clearSlot = async (id: string) => {
    const { [id]: slot, ...rest } = state.parkingSlots;
    const status = await httpCheck(slot.regNo, calculateAmount(slot.createdAt));
    if (status) {
      dispatch({
        type: UPDATE_SLOTS,
        payload: {
          ...rest,
          [id]: {
            slotId: id,
            createdAt: moment(),
            regNo: "",
          },
        },
      });
      Alert.alert("", "Slot deallocated successfully");
    } else {
      Alert.alert("", "Slot deallocation failed");
    }
  };

  return (
    <View style={styles.container} testID="deregister-car-registration">
      <FlatList
        data={slots}
        keyExtractor={(item) => item.slotId}
        ListEmptyComponent={<Title>No slots are filled</Title>}
        renderItem={({ item, index }) => {
          if (!item.regNo) return null;
          return (
            <List.Section
              testID={`parking-drawing-space-${index} parking-drawing-registered-${index}`}
            >
              <Title testID={`parking-drawing-space-number-${index}`}>
                ID: {item.slotId}
              </Title>
              <Paragraph>Reg no: {item.regNo}</Paragraph>
              <Paragraph testID="deregister-time-spent">
                Time spent: {calculateTime(item.createdAt)}
              </Paragraph>
              <Paragraph testID="deregister-charge">
                Amount: {calculateAmount(item.createdAt)}
              </Paragraph>
              <Button
                onPress={() => clearSlot(item.slotId)}
                testID="deregister-payment-button"
              >
                Payment taken
              </Button>
            </List.Section>
          );
        }}
      />
      <Button onPress={navigation.goBack} testID="deregister-back-button">
        Back
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
});

export default ClearSlots;
