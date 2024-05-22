import { EtherealAdapter } from "../implementations";
import { IMailAdapter } from "../models";

export const makeEtheralAdapter = (): IMailAdapter => {
    return new EtherealAdapter();
};
