export interface Post {
    id: number;
    title: string;
    description?: string; //alle mit dem Fragezeichen gezeichnete Zeilen sind opitonal (bzw. müssen nicht bei der Erstellung des Objektes dabei sein)
    date_created?: string;
    date_modified?: string;
    enabled?: string;
    label?: string;
    uid?: string;
    config?: string;
    on_connect?: string;
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