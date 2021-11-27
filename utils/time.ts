import moment from "moment";

export const firstDate = (date1: Date, date2: Date): Date =>
    moment(date1).isBefore(date2) ? date1 : date2;