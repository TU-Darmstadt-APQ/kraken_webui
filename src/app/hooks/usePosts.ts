import { useMemo } from 'react';
import { Post } from "../types";
import { DateType } from '@/app/types';

type SortKey = keyof Post;

// Custom Hook: All custom hooks use predefined hooks from React (useState, useMemo etc)
export const useSortedPosts = (posts: Post[], sort: SortKey | ''): Post[] => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => {
        const valueA = a[sort];
        const valueB = b[sort];

        // Compare for Boolean
        if (typeof valueA === 'boolean' || typeof valueB === 'boolean') {
          // `true` has the highest priority
          if (valueA === true && valueB !== true) return -1; // `a` comes before `b
          if (valueB === true && valueA !== true) return 1;  // `b` comes before `a`

          // `false` has the second priority
          if (valueA === false && valueB !== false) return -1; // `a` comes before `b`
          if (valueB === false && valueA !== false) return 1;  // `b` comes before `a`

          // `undefined` or `null` come last
          if (valueA == null && valueB != null) return 1;  // `a` after `b`
          if (valueB == null && valueA != null) return -1; // `b` after `a`
        }

        // Move all null- or undefined values down
        if (
          (valueA == null && valueB != null) ||
          (valueA == undefined && valueB != undefined) ||
          (valueA === '' && valueB !== '')
        )
          return 1; // `a` after `b`
        if (
          (valueB == null && valueA != null) ||
          (valueB == undefined && valueA != undefined) ||
          (valueA !== '' && valueB === '')
        )
          return -1; // `b` after `a`
        if (
          (valueA == null && valueB == null) ||
          (valueA == undefined && valueB == undefined) ||
          (valueA === '' && valueB === '')
        )
          return 0; // both are equal

        // Compare for Numbers
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueA - valueB;
        }

        // Compare for Strings
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB);
        }

        // Compare for DateType
        const defaultDate: DateType = { year: 0, month: 0, day: 0, nanoseconds: 0 };

        // If valueA is null or undefined, then the right-hand side of ?? is assigned
        const dateA = valueA ?? defaultDate;
        const dateB = valueB ?? defaultDate;

        if (
          typeof dateA === 'object' &&
          typeof dateB === 'object' &&
          'year' in dateA &&
          'month' in dateA &&
          'day' in dateA &&
          'nanoseconds' in dateA
        ) {
          if (typeof dateA.year === 'number' && typeof dateB.year === 'number' && dateA.year !== dateB.year) {
            return dateA.year - dateB.year;
          }
          if (typeof dateA.month === 'number' && typeof dateB.month === 'number' && dateA.month !== dateB.month) {
            return dateA.month - dateB.month;
          }
          if (typeof dateA.day === 'number' && typeof dateB.day === 'number' && dateA.day !== dateB.day) {
            return dateA.day - dateB.day;
          }
          if (
            typeof dateA.nanoseconds === 'number' &&
            typeof dateB.nanoseconds === 'number' &&
            dateA.nanoseconds !== dateB.nanoseconds
          ) {
            return dateA.nanoseconds - dateB.nanoseconds;
          }
        }

        // Edge case for unknown types
        return 0;
      });
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

export const usePosts = (posts: Post[], sort: SortKey | '', query: string) => {
  const sortedPosts = useSortedPosts(posts, sort);

  // To make the search register-independent, it was "toLowerCase" for titles implemented
  const sortedAndSearchedPosts = useMemo(
    () => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    },
    [query, sortedPosts]
  );

  return sortedAndSearchedPosts;
};
