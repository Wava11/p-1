import { MinimalPreference } from "../../entities/preference/preference";

export const areAllPreferencesValid = (preferences: MinimalPreference[]): boolean =>
    preferences.every(p => p?.day != undefined);