import { DateType, Post } from "@/types";
import { compareBoolean, filterBoolean, formatDate } from "@/hooks/usePosts";

//import { compareBoolean, compareDates, filterBoolean, formatDate, useSortedPosts } from "@/hooks/usePosts";
//import { renderHook } from "@testing-library/react";

/*const mockPosts: Post[] = [
    {
      uuid: "3",
      uid: 3,
      date_created: { year: 2024, month: 2, day: 5, nanoseconds: 0 },
      date_modified: { year: 2024, month: 2, day: 5, nanoseconds: 0 },
      enabled: false,
      topic: "B-Topic",
      unit: "B-Unit",
      driver: "B-Driver",
    },
    {
      uuid: "1",
      uid: 1,
      date_created: { year: 2023, month: 5, day: 10, nanoseconds: 0 },
      date_modified: { year: 2023, month: 5, day: 10, nanoseconds: 0 },
      enabled: true,
      topic: "A-Topic",
      unit: "A-Unit",
      driver: "A-Driver",
    }
  ];*/

describe("formatDate function", () => {
  it("formats a date correctly", () => {
    const date: DateType = { day: 5, month: 8, year: 2023, nanoseconds: 12345 };
    expect(formatDate(date)).toBe("5.8.2023 12345");
  });

  it("handles missing fields by replacing them with an empty string", () => {
    const date: DateType = {
      day: 5,
      month: undefined,
      year: undefined,
      nanoseconds: 99999,
    };
    expect(formatDate(date)).toBe("5.. 99999");
  });
});

describe("filterBoolean function", () => {
  const mockPost: Post = { enabled: true } as Post;
  const disabledPost: Post = { enabled: false } as Post;

  it("returns true for 'on', 'enabled', or 'true' when post is enabled", () => {
    expect(filterBoolean("on", mockPost)).toBe(true);
    expect(filterBoolean("enabled", mockPost)).toBe(true);
    expect(filterBoolean("true", mockPost)).toBe(true);
  });

  it("returns true for 'off', 'disabled', or 'false' when post is disabled", () => {
    expect(filterBoolean("off", disabledPost)).toBe(true);
    expect(filterBoolean("disabled", disabledPost)).toBe(true);
    expect(filterBoolean("false", disabledPost)).toBe(true);
  });

  it("returns false for unrelated queries", () => {
    expect(filterBoolean("random text", mockPost)).toBe(false);
    expect(filterBoolean("yes", mockPost)).toBe(false);
  });
});

describe("compareBoolean function", () => {
  it("returns -1 if the first value is true and the second is not", () => {
    expect(compareBoolean(true, false)).toBe(-1);
    /*expect(compareBoolean(true, null)).toBe(-1);
    expect(compareBoolean(true, undefined)).toBe(-1);*/
  });

  it("returns 1 if the second value is true and the first is not", () => {
    expect(compareBoolean(false, true)).toBe(1);
    /*expect(compareBoolean(null, true)).toBe(1);
    expect(compareBoolean(undefined, true)).toBe(1);*/
  });

  /*it("returns -1 if the first value is false and the second is neither true nor false", () => {
    expect(compareBoolean(false, null)).toBe(-1);
    expect(compareBoolean(false, undefined)).toBe(-1);
  });

  it("returns 1 if the second value is false and the first is neither true nor false", () => {
    expect(compareBoolean(null, false)).toBe(1);
    expect(compareBoolean(undefined, false)).toBe(1);
  });

  it("returns 0 if both values are the same", () => {
    expect(compareBoolean(true, true)).toBe(0);
    expect(compareBoolean(false, false)).toBe(0);
    expect(compareBoolean(null, null)).toBe(0);
    expect(compareBoolean(undefined, undefined)).toBe(0);
  });
});

describe("compareDates function", () => {
  const dateA: DateType = { day: 10, month: 5, year: 2022, nanoseconds: 500 };
  const dateB: DateType = { day: 15, month: 5, year: 2022, nanoseconds: 500 };
  const dateC: DateType = { day: 10, month: 6, year: 2022, nanoseconds: 500 };
  const dateD: DateType = { day: 10, month: 5, year: 2023, nanoseconds: 500 };
  const dateE: DateType = { day: 10, month: 5, year: 2022, nanoseconds: 1000 };
  const emptyDate: DateType = { day: 0, month: 0, year: 0, nanoseconds: 0 };

  it("compares year values first", () => {
    expect(compareDates(dateA, dateD)).toBeLessThan(0);
    expect(compareDates(dateD, dateA)).toBeGreaterThan(0);
  });

  it("compares month values if years are equal", () => {
    expect(compareDates(dateA, dateC)).toBeLessThan(0);
    expect(compareDates(dateC, dateA)).toBeGreaterThan(0);
  });

  it("compares day values if years and months are equal", () => {
    expect(compareDates(dateA, dateB)).toBeLessThan(0);
    expect(compareDates(dateB, dateA)).toBeGreaterThan(0);
  });

  it("compares nanoseconds if other values are equal", () => {
    expect(compareDates(dateA, dateE)).toBeLessThan(0);
    expect(compareDates(dateE, dateA)).toBeGreaterThan(0);
  });

  it("returns 0 for identical dates", () => {
    expect(compareDates(dateA, dateA)).toBe(0);
    expect(compareDates(emptyDate, emptyDate)).toBe(0);
  });

  it("treats null or undefined dates as default values", () => {
    expect(compareDates(dateA, null)).toBeGreaterThan(0);
    expect(compareDates(null, dateA)).toBeLessThan(0);
    expect(compareDates(undefined, dateA)).toBeLessThan(0);
    expect(compareDates(null, undefined)).toBe(0);
  });
});

describe("useSortedPosts Hook", () => {
    it("returns the original list if no sorting key is provided", () => {
      const { result } = renderHook(() => useSortedPosts(mockPosts, ""));
      expect(result.current).toEqual(mockPosts);
    });
  
    it("sorts posts by numeric values (uid)", () => {
      const { result } = renderHook(() => useSortedPosts(mockPosts, "uid"));
      expect(result.current.map((p) => p.uid)).toEqual([1, 2, 3]);
    });
  
    it("sorts posts by string values (topic)", () => {
      const { result } = renderHook(() => useSortedPosts(mockPosts, "topic"));
      expect(result.current.map((p) => p.topic)).toEqual(["A-Topic", "B-Topic", "C-Topic"]);
    });
  
    it("sorts posts by boolean values (enabled)", () => {
      const { result } = renderHook(() => useSortedPosts(mockPosts, "enabled"));
      expect(result.current.map((p) => p.enabled)).toEqual([true, false, null]);
    });
  
    it("sorts posts by date values (date_created)", () => {
      const { result } = renderHook(() => useSortedPosts(mockPosts, "date_created"));
      expect(result.current.map((p) => p.date_created.year)).toEqual([2023, 2024, 2025]);
    });
  
    it("moves null, undefined, and empty string values to the end", () => {
      const postsWithNull: Post[] = [
        { ...mockPosts[1], topic: "A-Topic" },
        { ...mockPosts[2], topic: "" },
      ];
      const { result } = renderHook(() => useSortedPosts(postsWithNull, "topic"));
      expect(result.current.map((p) => p.topic)).toEqual(["A-Topic", "", null]);
    });
  
    it("handles unknown data types gracefully", () => {
      const postsWithUnknownType: Post[] = [
        { ...mockPosts[0], topic: 42 as unknown as string },
        { ...mockPosts[1], topic: "A-Topic" },
      ];
      const { result } = renderHook(() => useSortedPosts(postsWithUnknownType, "topic"));
      expect(result.current.map((p) => p.topic)).toEqual(["A-Topic", 42]);
    });*/
});
