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
