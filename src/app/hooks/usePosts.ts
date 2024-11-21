import { useMemo } from 'react';
import { Post } from "../types";
import { DateType } from '@/app/types';

type SortKey = keyof Post;

// Custom Hook: Alle Custom Hooks benutzen in sich bereits vordefinierte Hooks von React (useState, useMemo etc)
export const useSortedPosts = (posts: Post[], sort: SortKey | ''): Post[] => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => {
        const valueA = a[sort];
        const valueB = b[sort];

        // Vergleich für Boolean
        if (typeof valueA === 'boolean' || typeof valueB === 'boolean') {
          // `true` hat die höchste Priorität
          if (valueA === true && valueB !== true) return -1; // `a` kommt vor `b`
          if (valueB === true && valueA !== true) return 1;  // `b` kommt vor `a`

          // `false` hat die zweite Priorität
          if (valueA === false && valueB !== false) return -1; // `a` kommt vor `b`
          if (valueB === false && valueA !== false) return 1;  // `b` kommt vor `a`

          // `undefined` oder `null` kommen zuletzt
          if (valueA == null && valueB != null) return 1;  // `a` nach `b`
          if (valueB == null && valueA != null) return -1; // `b` nach `a`
        }

        // Schieben alle null- oder undefinierten Werte nach unten
        if (
          (valueA == null && valueB != null) ||
          (valueA == undefined && valueB != undefined) ||
          (valueA === '' && valueB !== '')
        )
          return 1; // `a` nach `b`
        if (
          (valueB == null && valueA != null) ||
          (valueB == undefined && valueA != undefined) ||
          (valueA !== '' && valueB === '')
        )
          return -1; // `b` nach `a`
        if (
          (valueA == null && valueB == null) ||
          (valueA == undefined && valueB == undefined) ||
          (valueA === '' && valueB === '')
        )
          return 0; // beide gleich

        // Vergleich für Zahlen
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueA - valueB;
        }

        // Vergleich für Strings
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB);
        }

        // Vergleich für DateType
        const defaultDate: DateType = { year: 0, month: 0, day: 0, nanoseconds: 0 };

        // Falls valueA null oder undefined ist, dann wird die rechte Seite von ?? zugewiesen
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

        // Randfall für unbekannte Typen
        return 0;
      });
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};
  return sortedPosts;
};

export const usePosts = (posts: Post[], sort: SortKey | '', query: string) => {
  const sortedPosts = useSortedPosts(posts, sort);

  // Um Suche Registerunabhängig zu machen, habe ich toLowerCase für Titel eingeführt
  const sortedAndSearchedPosts = useMemo(
    () => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    },
    [query, sortedPosts]
  );

  return sortedAndSearchedPosts;
};

  return sortedAndSearchedPosts;
};
