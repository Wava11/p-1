import { DayId } from "../../utils/day";
import { UserScore } from "../user/user.request";
import { HasPriority } from "./preference";

export interface PreferencesConflicts extends
    Partial<Record<
        DayId,
        {
            preferringAndAvailable: (UserScore & HasPriority & HasAmountOfPreferences)[];
            preferringAndUnavailable: (UserScore & HasPriority & HasAmountOfPreferences)[];
        }
    >> { }

interface HasAmountOfPreferences {
    amountOfPreferences: number;
}