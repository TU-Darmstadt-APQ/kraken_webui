import {useMemo} from 'react';
import { Post } from "../types";

type SortKey = keyof Post;

//custom hook. Alle custom hooks benutzen in sich bereits vordefinierte hooks von React (useState, useMemo etc)
export const useSortedPosts = (posts: Post[], sort: SortKey | ''): Post[] => {
    const sortedPosts = useMemo(() => {
        if(sort){
          return [...posts].sort((a, b) => {
            if (a[sort] && b[sort]) {
              return String(a[sort]).localeCompare(String(b[sort]));
            }
            return 0;
          })
        }
        return posts;
      }, [sort, posts])

      return sortedPosts;
}

export const usePosts = (posts: Post[], sort: SortKey | '', query: string) => {
    const sortedPosts = useSortedPosts(posts, sort);

    //um Suche Registerunabhaengig zu machen, habe ich toLowerCase fuer IP und Titles eingefuehrt
    const sortedAndSearchedPosts = useMemo(
        () => {
            return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
        }, [query, sortedPosts]
  )

  return sortedAndSearchedPosts
}
