import ActionTypes from "@Actions/ActionTypes";
import { IAction } from "@Redux";

export interface IStateProps {
}

const INITIAL_STATE: IStateProps = {
};

export const CommonReducer = (state = INITIAL_STATE, action: IAction<{}>) => {
    switch (action.type) {
        default:
            return state;
    }
};
