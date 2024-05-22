import { JwtAdapter } from "../implementations";
import { IEncrypter } from "../models";

export const makeJwtEncrypter = (): IEncrypter => new JwtAdapter();
