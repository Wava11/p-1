import { User } from "../user/user";
import { DayId, days } from '../../utils/day';

export type Assignment = Record<DayId, User>;