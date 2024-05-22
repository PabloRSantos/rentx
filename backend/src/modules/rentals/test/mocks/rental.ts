import dayjs from "dayjs";

import { ICreateRentalDTO } from "@/modules/rentals/dtos";

interface IMakeRentalProps {
    user_id?: string;
    car_id?: string;
    expected_return_date?: Date;
}

export const makeRental = ({
    user_id = "123",
    car_id = "321",
    expected_return_date = dayjs().add(1, "day").toDate(),
}: IMakeRentalProps = {}): ICreateRentalDTO => ({
    user_id,
    car_id,
    expected_return_date,
});
