import { DateType } from "@/types";
import { Post } from "../types";
import { tinkerforgeDTO } from "../models/zTinkerforgeSensor.schema";
import { useMemo } from "react";

type SortKey = keyof tinkerforgeDTO;

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
export const useSortedPosts = (posts: Post[], sort: SortKey | ""): Post[] => {
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
  posts: Post[],
  sort: SortKey | "",
  query: string,
  searchField: keyof Post | "all",
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
