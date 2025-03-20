import { DateType } from "@/types";
import { compareDates } from "@/hooks/usePosts";
import { filterBoolean } from "@/hooks/usePosts";
import { formatDate } from "@/hooks/usePosts";
import { renderHook } from "@testing-library/react";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";
import { useSortedPosts } from "@/hooks/usePosts";

// Mock data for testing
const mockPosts: tinkerforgeDTO[] = [
  {
    id: "1",
    uid: 0,
    description: "",
    date_created: "2025-6-6",
    date_modified: "1910-10-10",
    enabled: false,
    label: "Sensor B",
    config: {},
    on_connect: [],
  },
  {
    id: "2",
    uid: 0,
    description: "",
    date_created: "2025-6-6",
    date_modified: "1910-10-10",
    enabled: true,
    label: "Sensor A",
    config: {},
    on_connect: [],
  },
  {
    id: "3",
    uid: 0,
    description: "",
    date_created: "2025-6-6",
    date_modified: "1910-10-10",
    enabled: false,
    label: "Sensor C",
    config: {},
    on_connect: [],
  },
];

// Wrap the mock data by setting `enabled` to the desired type
const testPosts = mockPosts.map((post) => ({
  ...post,
  enabled: post.enabled as boolean,
}));

describe("useSortedPosts Hook", () => {
  test("should return posts sorted by label (alphabetically)", () => {
    const { result } = renderHook(() => useSortedPosts(testPosts, "label"));

    expect(result.current.map((p: tinkerforgeDTO) => p.label)).toEqual([
      "Sensor A",
      "Sensor B",
      "Sensor C",
    ]);
  });

  test("should return posts sorted by date_created (earliest first)", () => {
    const { result } = renderHook(() =>
      useSortedPosts(testPosts, "date_created"),
    );

    // Convert strings into `Date` objects for correct comparison
    const sortedDates = result.current.map((p: tinkerforgeDTO) =>
      new Date(p.date_created).toISOString(),
    );

    expect(sortedDates).toEqual(
      [...sortedDates].sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      ), // Check that the array is sorted correctly
    );
  });

  test("should return posts sorted by enabled status (true first, then false)", () => {
    const { result } = renderHook(() => useSortedPosts(testPosts, "enabled"));

    expect(result.current.map((p: tinkerforgeDTO) => p.enabled)).toEqual([
      true,
      false,
      false,
    ]);
  });

  test("should return the same list if sort is an empty string", () => {
    const { result } = renderHook(() => useSortedPosts(testPosts, ""));

    expect(result.current).toEqual(testPosts);
  });

  test("should handle an empty list without errors", () => {
    const { result } = renderHook(() => useSortedPosts([], "label"));

    expect(result.current).toEqual([]);
  });

  test("should return posts sorted by numeric ID", () => {
    const { result } = renderHook(() => useSortedPosts(testPosts, "id"));

    expect(result.current.map((p: tinkerforgeDTO) => p.id)).toEqual([
      "1",
      "2",
      "3",
    ]);
  });
});

describe("filterBoolean", () => {
  test("should return true for 'on', 'enabled', 'true' when post.enabled is true", () => {
    const post: tinkerforgeDTO = { enabled: true } as tinkerforgeDTO;

    expect(filterBoolean("on", post)).toBe(true);
    expect(filterBoolean("enabled", post)).toBe(true);
    expect(filterBoolean("true", post)).toBe(true);
  });

  test("should return true for 'off', 'disabled', 'false' when post.enabled is false", () => {
    const post: tinkerforgeDTO = { enabled: false } as tinkerforgeDTO;

    expect(filterBoolean("off", post)).toBe(true);
    expect(filterBoolean("disabled", post)).toBe(true);
    expect(filterBoolean("false", post)).toBe(true);
  });

  test("should return false for unsupported query values", () => {
    const post: tinkerforgeDTO = { enabled: true } as tinkerforgeDTO;

    expect(filterBoolean("yes", post)).toBe(false);
    expect(filterBoolean("no", post)).toBe(false);
    expect(filterBoolean("randomText", post)).toBe(false);
  });

  test("should return false if the query matches but the post.enabled state does not", () => {
    const postTrue: tinkerforgeDTO = { enabled: true } as tinkerforgeDTO;
    const postFalse: tinkerforgeDTO = { enabled: false } as tinkerforgeDTO;

    expect(filterBoolean("off", postTrue)).toBe(false);
    expect(filterBoolean("enabled", postFalse)).toBe(false);
    expect(filterBoolean("undefined", postTrue)).toBe(false);
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
