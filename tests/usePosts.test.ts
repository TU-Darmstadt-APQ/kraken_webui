import { DateType } from "@/types";
import { formatDate } from "@/hooks/usePosts";

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
