import { ShowMessageArgs } from "@/types/global-message";
import actions from "./actions";
import { InitialState } from "./data";

type ACTION_TYPE =
  | { type: typeof actions.SHOW_MESSAGE; payload: ShowMessageArgs }
  | { type: typeof actions.HIDE_MESSAGE; payload: null };

export const reducer = (
  state: InitialState,
  action: ACTION_TYPE
): InitialState => {
  switch (action.type) {
    case actions.SHOW_MESSAGE:
      if (action.payload)
        return {
          visible: true,
          message: action.payload.message,
          type: action.payload.type,
        };
    case actions.HIDE_MESSAGE:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};
