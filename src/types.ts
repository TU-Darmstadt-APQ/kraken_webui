import React from "react"; // Add import for React
import { ReactNode } from "react";
import { tinkerforgeDTO } from "./models/zTinkerforgeSensor.schema";

export interface DateType {
  day?: number;
  month?: number;
  year?: number;
  nanoseconds?: number;
}

// Define the interface for the filter
export interface Filter {
  sort: keyof tinkerforgeDTO | ""; // The 'sort' can be a key from Post or an empty string
  query: string; // Search keyword
  searchField: keyof tinkerforgeDTO | "all"; // Current Searchfield
}

// General type for post deletion and editing functions (in general - for all callback-functions)
export type PostAction = (post: tinkerforgeDTO) => void;

// Interface for common properties of a component with posts
export interface PostComponentProps {
  post: tinkerforgeDTO;
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
  onChange: (value: keyof tinkerforgeDTO) => void;
}

export interface PostFormProps {
  create: PostAction;
  edit: PostAction;
  postToEdit: tinkerforgeDTO | null;
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
  posts: tinkerforgeDTO[]; // Array of Posts
  listTitle: string; // Title of list
  inputRow: boolean;
  setInputRow: (value: boolean) => void;
  createPost: PostAction;
  editPost: PostAction;
  postToEdit: tinkerforgeDTO | null;
}

export interface TableItemProps extends PostComponentProps {
  selectedColumns: { [key: string]: boolean };
}

export interface PostItemProps extends PostComponentProps {
  number: number; // Order of the post (optional)
}

export interface MyContentProps {
  inputRow: boolean;
  setInputRow: (value: boolean) => void;
  sortedAndSearchedPosts: tinkerforgeDTO[];
  createPost: PostAction;
  removePost: PostAction;
  editPost: PostAction;
  handleEdit: PostAction;
  postToEdit: tinkerforgeDTO | null;
  listTitle: string;
}

export interface ConfigEditorModalProps {
  config: Record<string, unknown>;
  setConfig: (newConfig: Record<string, unknown>) => void;
  selectedSensorType: string;
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
  visible: boolean; // Visibility of the ModalWindow
  setVisible: (val: boolean) => void;
  selectedColumns: { [key: string]: boolean };
  createPost: PostAction;
  edit: PostAction;
  postToEdit: tinkerforgeDTO | null;
}
/**
 * Interface representing a tree node structure.
 * Each node has a `name` (label) and a list of `children` (sub-nodes).
 */
export interface TreeNode {
  name: string;
  children: TreeNode[];
}
