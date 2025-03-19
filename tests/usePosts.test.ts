import { compareBoolean } from "@/hooks/usePosts";

describe("compareBoolean", () => {
  test("should return -1 when true is compared with false, null, or undefined", () => {
    expect(compareBoolean(true, false)).toBe(-1);
    expect(compareBoolean(true, null)).toBe(-1);
    expect(compareBoolean(true, undefined)).toBe(-1);
  });

  test("should return 1 when false, null, or undefined is compared with true", () => {
    expect(compareBoolean(false, true)).toBe(1);
    expect(compareBoolean(null, true)).toBe(1);
    expect(compareBoolean(undefined, true)).toBe(1);
  });

  test("should return -1 when false is compared with null or undefined", () => {
    expect(compareBoolean(false, null)).toBe(-1);
    expect(compareBoolean(false, undefined)).toBe(-1);
  });

  test("should return 1 when null or undefined is compared with false", () => {
    expect(compareBoolean(null, false)).toBe(1);
    expect(compareBoolean(undefined, false)).toBe(1);
  });

  test("should return 0 when both values are the same", () => {
    expect(compareBoolean(true, true)).toBe(0);
    expect(compareBoolean(false, false)).toBe(0);
    expect(compareBoolean(null, null)).toBe(0);
    expect(compareBoolean(undefined, undefined)).toBe(0);
  });

  test("should return 0 when comparing null and undefined (both treated as the same)", () => {
    expect(compareBoolean(null, undefined)).toBe(0);
    expect(compareBoolean(undefined, null)).toBe(0);
  });
});
