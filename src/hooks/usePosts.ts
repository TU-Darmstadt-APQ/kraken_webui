import { DateType } from "@/types";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";
import { useMemo } from "react";

type SortKey = keyof tinkerforgeDTO;

// the method converts DataType into a string
const formatDate = (date: DateType): string => {
  const { day, month, year, nanoseconds } = date;
  return `${day ?? ""}.${month ?? ""}.${year ?? ""} ${nanoseconds ?? ""}`;
};

// the method filter boolean
const filterBoolean = (query: string, post: tinkerforgeDTO): boolean => {
  const normalizedQuery = query.toLowerCase().trim();

  if (["on", "enabled", "true"].includes(normalizedQuery)) {
    return post.enabled === true;
  }
  if (["off", "disabled", "false"].includes(normalizedQuery)) {
    return post.enabled === false;
  }
  if (["undefined", "offline"].includes(normalizedQuery)) {
    return post.enabled === undefined || post.enabled === null;
  }
  return false;
};

const compareBoolean = (
  valueA: boolean | null | undefined,
  valueB: boolean | null | undefined,
): number => {
  if (valueA === true && valueB !== true) return -1; // `a` comes before `b
  if (valueB === true && valueA !== true) return 1; // `b` comes before `a`
  if (valueA === false && valueB !== false) return -1;
  if (valueB === false && valueA !== false) return 1;

  // `undefined` or `null` come last
  if (valueA == null && valueB != null) return 1; // `a` after `b`
  if (valueB == null && valueA != null) return -1; // `b` after `a`
  return 0;
};

/** Compare function for DateType values */
const compareDates = (
  valueA: DateType | null | undefined,
  valueB: DateType | null | undefined,
): number => {
  const defaultDate: DateType = { year: 0, month: 0, day: 0, nanoseconds: 0 };

  const dateA = valueA ?? defaultDate;
  const dateB = valueB ?? defaultDate;

  if (
    typeof dateA === "object" &&
    typeof dateB === "object" &&
    "year" in dateA &&
    "month" in dateA &&
    "day" in dateA &&
    "nanoseconds" in dateA
  ) {
    if (
      typeof dateA.year === "number" &&
      typeof dateB.year === "number" &&
      dateA.year !== dateB.year
    ) {
      return dateA.year - dateB.year;
    }
    if (
      typeof dateA.month === "number" &&
      typeof dateB.month === "number" &&
      dateA.month !== dateB.month
    ) {
      return dateA.month - dateB.month;
    }
    if (
      typeof dateA.day === "number" &&
      typeof dateB.day === "number" &&
      dateA.day !== dateB.day
    ) {
      return dateA.day - dateB.day;
    }
    if (
      typeof dateA.nanoseconds === "number" &&
      typeof dateB.nanoseconds === "number" &&
      dateA.nanoseconds !== dateB.nanoseconds
    ) {
      return dateA.nanoseconds - dateB.nanoseconds;
    }
  }

  return 0;
};

// Custom Hook: All custom hooks use predefined hooks from React (useState, useMemo etc)
export const useSortedPosts = (
  posts: tinkerforgeDTO[],
  sort: SortKey | "",
): tinkerforgeDTO[] => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => {
        const valueA = a[sort];
        const valueB = b[sort];

        // Compare for Boolean
        if (typeof valueA === "boolean" || typeof valueB === "boolean") {
          return compareBoolean(valueA as boolean, valueB as boolean);
        }

        // Move all null- or undefined values down
        if (
          (valueA == null && valueB != null) ||
          (valueA == undefined && valueB != undefined) ||
          (valueA === "" && valueB !== "")
        )
          return 1; // `a` after `b`
        if (
          (valueB == null && valueA != null) ||
          (valueB == undefined && valueA != undefined) ||
          (valueA !== "" && valueB === "")
        )
          return -1; // `b` after `a`
        if (
          (valueA == null && valueB == null) ||
          (valueA == undefined && valueB == undefined) ||
          (valueA === "" && valueB === "")
        )
          return 0; // both are equal

        // Compare for Numbers
        if (typeof valueA === "number" && typeof valueB === "number") {
          return valueA - valueB;
        }

        // Compare for Strings
        if (typeof valueA === "string" && typeof valueB === "string") {
          return valueA.localeCompare(valueB);
        }

        // Compare for DateType
        if (typeof valueA === "object" && typeof valueB === "object") {
          return compareDates(valueA as DateType, valueB as DateType);
        }

        // Edge case for unknown types
        return 0;
      });
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

/**
 * Custom React Hook for searching and sorting sensor data.
 *
 * This hook provides a filtered and sorted list of sensors based on:
 * - Sorting (sort): Uses `useSortedPosts` to sort data by the specified field.
 * - Searching (query): Filters sensors based on a case-insensitive search.
 * - Search Scope (searchField):
 *   - "all": Searches across all fields of a sensor.
 *   - Specific field: Searches only within the selected field.
 *
 * The search considers different data types:
 * - Strings & Numbers: Directly checked using `.toLowerCase().includes(query)`.
 * - DateType: Converted into a formatted string (formatDate) before searching.
 * - Boolean (enabled): Uses `filterBoolean` to match "true"/"false"-like values.
 *
 * @param {tinkerforgeDTO[]} posts - Array of sensor data objects.
 * @param {SortKey | ""} sort - Field to sort by (empty string means no sorting).
 * @param {string} query - Search term for filtering sensors.
 * @param {keyof tinkerforgeDTO | "all"} searchField - Field to search in ("all" means all fields).
 * @returns {tinkerforgeDTO[]} - Sorted and filtered list of sensors.
 */
export const usePosts = (
  posts: tinkerforgeDTO[],
  sort: SortKey | "",
  query: string,
  searchField: keyof tinkerforgeDTO | "all",
) => {
  // Apply sorting first before filtering
  const sortedPosts = useSortedPosts(posts, sort);

  // Memoize the filtered results to optimize performance
  const sortedAndSearchedPosts = useMemo(() => {
    if (!query.trim()) return sortedPosts; // If query is empty, return sorted list without filtering

    return sortedPosts.filter((post) => {
      // If searching across all fields
      if (searchField === "all") {
        return Object.values(post).some((value) => {
          if (typeof value === "string" || typeof value === "number") {
            return value.toString().toLowerCase().includes(query.toLowerCase());
          }
          // Identify DateType and check formatted date string
          if (
            typeof value === "object" &&
            value !== null &&
            "year" in value &&
            "month" in value &&
            "day" in value
          ) {
            return formatDate(value as DateType)
              .toLowerCase()
              .includes(query.toLowerCase());
          }
          // Identify and filter boolean `enabled` status
          if (typeof value === "boolean") {
            return filterBoolean(query, post);
          }
          return false;
        });
      }

      const fieldValue = post[searchField];

      // If the searched field is of type DateType
      if (
        typeof fieldValue === "object" &&
        fieldValue !== null &&
        "year" in fieldValue &&
        "month" in fieldValue &&
        "day" in fieldValue
      ) {
        return formatDate(fieldValue as DateType)
          .toLowerCase()
          .includes(query.toLowerCase());
      }

      // If the searched field is of type Boolean
      if (typeof fieldValue === "boolean") {
        return filterBoolean(query, post);
      }

      // If the searched field is of type String or Number
      if (typeof fieldValue === "string" || typeof fieldValue === "number") {
        return fieldValue
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase());
      }

      return false; // If the field type is unsupported, do not include it in the results
    });
  }, [query, sortedPosts, searchField]);

  return sortedAndSearchedPosts;
};
