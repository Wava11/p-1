export const days = [
    { _id: 0, name: "ראשון" },
    { _id: 1, name: "שני" },
    { _id: 2, name: "שלישי" },
    { _id: 3, name: "רביעי" },
    { _id: 4, name: "חמישי" },
    { _id: 5, name: "שישי" },
    { _id: 6, name: "שבת" }
] as const;

export type Day = (typeof days)[number];