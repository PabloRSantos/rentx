import { DayJsAdapter } from "../implementations";
import { IDateAdapter } from "../models";

export const makeDayJsAdapter = (): IDateAdapter => {
    return new DayJsAdapter();
};
