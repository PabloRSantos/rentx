import { BcryptAdapter } from "../implementations";
import { IHasher } from "../models";

export const makeBcryptHasher = (): IHasher => new BcryptAdapter();
