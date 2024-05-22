import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateAdapter } from "../models";

dayjs.extend(utc);

export class DayJsAdapter implements IDateAdapter {
    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
    addHours(currentDate: Date, hours: number): Date {
        return dayjs(currentDate).add(hours, "hours").toDate();
    }
    addDays(currentDate: Date, days: number): Date {
        return dayjs(currentDate).add(days, "days").toDate();
    }
    dateNow(): Date {
        return dayjs().toDate();
    }
    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }
    compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);
        const compare = dayjs(end_date_utc).diff(
            dayjs(start_date_utc),
            "hours"
        );

        return compare;
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);
        const compare = dayjs(end_date_utc).diff(dayjs(start_date_utc), "days");

        return compare;
    }
}
