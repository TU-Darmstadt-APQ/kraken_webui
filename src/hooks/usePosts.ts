import { tinkerforgeDTO } from "../models/zTinkerforgeSensor.schema";
import { useMemo } from "react";

type SortKey = keyof tinkerforgeDTO;

// Regular expression that checks, if the given string is a ISO-date
const isISOString = (value: string): boolean => {
  // complete version OR without milliseconds OR without seconds
  return /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/.test(
    value,
  );
};

// the method filter boolean
const filterBoolean = (query: string, dto: tinkerforgeDTO): boolean => {
  const normalizedQuery = query.toLowerCase().trim();

  if (["on", "enabled", "true"].includes(normalizedQuery)) {
    return dto.enabled === true;
  }
  if (["off", "disabled", "false"].includes(normalizedQuery)) {
    return dto.enabled === false;
  }
  if (["undefined", "offline"].includes(normalizedQuery)) {
    return dto.enabled === undefined || dto.enabled === null;
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

/** Compare function for dates (stored as stringISO) values */
const compareDates = (
  valueA: string | null | undefined,
  valueB: string | null | undefined,
): number => {
  const dateA = valueA ? new Date(valueA).getTime() : 0;
  const dateB = valueB ? new Date(valueB).getTime() : 0;
  return dateA - dateB;
};

// Custom Hook: All custom hooks use predefined hooks from React (useState, useMemo etc)
export const useSortedDTOs = (
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

        // Compare for Dates (check if both string are ISO strings)
        if (typeof valueA === "string" && typeof valueB === "string") {
          const isDateA = isISOString(valueA);
          const isDateB = isISOString(valueB);

          if (isDateA && isDateB) {
            return compareDates(valueA, valueB);
          }
        }

        // Compare for Strings
        if (typeof valueA === "string" && typeof valueB === "string") {
          return valueA.localeCompare(valueB);
        }

        // Edge case for unknown types
        return 0;
      });
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

export const useDTOs = (
  posts: tinkerforgeDTO[],
  sort: SortKey | "",
  query: string,
  searchField: SortKey | "all",
) => {
  const sortedDTOs = useSortedDTOs(posts, sort);

  // To make the search register-independent, it was "toLowerCase" for titles implemented
  const sortedAndSearchedDTOs = useMemo(() => {
    if (!query.trim()) return sortedDTOs; // if query is empty - return the original list

    return sortedDTOs.filter((post) => {
      // if we search in all fields of DTO
      if (searchField === "all") {
        return Object.values(post).some((value) => {
          if (typeof value === "string" || typeof value === "number") {
            return value.toString().toLowerCase().includes(query.toLowerCase());
          }

          // identificate Enabled-status
          if (typeof value === "boolean") {
            return filterBoolean(query, post);
          }
          return false;
        });
      }

      const fieldValue = post[searchField];

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
  }, [query, sortedDTOs, searchField]);

  return sortedAndSearchedDTOs;
};
