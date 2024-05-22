import { hash, compare } from "bcrypt";

import { IHashCompare, IHasher } from "../models";

export class BcryptAdapter implements IHasher, IHashCompare {
    compare(value: string, hash: string): Promise<boolean> {
        return compare(value, hash);
    }
    hash(value: string, salt: number): Promise<string> {
        return hash(value, salt);
    }
}
