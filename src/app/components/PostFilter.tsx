import React from 'react';
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";

import { PostFilterProps, Post } from "../types";

const PostFilter: React.FC<PostFilterProps> = ({filter, setFilter}) => {
  return (
    <div>
        {/*Suchefeld*/}
        <MyInput
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
          placeholder="Suchen nach..."
        /> {/* gesteuertes Element mithilfe von searchQuery */}

        <MySelect
          value={filter.query}
          onChange={(selectedSort: keyof Post) => setFilter({...filter, sort: selectedSort})}
          defaultValue="sortieren nach:"
          options={[
            {value: 'title', name: 'Nach Name'},
            {value: 'description', name: 'Nach Beschreibung'}
          ]}
        />
      </div>
  );
};

export default PostFilter;