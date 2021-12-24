import { ObjectId } from "mongodb";
import { User } from "../../user/user";

const user1: User = {
    _id: new ObjectId(),
    name: "cow"
};
const user2: User = {
    _id: new ObjectId(),
    name: "donkey"
};

describe("AssignmentStrategy", () => {
    describe("assignConflictingPreferences", () => {
        describe("conflicting isAvailable=true preferences", () => {
            describe("same priority", () => {
                describe("different scores", () => {
                    test("assigns user whose score is higher", () => {

                    });
                });
                describe("same scores", () => {
                    describe("users have different amount of preferences", () => {
                        test("assigns user with fewer preferences", () => {

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
                        test("assigns user with higher score", () => {
                            
                        })
                    });
                    describe("lower priority with higher score", () => {
                        test("assigns user with higher score", () => {
    
                        })
                    });
                });
                describe("same scores", () => {
                    test("assigns user whose preference has higher priority", () => {

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
                            
                        })
                    });
                    describe("lower priority with higher score", () => {
                        test("assigns user with LOWER score", () => {
    
                        })
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