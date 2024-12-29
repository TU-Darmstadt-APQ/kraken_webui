import React from "react";
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";

import { PostFilterProps, Post } from "@/app/types";

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
  return (
    <div>
      {/* Input field for entering a search query */}
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })} // Update the `query` property in the filter state when the user types
        placeholder="Searching for..." // Placeholder text for the input field
      />

        <MySelect
          value={filter.query}
          onChange={(selectedSort: keyof Post) => setFilter({...filter, sort: selectedSort})} // Update the `sort` property in the filter state when a new option is selected
          defaultValue="sortieren nach:" // Placeholder text for the dropdown menu
          options={[ // Sorting options
            {value: 'title', name: 'Nach Name'},
            {value: 'description', name: 'Nach Beschreibung'},
            {value: 'id', name: 'Nach ID'},
            {value: 'date_created', name: 'Nach Erstelsdatum'},
            {value: 'date_modified', name: 'Zulezt geändert'},
            {value: 'enabled', name: 'Eingeschaltet'},
            {value: 'label', name: 'Label'},
            {value: 'uid', name: 'UID'},
          ]}
        />
      </div>
  );
};

export default PostFilter;
