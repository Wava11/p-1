import { ObjectId } from "mongodb";
import { Day } from "../../utils/day";
import { Priority } from "../../utils/priority";
import { Timed } from '../../utils/time';

export interface MinimalPreference {
    isAvailable: boolean;
    day: Day;
    priority?: Priority;
}

export interface Preference extends Required<MinimalPreference> {
}

export interface AbsolutePreference extends Preference, Timed {
    userId: ObjectId;
}