export const priorities = [
    { _id: 0, name: "גבוהה" },
    { _id: 1, name: "בינונית" },
    { _id: 2, name: "נמוכה" }
];

export type Priority = (typeof priorities)[number];