import { Dispatch } from "redux";
import ActionType from "./ActionTypes";

export const CommonActions = {
    SetActiveMenu: (payload: string) => ({
        payload,
        type: ActionType.Common.SetActiveMenu,
    }),
};
