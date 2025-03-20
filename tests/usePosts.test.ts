import { DateType } from "@/types";
import { compareBoolean } from "@/hooks/usePosts";
import { compareDates } from "@/hooks/usePosts";
import { formatDate } from "@/hooks/usePosts";

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

describe("formatDate", () => {
  test("should correctly format a valid date", () => {
    const date: DateType = {
      day: 5,
      month: 8,
      year: 2023,
      nanoseconds: 123456,
    };
    expect(formatDate(date)).toBe("5.8.2023 123456");
  });

  test("should return 'Invalid date' if any required field is missing", () => {
    const invalidDate: DateType = {
      day: undefined,
      month: 5,
      year: 2023,
      nanoseconds: 0,
    };
    expect(formatDate(invalidDate)).toBe("Invalid date");
  });
});

describe("compareDates", () => {
  test("should return 0 when both dates are equal", () => {
    const dateA: DateType = {
      year: 2025,
      month: 3,
      day: 19,
      nanoseconds: 9000,
    };
    const dateB: DateType = {
      year: 2025,
      month: 3,
      day: 19,
      nanoseconds: 9000,
    };

    expect(compareDates(dateA, dateB)).toBe(0);
  });

  test("should correctly compare years", () => {
    const dateA: DateType = { year: 1999, month: 11, day: 7, nanoseconds: 100 };
    const dateB: DateType = { year: 2077, month: 11, day: 7, nanoseconds: 100 };

    expect(compareDates(dateA, dateB)).toBe(-78); // 1999 < 2077
    expect(compareDates(dateB, dateA)).toBe(78); // 2077 > 1999
  });

  test("should correctly compare months if years are the same", () => {
    const dateA: DateType = { year: 2003, month: 4, day: 10, nanoseconds: 100 };
    const dateB: DateType = { year: 2003, month: 5, day: 10, nanoseconds: 100 };

    expect(compareDates(dateA, dateB)).toBe(-1); // April < May
    expect(compareDates(dateB, dateA)).toBe(1); // May > April
  });

  test("should correctly compare days if years and months are the same", () => {
    const dateA: DateType = { year: 2003, month: 11, day: 9, nanoseconds: 100 };
    const dateB: DateType = {
      year: 2003,
      month: 11,
      day: 10,
      nanoseconds: 100,
    };

    expect(compareDates(dateA, dateB)).toBe(-1); // 9th < 10th
    expect(compareDates(dateB, dateA)).toBe(1); // 10th > 9th
  });

  test("should correctly compare nanoseconds if all other values are equal", () => {
    const dateA: DateType = {
      year: -200,
      month: 42,
      day: 228,
      nanoseconds: 50,
    };
    const dateB: DateType = {
      year: -200,
      month: 42,
      day: 228,
      nanoseconds: 100,
    };

    expect(compareDates(dateA, dateB)).toBe(-50); // 50 < 100
    expect(compareDates(dateB, dateA)).toBe(50); // 100 > 50
  });

  test("should treat null or undefined dates as the default date", () => {
    // note: defaultDate is from type DateType and equal to { year: 0, month: 0, day: 0, nanoseconds: 0 };
    const validDate: DateType = {
      year: 2023,
      month: 5,
      day: 10,
      nanoseconds: 100,
    };

    expect(compareDates(null, validDate)).toBe(-2023); // Default year 0 < 2023
    expect(compareDates(undefined, validDate)).toBe(-2023);
    expect(compareDates(validDate, null)).toBe(2023);
    expect(compareDates(validDate, undefined)).toBe(2023);
    expect(compareDates(null, undefined)).toBe(0); // Both are defaultDate
  });
});
