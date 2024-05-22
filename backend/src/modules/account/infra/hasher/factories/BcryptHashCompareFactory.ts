import { BcryptAdapter } from "../implementations";
import { IHashCompare } from "../models";

export const makeBcryptHashCompare = (): IHashCompare => new BcryptAdapter();
