export interface IEncrypter {
    encrypt(value: string | object, options: IEncrypter.IOptions): string;
}

export namespace IEncrypter {
    export interface IOptions {
        expiresIn?: string | number;
        subject?: string;
        encoding?: string;
    }
}
