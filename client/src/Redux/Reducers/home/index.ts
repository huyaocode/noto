// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction } from "@Interfaces";
// #endregion Interface Imports

export interface IStateProps {
    home: {
        version: number;
    };
    image: {
        url: string;
        copyright: string;
    };
}

const INITIAL_STATE: IStateProps = {
    home: {
        version: 1,
    },
    image: {
        url: "",
        copyright: "--"
    },
};

export const HomeReducer = (
    state = INITIAL_STATE,
    action: IAction<{}>
) => {
    switch (action.type) {
        case ActionConsts.Home.SetReducer:
            return {
                ...state,
                ...action.payload,
            };

        case ActionConsts.Home.ResetReducer:
            return INITIAL_STATE;

        default:
            return state;
    }
};
