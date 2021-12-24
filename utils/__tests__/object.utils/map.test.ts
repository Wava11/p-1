import { mapObject } from '../../object.utils';

describe("object utils", () => {
    describe("mapObject", () => {
        describe("empty object", () => {
            const mapper = () => "doesn't matter";
            test("returns empty object", () => {
                const mapped = mapObject(mapper, {});
                expect(mapped).toEqual({});
            });
        });
        describe("object with one key", () => {
            const objectWithOneKey = { moo: "cow" };
            const mapper = () => "yoohoo";
            test("returns mapped object", () => {
                const mapped = mapObject(mapper, objectWithOneKey);
                expect(mapped).toEqual({ moo: mapper() });
            });
        });
        describe("object with several keys", () => {
            const objectWithSeveralKeys = { moo: "cow", woof: "dog", meow: "cat" };
            const mapper = (key: string) => key != "moo" ? "pet" : "not pet";
            test("returns mapped object", () => {
                const mapped = mapObject(mapper, objectWithSeveralKeys);
                expect(mapped).toEqual({
                    moo: "not pet",
                    woof: "pet",
                    meow: "pet"
                });
            });
        });
    });
});
