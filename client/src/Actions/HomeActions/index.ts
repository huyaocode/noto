// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import ActionType from "../ActionTypes";
import { PlanetaryService } from "@/API/Planetary";
// #endregion Local Imports

export const HomeActions = {
    Map: (payload: {}) => ({
        payload,
        type: ActionType.Home.SetReducer,
    }),

    Reset: () => ({
        type: ActionType.Home.ResetReducer,
    }),

    GetApod: (payload: {params: {}}) => async (
        dispatch: Dispatch
    ) => {
        const result = await PlanetaryService.GetPlanetImage({
            params: payload.params,
        });

        dispatch({
            payload: {
                image: result,
            },
            type: ActionType.Home.SetReducer,
        });
    },
};
