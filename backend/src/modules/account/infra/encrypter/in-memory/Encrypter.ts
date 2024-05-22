import { IEncrypter } from "../models";

export class EncrypterInMemory implements IEncrypter {
    value: string | object;
    options: IEncrypter.IOptions;

    encrypt(value: string | object, options: IEncrypter.IOptions): string {
        this.value = value;
        this.options = options;

        return String(value);
    }
}
