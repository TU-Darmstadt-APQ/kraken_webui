import { DTOtoPostKeys, PostFilterProps } from "@/types";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import React from "react";
import styles from "@/styles/PostFilter.module.css";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

/**
 * A component for filtering posts based on a search query and a selected sorting option.
 *
 * @component
 * @param {PostFilterProps} props - The props for the PostFilter component.
 * @param {{ query: string, sort: keyof Post }} props.filter - The current filter state containing the search query and sort option.
 * @param {(filter: { query: string, sort: keyof Post }) => void} props.setFilter - Callback function to update the filter state.
 *
 * @returns {JSX.Element} A filtering interface with an input for searching and a dropdown for sorting.
 *
 * @example
 * // Example usage of PostFilter component
 * const [filter, setFilter] = useState({ query: '', sort: 'title' });
 *
 * <PostFilter filter={filter} setFilter={setFilter} />
 */
const PostFilter: React.FC<PostFilterProps> = ({ filter, setFilter }) => {
  return (
    <div className={styles["filter-container"]}>
      {/* Input field for entering a search query */}
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })} // Update the `query` property in the filter state when the user types
        placeholder="Search for..." // Placeholder text for the input field
      />

      <div className={styles["filter-options"]}>
        <div>
          <span>Sort by: </span>

          <MySelect
            value={filter.sort}
            onChange={(selectedSort: keyof tinkerforgeDTO) =>
              setFilter({ ...filter, sort: selectedSort })
            } // Update the `sort` property in the filter state when a new option is selected
            defaultValue="Sort by:" // Placeholder text for the dropdown menu
            options={[
              // Sorting options
              { value: "title", name: "Name" },
              { value: "description", name: "Description" },
              { value: "date_created", name: "Creation date" },
              { value: "date_modified", name: "Last modified date" },
              { value: "enabled", name: "Enabled" },
              { value: "label", name: "Label" },
              { value: "uuid", name: "UUID" },
            ]}
          />
        </div>

        <div>
          <span>Search by: </span>

          <MySelect
            value={filter.searchField}
            onChange={(selectedSearchField: keyof tinkerforgeDTO) =>
              setFilter({
                ...filter,
                searchField: DTOtoPostKeys(selectedSearchField),
              })
            } // Update the `searchField` property in the search state when a new option is selected
            defaultValue="Search by:" // Placeholder text for the dropdown menu
            options={[
              // Sorting options
              { value: "all", name: "All" },
              { value: "title", name: "Name" },
              { value: "description", name: "Description" },
              { value: "date_created", name: "Creation date" },
              { value: "date_modified", name: "Last modified date" },
              { value: "enabled", name: "Enabled" },
              { value: "label", name: "Label" },
              { value: "uuid", name: "UUID" },
              { value: "config", name: "Config" },
              { value: "on_connect", name: "on_connect" },
              { value: "topic", name: "Topic" },
              { value: "unit", name: "Unit" },
              { value: "port", name: "Port" },
              { value: "pad", name: "Pad" },
              { value: "sad", name: "Sad" },
              { value: "driver", name: "Driver" },
              { value: "sensor_type", name: "Sensor Type" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PostFilter;
