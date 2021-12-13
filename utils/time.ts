import moment, { Moment } from "moment";
import { Day } from "./day";

export const firstDate = (date1: Date, date2: Date): Date =>
    moment(date1).isBefore(date2) ? date1 : date2;

export const dateOfDayInNextWeek = (day: Day): Moment =>
    moment().add(1, 'week').startOf("week").add(day._id, "days");

export const startOfNextWeek = (): Moment =>
    moment().add(1, 'week').startOf("week");

export interface Timed {
    date: Date;
}