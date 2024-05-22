import { IHashCompare } from "../models";

export class HashCompareInMemory implements IHashCompare {
    params = {
        value: "",
        hash: "",
    };
    response = true;

    async compare(value: string, hash: string): Promise<boolean> {
        this.params = { value, hash };

        return this.response;
    }
}
