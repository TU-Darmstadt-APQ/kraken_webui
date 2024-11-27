import { ReactNode } from 'react';

export interface Post {
    id: number;
    title: string;
    description?: string; // All lines marked with a question mark are optional (or do not have to be included when the object is created)
    date_created: DateType;
    date_modified: DateType;
    enabled?: boolean;
    label?: string;
    uid?: string;
    config?: Record<string, unknown>; // Flexible configuration (object with any values)
    on_connect?: string;
}
export interface DateType {
  day?: number;
  month?: number;
  year?: number;
  nanoseconds?: number;
}

// Define the interface for the filter
interface Filter {
  sort: keyof Post | ''; // The 'sort' can be a key from Post or an empty string
  query: string; // Search keyword
}

// Type the props of the PostFilter component
export interface PostFilterProps {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>; // setFilter is a function that changes the filter state
}

// Type individual select option
export interface MySelectOption {
  value: string;
  name: string;
}

// Type the props of the FilterSelect component
export interface MySelectProps {
  options: MySelectOption[];
  defaultValue: string;
  value: string;
  onChange: (value: keyof Post) => void;
}

export interface PostFormProps {
  create: (post: Post) => void;
}

export interface ModalWindowProps {
  children: React.ReactNode; // Contents between the tags
  visible: boolean; // Visibility of the ModalWindow
  setVisible: (visible: boolean) => void; // Funktion that changes the visibility
}

export interface MyButtonProps {
  children: ReactNode;
  [key: string]: any; // Catch-all for any additional props
}

export interface PostListProps {
  posts: Post[];               // Array of Posts
  listTitle: string;           // Title of list
  remove: (post: Post) => void; // Function that deletes the post
}

export interface TableItemProps {
  post: Post;                   // Post object
  remove: (post: Post) => void; // Function that deletes the post
}

export interface PostItemProps {
  post: Post;                   // Post object
  remove: (post: Post) => void; // Function that deletes the post
  number: number;               // Order of the post (optional)
}

export interface MyContentProps {
  modal: boolean;
  setModal: (value: boolean) => void;
  filter: { sort: keyof Post | ''; query: string };
  setFilter: (filter: { sort: keyof Post | ''; query: string }) => void;
  sortedAndSearchedPosts: Post[];
  createPost: (newPost: Post) => void;
  removePost: (post: Post) => void;
  listTitle: string;
}

export interface ConfigEditorModalProps {
  config: Record<string, unknown>;
  setConfig: (newConfig: Record<string, unknown>) => void;
}