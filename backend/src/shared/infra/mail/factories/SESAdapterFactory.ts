import { SESAdapter } from "../implementations";
import { IMailAdapter } from "../models";

export const makeSESAdapter = (): IMailAdapter => {
    return new SESAdapter();
};
