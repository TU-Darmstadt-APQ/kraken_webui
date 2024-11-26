import { ReactNode } from 'react';

export interface Post {
    id: number;
    title: string;
    description?: string; //alle mit dem Fragezeichen gezeichnete Zeilen sind opitonal (bzw. müssen nicht bei der Erstellung des Objektes dabei sein)
    date_created?: DateType;
    date_modified?: DateType;
    enabled?: boolean;
    label?: string;
    uid?: string;
    config?: Record<string, unknown>; // Flexible Konfiguration (Objekt mit beliebigen Werten)
    on_connect?: string;
}
export interface DateType {
  day?: number;
  month?: number;
  year?: number;
  nanoseconds?: number;
}

// Definiere das Interface für den Filter
interface Filter {
  sort: keyof Post | ''; // Das 'sort' kann ein Schlüssel von Post oder ein leerer String sein
  query: string; // Suchbegriff
}

// Typisiere die Props der PostFilter-Komponente
export interface PostFilterProps {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>; // setFilter ist eine Funktion, die den Filter-Zustand ändert
}

// Typisiere einzelne Select-Option
export interface MySelectOption {
  value: string;
  name: string;
}

// Typisiere die Props der FilterSelect-Komponente
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
  children: React.ReactNode; // Inhalte zwischen den Tags
  visible: boolean; // Sichtbarkeit des Fensters
  setVisible: (visible: boolean) => void; // Funktion zur Änderung der Sichtbarkeit
}

export interface MyButtonProps {
  children: ReactNode;
  [key: string]: any; // Catch-all for any additional props
}

export interface PostListProps {
  posts: Post[];               // Array von Posts
  listTitle: string;           // Titel der Liste
  remove: (post: Post) => void; // Funktion zum Entfernen eines Posts
}

export interface TableItemProps {
  post: Post;                   // Ein einzelner Post
  remove: (post: Post) => void; // Funktion, die einen Post entfernt
}

export interface PostItemProps {
  post: Post;                   // Einzelner Post
  remove: (post: Post) => void; // Funktion, die einen Post entfernt
  number: number;               // Reihenfolge des Posts (optional)
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