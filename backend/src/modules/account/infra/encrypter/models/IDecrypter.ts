export interface IDecrypter {
    decrypt(value: string): IDecrypter.IResponse;
}

export namespace IDecrypter {
    export interface IResponse {
        iat: number;
        exp: number;
        email: string;
        sub: string | object;
    }
}
