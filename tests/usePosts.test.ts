import { renderHook } from "@testing-library/react";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";
import { usePosts } from "@/hooks/usePosts";

// Mock Data
const mockPosts: tinkerforgeDTO[] = [
  {
    id: "1",
    uid: 0,
    description: "Temperature sensor in room A",
    date_created: "2025-06-06",
    date_modified: "2025-06-07",
    enabled: true,
    label: "Sensor A",
    config: {},
    on_connect: [],
  },
  {
    id: "2",
    uid: 0,
    description: "Pressure sensor in lab",
    date_created: "2023-06-06",
    date_modified: "2023-06-07",
    enabled: false,
    label: "Sensor B",
    config: {},
    on_connect: [],
  },
  {
    id: "3",
    uid: 0,
    description: "Temperature sensor in room B",
    date_created: "2024-06-06",
    date_modified: "2024-06-07",
    enabled: true,
    label: "Sensor C",
    config: {},
    on_connect: [],
  },
];

describe("usePosts Hook", () => {
  test("should return sorted posts by label", () => {
    const { result } = renderHook(() =>
      usePosts(mockPosts, "label", "", "all"),
    );

    expect(result.current.map((p) => p.label)).toEqual([
      "Sensor A",
      "Sensor B",
      "Sensor C",
    ]);
  });

  test("should return posts sorted by date_created (earliest first)", () => {
    const { result } = renderHook(() =>
      usePosts(mockPosts, "date_created", "", "all"),
    );

    const sortedDates = result.current.map((p) =>
      new Date(p.date_created).toISOString(),
    );

    expect(sortedDates).toEqual(
      [...sortedDates].sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      ),
    );
  });

  test("should return filtered posts when searching for 'Temperature'", () => {
    const { result } = renderHook(() =>
      usePosts(mockPosts, "", "Temperature", "description"),
    );

    expect(result.current.map((p) => p.description)).toEqual([
      "Temperature sensor in room A",
      "Temperature sensor in room B",
    ]);
  });

  test("should return filtered posts when searching by enabled status", () => {
    const { result } = renderHook(() =>
      usePosts(mockPosts, "", "true", "enabled"),
    );

    expect(result.current.map((p) => p.enabled)).toEqual([true, true]);
  });

  test("should return filtered posts when searching in all fields", () => {
    const { result } = renderHook(() => usePosts(mockPosts, "", "lab", "all"));

    expect(result.current.map((p) => p.description)).toEqual([
      "Pressure sensor in lab",
    ]);
  });

  test("should return all posts when the search query is empty", () => {
    const { result } = renderHook(() => usePosts(mockPosts, "", "", "all"));

    expect(result.current).toEqual(mockPosts);
  });

  test("should return an empty array when there are no matches", () => {
    const { result } = renderHook(() =>
      usePosts(mockPosts, "", "nonexistent", "description"),
    );

    expect(result.current).toEqual([]);
  });

  test("should return posts sorted by numeric ID", () => {
    const { result } = renderHook(() => usePosts(mockPosts, "id", "", "all"));

    expect(result.current.map((p) => p.id)).toEqual(["1", "2", "3"]);
  });

  test("should filter posts by date_created when searching for a date", () => {
    const { result } = renderHook(() =>
      usePosts(mockPosts, "", "2023-06-06", "date_created"),
    );

    // Expect the filter to return only an object with date_created - { year: 2023, month: 6, day: 6 }
    expect(result.current.length).toBe(1);
    expect(result.current[0].date_created).toEqual("2023-06-06");
  });
});
