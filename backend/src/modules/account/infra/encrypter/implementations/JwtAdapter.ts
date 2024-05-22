import { sign, verify } from "jsonwebtoken";

import { authConfig } from "@/config";

import { IDecrypter, IEncrypter } from "../models";

export class JwtAdapter implements IEncrypter, IDecrypter {
    private readonly secret = authConfig.secret_token;

    decrypt(value: string): IDecrypter.IResponse {
        return verify(value, this.secret) as IDecrypter.IResponse;
    }
    encrypt(value: string | object, options: IEncrypter.IOptions): string {
        return sign(value, this.secret, options);
    }
}
