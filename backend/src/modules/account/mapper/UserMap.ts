import { IUserResponseDTO } from "../dtos";
import { User } from "../infra/typeorm/entities";

export class UserMap {
    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
    }: User): IUserResponseDTO {
        const avatarUrl = avatar
            ? `${process.env.STORAGE_URL}/avatar/${avatar}`
            : null;

        return {
            email,
            name,
            id,
            avatar,
            avatar_url: avatarUrl,
            driver_license,
        };
    }
}
