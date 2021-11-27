import { Day } from "../../utils/day";
import { Priority } from "../../utils/priority";

export interface Preference {
    isAvailable: boolean;
    day: Day;
    priority: Priority;
}

export interface AbsolutePreference extends Preference {
    date: Date;
}