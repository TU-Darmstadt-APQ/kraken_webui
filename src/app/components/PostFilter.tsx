import React, { useState } from "react";
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";
import styles from "./../styles/PostFilter.module.css";

import { PostFilterProps, Post } from "@/app/types";

import { validateQuery } from "../zodShemas";

/**
 * A component for filtering posts based on a search query and a selected sorting option.
 *
 * @component
 * @param {PostFilterProps} props - The props for the PostFilter component.
 * @param {{ query: string, sort: keyof Post }} props.filter - The current filter state containing the search query and sort option.
 * @param {(filter: { query: string, sort: keyof Post }) => void} props.setFilter - Callback function to update the filter state.
 *
 * @returns {JSX.Element} A filtering interface with an input for searching and a dropdown for sorting.
 */
const PostFilter: React.FC<PostFilterProps> = ({ filter, setFilter }) => {
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Validate the new value using validateQuery
    const result = validateQuery(newValue);

    if (!result.success) {
      // If validation fails, set the error message
      setError(result.error.errors[0].message);
    } else {
      // If validation passes, clear the error and update the filter
      setError(null);
      setFilter({ ...filter, query: newValue });
    }
  };

  return (
    <div className={styles["filter-container"]}>
      {/* Input field for entering a search query */}
      <MyInput
        value={filter.query}
        onChange={handleInputChange} // Update the `query` property in the filter state when the user types
        placeholder="Search for..." // Placeholder text for the input field
        tooltipPosition="bottom"
        error={error || undefined}
      />

      <div className={styles["filter-options"]}>
        <div>
          <span>Sort by: </span>

          <MySelect
            value={filter.sort}
            onChange={(selectedSort: keyof Post) =>
              setFilter({ ...filter, sort: selectedSort })
            } // Update the `sort` property in the filter state when a new option is selected
            defaultValue="Sort by:" // Placeholder text for the dropdown menu
            options={[
              // Sorting options
              { value: "title", name: "Name" },
              { value: "description", name: "Description" },
              { value: "id", name: "ID" },
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
            onChange={(selectedSearchField: keyof Post) =>
              setFilter({ ...filter, searchField: selectedSearchField })
            } // Update the `searchField` property in the search state when a new option is selected
            defaultValue="Search by:" // Placeholder text for the dropdown menu
            options={[
              // Sorting options
              { value: "all", name: "All" },
              { value: "title", name: "Name" },
              { value: "description", name: "Description" },
              { value: "id", name: "ID" },
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
