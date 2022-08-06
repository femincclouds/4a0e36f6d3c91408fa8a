import { Moment } from "moment";
import { Dispatch } from "react";

import { CREATE_SLOTS, REGISTER_SLOTS, UPDATE_SLOTS } from "../contexts/types";

export interface Slot {
  slotId: string;
  createdAt: Moment;
  regNo: string;
}

export interface ParkingLot {
  [id: string]: Slot;
}

export interface State {
  parkingSlots: ParkingLot;
}

export type UpdateAction = {
  type: typeof UPDATE_SLOTS;
  payload: ParkingLot;
};

export type CreateAction = {
  type: typeof CREATE_SLOTS;
  payload: ParkingLot;
};

export type RegisterAction = {
  type: typeof REGISTER_SLOTS;
  payload: Slot;
};

export type Action = CreateAction | UpdateAction | RegisterAction;

export interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}
