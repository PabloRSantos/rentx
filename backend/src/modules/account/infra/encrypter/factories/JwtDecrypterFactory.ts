import { JwtAdapter } from "../implementations";
import { IDecrypter } from "../models";

export const makeJwtDecrypter = (): IDecrypter => new JwtAdapter();
