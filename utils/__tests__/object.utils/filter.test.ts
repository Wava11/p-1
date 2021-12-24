import { filterObject } from "../../object.utils";

describe("object utils", () => {
    describe("filterObject", () => {
        describe("empty object", () => {
            const emptyObject = {};
            describe("predicate returns true", () => {
                const predicate = () => true;
                test("returns empty object", () => {
                    const filtered = filterObject(predicate,emptyObject);
                    expect(filtered).toEqual({});
                });
            });
            describe("predicate returns false", () => {
                const predicate = () => false;
                test("returns empty object", () => {
                    const filtered = filterObject(predicate,emptyObject);
                    expect(filtered).toEqual({});
                });
            });
        });
        describe("object with one key", () => {
            const objectWithOneKey = { moo: 49 };

            describe("predicate returns true", () => {
                const predicate = () => true;
                test("returns the same object", () => {
                    const filtered = filterObject(predicate,objectWithOneKey);
                    expect(filtered).toEqual(objectWithOneKey);
                });
            });
            describe("predicate returns false", () => {
                const predicate = () => false;
                test("returns empty object", () => {
                    const filtered = filterObject(predicate,objectWithOneKey);
                    expect(filtered).toEqual({});
                });
            });
        });
        describe("object with several keys", () => {
            const objectWithSeveralKeys = { moo: 49, goo: "Sfd", doo: true };

            test("only keeps keys for which the predicate returns true", () => {
                const predicateWhichReturnsFalseOnlyForDooKey = key => key != "doo";
                const filtered = filterObject(predicateWhichReturnsFalseOnlyForDooKey,objectWithSeveralKeys);
                expect(filtered).toEqual({
                    moo: objectWithSeveralKeys.moo,
                    goo: objectWithSeveralKeys.goo
                });
            });
        });
    });
});