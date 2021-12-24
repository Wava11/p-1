import { ObjectId } from 'mongodb';
import { days } from '../../../utils/day';
import { priorities } from '../../../utils/priority';
import { User } from '../../user/user';
import { UserCurrentWeekPreference } from '../../user/user.request';
import { Assignment } from '../assignment';
import { AssignmentStrategy } from '../assignment.strategy';

const user1: User = {
    _id: new ObjectId(),
    name: "cow"
};
const user2: User = {
    _id: new ObjectId(),
    name: "donkey"
};

describe("AssignmentStrategy", () => {
    describe("assignTrivialPreferences", () => {
        const strategy = new AssignmentStrategy({} as any);

        describe("one user", () => {
            describe("isAvailable=true", () => {
                test("one preference => assigns the user in their preferred day", () => {
                    const usersRequests: UserCurrentWeekPreference[] = [
                        {
                            ...user1,
                            currentWeekPreferences: [{
                                day: days[0],
                                isAvailable: true,
                                priority: priorities[0]
                            }]
                        }
                    ];
                    const assignments = strategy.assignTrivialPreferences(usersRequests);
                    const expectedAssignments: Partial<Assignment> = {
                        "0": user1
                    };
                    expect(assignments).toEqual(expectedAssignments);
                });

                test("two preferences => assigns the user in both days", () => {
                    const usersRequests: UserCurrentWeekPreference[] = [
                        {
                            ...user1,
                            currentWeekPreferences: [{
                                day: days[0],
                                isAvailable: true,
                                priority: priorities[0]
                            }, {
                                day: days[2],
                                isAvailable: true,
                                priority: priorities[0]
                            }]
                        }
                    ];
                    const assignments = strategy.assignTrivialPreferences(usersRequests);
                    const expectedAssignments: Partial<Assignment> = {
                        "0": user1,
                        "2": user1
                    };
                    expect(assignments).toEqual(expectedAssignments);
                });
            });
            describe("isAvailable=false", () => {
                test("one preference => doesn't assign user in that day", () => {
                    const usersRequests: UserCurrentWeekPreference[] = [
                        {
                            ...user1,
                            currentWeekPreferences: [{
                                day: days[0],
                                isAvailable: false,
                                priority: priorities[0]
                            }]
                        }
                    ];
                    const assignments = strategy.assignTrivialPreferences(usersRequests);
                    expect(assignments).toEqual({});
                });

                test("two preferences => doesn't assign the user in either of the days", () => {
                    const usersRequests: UserCurrentWeekPreference[] = [
                        {
                            ...user1,
                            currentWeekPreferences: [{
                                day: days[0],
                                isAvailable: false,
                                priority: priorities[0]
                            }, {
                                day: days[2],
                                isAvailable: false,
                                priority: priorities[0]
                            }]
                        }
                    ];
                    const assignments = strategy.assignTrivialPreferences(usersRequests);
                    expect(assignments).toEqual({});
                });
            });

            describe("two preferences: one isAvailable=true and one isAvailable=false", () => {
                test("assigns the user only in their isAvailable=true preferred day", () => {
                    const usersRequests: UserCurrentWeekPreference[] = [
                        {
                            ...user1,
                            currentWeekPreferences: [{
                                day: days[0],
                                isAvailable: true,
                                priority: priorities[0]
                            },
                            {
                                day: days[3],
                                isAvailable: false,
                                priority: priorities[0]
                            }]
                        }
                    ];
                    const assignments = strategy.assignTrivialPreferences(usersRequests);
                    const expectedAssignments: Partial<Assignment> = {
                        "0": user1
                    };
                    expect(assignments).toEqual(expectedAssignments);
                });
            });
        });

        describe("two users", () => {

            test("both users have one noncolliding preference each => assigns each user in their preferred day", () => {
                const usersRequests: UserCurrentWeekPreference[] = [
                    {
                        ...user1,
                        currentWeekPreferences: [{
                            day: days[0],
                            isAvailable: true,
                            priority: priorities[0]
                        }]
                    },
                    {
                        ...user2,
                        currentWeekPreferences: [{
                            day: days[4],
                            isAvailable: true,
                            priority: priorities[0]
                        }]
                    }
                ];
                const assignments = strategy.assignTrivialPreferences(usersRequests);
                const expectedAssignments: Partial<Assignment> = {
                    "0": user1,
                    "4": user2
                };
                expect(assignments).toEqual(expectedAssignments);
            });

            test("both users with the same preference => doesn't assign any of them", () => {
                const usersRequests: UserCurrentWeekPreference[] = [
                    {
                        ...user1,
                        currentWeekPreferences: [{
                            day: days[0],
                            isAvailable: true,
                            priority: priorities[0]
                        }]
                    },
                    {
                        ...user2,
                        currentWeekPreferences: [{
                            day: days[0],
                            isAvailable: true,
                            priority: priorities[0]
                        }]
                    }
                ];
                const assignments = strategy.assignTrivialPreferences(usersRequests);
                const expectedAssignments: Partial<Assignment> = {};
                expect(assignments).toEqual(expectedAssignments);
            });

            test("both users with the same preference but different priorities => doesn't assign any of them", () => {
                const usersRequests: UserCurrentWeekPreference[] = [
                    {
                        ...user1,
                        currentWeekPreferences: [{
                            day: days[0],
                            isAvailable: true,
                            priority: priorities[0]
                        }]
                    },
                    {
                        ...user2,
                        currentWeekPreferences: [{
                            day: days[0],
                            isAvailable: true,
                            priority: priorities[2]
                        }]
                    }
                ];
                const assignments = strategy.assignTrivialPreferences(usersRequests);
                const expectedAssignments: Partial<Assignment> = {};
                expect(assignments).toEqual(expectedAssignments);
            });

            test("both users with the share one preference but have another noncolliding preference => assigns the users only in the non colliding day", () => {
                const usersRequests: UserCurrentWeekPreference[] = [
                    {
                        ...user1,
                        currentWeekPreferences: [{
                            day: days[0],
                            isAvailable: true,
                            priority: priorities[0]
                        }, {
                            day: days[1],
                            isAvailable: true,
                            priority: priorities[0]
                        }]
                    },
                    {
                        ...user2,
                        currentWeekPreferences: [{
                            day: days[0],
                            isAvailable: true,
                            priority: priorities[2]
                        }, {
                            day: days[5],
                            isAvailable: true,
                            priority: priorities[0]
                        }]
                    }
                ];
                const assignments = strategy.assignTrivialPreferences(usersRequests);
                const expectedAssignments: Partial<Assignment> = {
                    "1": user1,
                    "5": user2
                };
                expect(assignments).toEqual(expectedAssignments);
            });
        });
    });
});