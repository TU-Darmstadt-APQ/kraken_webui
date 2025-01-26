import React from "react"; // Add import for React
import { ReactNode } from "react";

export interface Post {
  // Basic information
  title?: string;
  description?: string; // All lines marked with a question mark are optional (or do not have to be included when the object is created)
  uuid: string;
  label?: string;

  // Dates
  date_created: DateType;
  date_modified: DateType;

  // Configuration and connection
  config?: Record<string, unknown>; // Flexible configuration (object with any values)
  on_connect?: string;

  // Sensor details
  topic: string;
  unit: string;
  driver: string;
  sensor_type?: string;
  host?: string;

  // Optional fields
  enabled?: boolean;
  port?: number;
  pad?: number;
  sad?: number;
}

export interface DateType {
  day?: number;
  month?: number;
  year?: number;
  nanoseconds?: number;
}

// Define the interface for the filter
export interface Filter {
  sort: keyof Post | ""; // The 'sort' can be a key from Post or an empty string
  query: string; // Search keyword
  searchField: keyof Post | "all"; // Current Searchfield
}

// General type for post deletion and editing functions (in general - for all callback-functions)
export type PostAction = (post: Post) => void;

// Interface for common properties of a component with posts
export interface PostComponentProps {
  post: Post;
  remove: PostAction;
  edit: PostAction;
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
  create: PostAction;
  edit: PostAction;
  postToEdit: Post | null;
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

export interface PostListProps extends Omit<PostComponentProps, "post"> {
  posts: Post[]; // Array of Posts
  listTitle: string; // Title of list
  modal: boolean;
  setModal: (value: boolean) => void;
  createPost: PostAction;
}

export interface TableItemProps extends PostComponentProps {
  selectedColumns: { [key: string]: boolean };
}

export interface PostItemProps extends PostComponentProps {
  number: number; // Order of the post (optional)
}

export interface MyContentProps {
  modal: boolean;
  setModal: (value: boolean) => void;
  sortedAndSearchedPosts: Post[];
  createPost: PostAction;
  removePost: PostAction;
  editPost: PostAction;
  handleEdit: PostAction;
  postToEdit: Post | null;
  listTitle: string;
}

export interface ConfigEditorModalProps {
  config: Record<string, unknown>;
  setConfig: (newConfig: Record<string, unknown>) => void;
}

export interface MyHeaderProps {
  addingNewSensor: () => void;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

export interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export interface MyTooltipProps {
  infoText: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right" | "bottom-right" | "top-right"; // possible direction for tooltip appereance
}

export interface InputRowProps {
  selectedColumns: { [key: string]: boolean };
  onCancel: () => void;
  createPost: PostAction;
}
