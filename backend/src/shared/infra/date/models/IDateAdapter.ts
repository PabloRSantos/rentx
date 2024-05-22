export interface IDateAdapter {
    compareInHours(start_date: Date, end_date: Date): number;
    compareInDays(start_date: Date, end_date: Date): number;
    addDays(currentDate: Date, days: number): Date;
    addHours(currentDate: Date, hours: number): Date;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}
