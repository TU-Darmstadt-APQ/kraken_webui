import { DateType } from "@/types";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";
import { useMemo } from "react";

type SortKey = keyof tinkerforgeDTO;

/**
 * Converts a `DateType` object into a formatted string.
 *
 * @param {DateType} date - The date object containing day, month, year, and optional nanoseconds.
 * @returns {string} A formatted string representation of the date in the format `DD.MM.YYYY nanoseconds`.
 *
 * If any of the fields (`day`, `month`, `year`) are missing, they are replaced with an empty string.
 * Nanoseconds are appended at the end if present.
 */
const formatDate = (date: DateType): string => {
  const { day, month, year, nanoseconds } = date;

  // Return "Invalid date" if any required field is missing or undefined
  if (
    day == null ||
    month == null ||
    year == null ||
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year)
  ) {
    return "Invalid date";
  }

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

/**
 * Compares two `DateType` values for sorting sensor data.
 *
 * Sorting order:
 * - Earlier dates come first
 * - If two dates are equal, nanoseconds are used as a tiebreaker
 *
 * @param {DateType | null | undefined} valueA - First date value.
 * @param {DateType | null | undefined} valueB - Second date value.
 * @returns {number} - Comparison result: -1, 0, or 1.
 */
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

export const usePosts = (
  posts: tinkerforgeDTO[],
  sort: SortKey | "",
  query: string,
  searchField: keyof tinkerforgeDTO | "all",
) => {
  const sortedPosts = useSortedPosts(posts, sort);

  // To make the search register-independent, it was "toLowerCase" for titles implemented
  const sortedAndSearchedPosts = useMemo(() => {
    if (!query.trim()) return sortedPosts; // if query is empty - return the original list

    return sortedPosts.filter((post) => {
      // if we search in all fields of Post
      if (searchField === "all") {
        return Object.values(post).some((value) => {
          if (typeof value === "string" || typeof value === "number") {
            return value.toString().toLowerCase().includes(query.toLowerCase());
          }
          // identificate DataType
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
          /*if(typeof value === 'object' && value !== null){
              return isTextInConfig(value, query);
            }*/
          // identificate Enabled-status
          if (typeof value === "boolean") {
            return filterBoolean(query, post);
          }
          return false;
        });
      }

      const fieldValue = post[searchField];
      // If the fieldValue is of type DateType
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
      // If the fieldValue is of type Config
      /*if(typeof fieldValue === 'object' && fieldValue !== null){
          return isTextInConfig(fieldValue, query);
        }*/
      if (typeof fieldValue === "boolean") {
        return filterBoolean(query, post);
      }
      if (typeof fieldValue === "string" || typeof fieldValue === "number") {
        return fieldValue
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase());
      }

      return false;
    });
  }, [query, sortedPosts, searchField]);

  return sortedAndSearchedPosts;
};
