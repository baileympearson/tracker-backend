import Joi from "joi";

export const boulder_grades = [
    "v0-",
    "v0",
    "v0+",
    "v1-",
    "v1",
    "v1+",
    "v2",
    "v3",
    "v4",
    "v5",
    "v6",
] as const;

const boulder_grades_obj = Joi.string().allow(...boulder_grades);

export const roped_grades = [
    "5.4",
    "5.5",
    "5.6",
    "5.7",
    "5.8",
    "5.9",
    "5.10a",
    "5.10b",
    "5.10c",
    "5.10d",
] as const;

const roped_grades_obj = Joi.string().allow(...roped_grades);

export type BoulderGrade = typeof boulder_grades[number];
export type SportGrade = typeof roped_grades[number];
export type TradGrade = SportGrade;
export type TopRopeGrade = SportGrade;

interface IClimbingEntry {
    date: string; // YYYY-MM-DD format
    climbingAreaName: string;
    notes?: string;
    climbName: string
    isOutdoors: boolean
}

const climbing_entry = {
    date: Joi.string(),
    climbingAreaName: Joi.string(),
    notes: Joi.string().default(""),
    climbName: Joi.string(),
    isOutdoors: Joi.boolean()
}

interface BoulderData {
    boulderName: string;
    grade: BoulderGrade;
    style: "send" | "flash" | "attempt";
}

const boulder_data = {
    boulderName: Joi.string(),
    grade: boulder_grades_obj,
    style: Joi.string().allow(...["send", "flash", "attempt"])
}

interface RopedData {
    cragName: string;
    grade: SportGrade;
    style: "onsight" | "flash" | "redpoint" | "pinkpoint" | "fell/hung";
}

const sport_data = {
    cragName: Joi.string(),
    grade: roped_grades_obj,
    style: Joi.string().allow(...["onsight", "flash", "redpoint", "pinkpoint", "fell/hung"])
}

export type BoulderEntry = IClimbingEntry & BoulderData & { type: "boulder" };
export type SportEntry = IClimbingEntry & RopedData & { type: "sport" };
export type TradEntry = IClimbingEntry & RopedData & { type: "trad" };
export type TopeRopeEntry = IClimbingEntry & RopedData & { type: "top rope" };

export const boulderSchema = Joi.object({
    ...climbing_entry,
    ...boulder_data,
    type: Joi.string().allow("boulder")
})

export const sportSchema = Joi.object({
    ...climbing_entry,
    ...sport_data,
    type: Joi.string().allow("sport")
})

export const tradSchema = Joi.object({
    ...climbing_entry,
    ...sport_data,
    type: Joi.string().allow("trad")
})

export const topRopeSchema = Joi.object({
    ...climbing_entry,
    ...sport_data,
    type: Joi.string().allow("top rope")
})

export type ClimbingEntry =
    | BoulderEntry
    | SportEntry
    | TradEntry
    | TopeRopeEntry;

export type ClimbType = ClimbingEntry["type"];

export function isBoulderEntry(entry: ClimbingEntry): entry is BoulderEntry {
    return entry.type === "boulder";
}

export function isSportEntry(entry: ClimbingEntry): entry is SportEntry {
    return entry.type === "sport";
}

export function isTradEntry(entry: ClimbingEntry): entry is TradEntry {
    return entry.type === "trad";
}

export function isTopRopeEntry(entry: ClimbingEntry): entry is TopeRopeEntry {
    return entry.type === "top rope";
}