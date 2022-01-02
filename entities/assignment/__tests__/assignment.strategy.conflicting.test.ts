import { ObjectId } from "mongodb";
import { Day, days } from "../../../utils/day";
import { priorities, Priority } from "../../../utils/priority";
import { User } from "../../user/user";
import { UserCurrentWeekPreferenceWithScore } from "../../user/user.request";
import { AssignmentStrategy } from "../assignment.strategy";
import { generateUserCurrentWeekSinglePreference } from "./conflicting.tests.utils";

const user1: User = {
    _id: new ObjectId(),
    name: "cow"
};
const user2: User = {
    _id: new ObjectId(),
    name: "donkey"
};

const conflictingDay: Day = days[2];

describe("AssignmentStrategy", () => {
    const strategy = new AssignmentStrategy({} as any);
    describe("assignConflictingPreferences", () => {
        describe("conflicting isAvailable=true preferences", () => {
            const isAvailable = true;
            describe("same priority", () => {
                const priority: Priority = priorities[0];
                describe("different scores", () => {
                    const higherScore = 10;
                    const lowerScore = higherScore - 2;
                    test("assigns user whose score is higher", () => {
                        const higherScoredUserCurrentWeekPreferences = generateUserCurrentWeekSinglePreference(
                            user1, conflictingDay, priority, isAvailable, higherScore
                        );
                        const lowerScoredUserCurrentWeekPreferences = generateUserCurrentWeekSinglePreference(
                            user2, conflictingDay, priority, isAvailable, lowerScore
                        );
                        const assignment = strategy.assignConflictingPreferences([higherScoredUserCurrentWeekPreferences, lowerScoredUserCurrentWeekPreferences]);
                        expect(assignment[conflictingDay._id]).toEqual(user1);
                    });
                });
                describe("same scores", () => {
                    const score = 20;
                    describe("users have different amount of preferences", () => {
                        const preferencesOfUserWithFewerPreferences = generateUserCurrentWeekSinglePreference(
                            user1, conflictingDay, priority, isAvailable, score
                        );
                        const preferencesOfUserWithMorePreferences = generateUserCurrentWeekSinglePreference(
                            user2, conflictingDay, priority, isAvailable, score
                        );
                        preferencesOfUserWithMorePreferences.currentWeekPreferences.push({ day: days[4], isAvailable: false, priority });
                        test("assigns user with fewer isAvailable=false preferences", () => {
                            const assignment = strategy.assignConflictingPreferences([preferencesOfUserWithFewerPreferences, preferencesOfUserWithMorePreferences]);
                            expect(assignment[conflictingDay._id]).toEqual(user1);
                        });
                    });
                    describe("users have the same amount of preferences", () => {
                        const firstUserCurrentWeekPreferences = generateUserCurrentWeekSinglePreference(
                            user1, conflictingDay, priority, isAvailable, score
                        );
                        const secondUserCurrentWeekPreferences = generateUserCurrentWeekSinglePreference(
                            user2, conflictingDay, priority, isAvailable, score
                        );
                        test("assigns first user", () => {
                            const assignment = strategy.assignConflictingPreferences([firstUserCurrentWeekPreferences, secondUserCurrentWeekPreferences]);
                            expect(assignment[conflictingDay._id]).toEqual(user1);
                        });
                    });
                });
            });
            describe("different priorities", () => {
                const higherPriority = priorities[0];
                const lowerPriority = priorities[2];
                describe("different scores", () => {
                    const higherScore = 10;
                    const lowerScore = higherScore - 2;
                    describe("higher priority with higher score", () => {
                        const firstUserPreferences = generateUserCurrentWeekSinglePreference(
                            user1, conflictingDay, lowerPriority, isAvailable, lowerScore
                        );
                        const secondUserPreferences = generateUserCurrentWeekSinglePreference(
                            user2, conflictingDay, higherPriority, isAvailable, higherScore
                        );
                        test("assigns user with higher score", () => {
                            const assignment = strategy.assignConflictingPreferences([firstUserPreferences, secondUserPreferences]);
                            expect(assignment[conflictingDay._id]).toEqual(user2);
                        });
                    });
                    describe("lower priority with higher score", () => {
                        const firstUserPreferences = generateUserCurrentWeekSinglePreference(
                            user1, conflictingDay, lowerPriority, isAvailable, higherScore
                        );
                        const secondUserPreferences = generateUserCurrentWeekSinglePreference(
                            user2, conflictingDay, higherPriority, isAvailable, lowerScore
                        );
                        test("assigns user with higher score", () => {
                            const assignment = strategy.assignConflictingPreferences([firstUserPreferences, secondUserPreferences]);
                            expect(assignment[conflictingDay._id]).toEqual(user1);
                        });
                    });
                });
                describe("same scores", () => {
                    const score = 399;
                    const firstUserPreferences = generateUserCurrentWeekSinglePreference(
                        user1, conflictingDay, lowerPriority, isAvailable, score
                    );
                    const secondUserPreferences = generateUserCurrentWeekSinglePreference(
                        user2, conflictingDay, higherPriority, isAvailable, score
                    );
                    test("assigns user whose preference has higher priority", () => {
                        const assignment = strategy.assignConflictingPreferences([firstUserPreferences, secondUserPreferences]);
                        expect(assignment[conflictingDay._id]).toEqual(user2);
                    });
                });
            });
        });
        describe("conflicting isAvailable=false preferences", () => {
            describe("same priority", () => {
                describe("different scores", () => {
                    test("assigns user whose score is LOWER", () => {

                    });
                });
                describe("same scores", () => {
                    describe("users have different amount of preferences", () => {
                        test("assigns user with MORE preferences", () => {

                        });
                    });
                    describe("users have the same amount of preferences", () => {
                        test("assigns first user", () => {

                        });
                    });
                });
            });
            describe("different priorities", () => {
                describe("different scores", () => {
                    describe("higher priority with higher score", () => {
                        test("assigns user with LOWER score", () => {

                        });
                    });
                    describe("lower priority with higher score", () => {
                        test("assigns user with LOWER score", () => {

                        });
                    });
                });
                describe("same scores", () => {
                    test("assigns user whose preference has LOWER priority", () => {

                    });
                });
            });
        });
    });
});