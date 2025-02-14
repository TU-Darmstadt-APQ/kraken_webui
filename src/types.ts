import React from "react"; // Add import for React
import { ReactNode } from "react";
import { tinkerforgeDTO } from "./models/zTinkerforgeSensor.schema";

export interface Post {
  // Basic information
  title?: string;
  description?: string; // All lines marked with a question mark are optional (or do not have to be included when the object is created)
  uuid: string;
  label?: string | null;

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

// This is just a compatibility layer to convert tinkerforgeDTO -> Post. Remove this function when the transition
// from Post -> tinkerforgeDTO in the frontend is complete
export function convertDTOToPost(DTO: tinkerforgeDTO): Post {
  const dateCreated = new Date(DTO.date_created);
  const dateModified = new Date(DTO.date_modified);
  const post: Post = {
    uuid: DTO.id,
    label: DTO.label,
    date_created: {
      day: dateCreated.getDate(),
      month: dateCreated.getMonth(),
      year: dateCreated.getFullYear(),
    },
    date_modified: {
      day: dateModified.getDate(),
      month: dateModified.getMonth(),
      year: dateModified.getFullYear(),
    },
    enabled: DTO.enabled,
    description: DTO.description?.toString(),
    config: DTO.config,
    on_connect: DTO.on_connect.map((value) => value.toString()).toString(),
    topic: "",
    unit: "",
    driver: "",
  };
  return post;
}

/**
 * Converts a `Post` object into a `tinkerforgeDTO`.
 *
 * @param {Post} post - The `Post` object containing data to be transformed.
 * @returns {tinkerforgeDTO} The converted `tinkerforgeDTO` object.
 *
 * @description
 * This function extracts relevant data from a `Post` object and maps it to a `tinkerforgeDTO` format.
 * - Converts `date_created` and `date_modified` fields from an object representation (day, month, year) to a string format "DD-MM-YYYY".
 * - Ensures `enabled` is set to `false` if not explicitly defined.
 * - Maps `uuid` to both `id` (string) and `uid` (numeric format).
 * - Sets default values for `config` and initializes `on_connect` as an empty array.
 *
 * @warning
 * The `config` and `on_connect` fields are not fully converted yet and require further implementation.
 *
 * @example
 * const post: Post = {
 *   uuid: "1234",
 *   date_created: { day: 1, month: 2, year: 2023, nanoseconds: 3 },
 *   date_modified: { day: 5, month: 6, year: 2024 },
 *   enabled: true,
 *   label: "Sensor A",
 *   description: "Temperature sensor",
 *   topic: "topic",
 *   unit: "unit",
 *   driver: "driver"
 * };
 * const DTO = convertPostToDTO(post);
 */
export function convertPostToDTO(post: Post): tinkerforgeDTO {
  const dateCreated = [
    post.date_modified.day,
    post.date_modified.month,
    post.date_modified.year,
  ].join("-");
  const dateModified = [
    post.date_created.day,
    post.date_created.month,
    post.date_created.year,
  ].join("-");
  const DTO: tinkerforgeDTO = {
    id: post.uuid,
    date_created: dateCreated,
    date_modified: dateModified,
    enabled: post.enabled || false,
    label: post.label,
    description: post.description || null,
    uid: Number(post.uuid),
    config: {
      "": {
        description: "",
        interval: 0,
        trigger_only_on_change: false,
        topic: "",
        unit: "",
      },
    },
    on_connect: [],
  };
  return DTO;
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

export type ResponseType = {
  status: number;
  message: string;
};
