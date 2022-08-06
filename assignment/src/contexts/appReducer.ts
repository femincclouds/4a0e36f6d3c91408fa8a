import { State, Action } from "../types/context";
import { UPDATE_SLOTS, CREATE_SLOTS, REGISTER_SLOTS } from "./types";

export const initState: State = {
  parkingSlots: {},
};

export function appReducer(state = initState, action: Action): State {
  switch (action.type) {
    case CREATE_SLOTS:
      return {
        parkingSlots: {
          ...state.parkingSlots,
          ...action.payload,
        },
      };
    case REGISTER_SLOTS:
      return {
        parkingSlots: {
          ...state.parkingSlots,
          [action.payload.slotId]: action.payload,
        },
      };
    case UPDATE_SLOTS:
      return {
        parkingSlots: action.payload,
      };
    default:
      return state;
  }
}
