export * from "./store";
import { Action as ReduxAction } from "redux";

export interface IAction<T> extends ReduxAction {
    payload?: T;
}

import { IStateProps as ICommonStateProps } from "./Reducers/common";

export interface IStore {
    common: ICommonStateProps;
}