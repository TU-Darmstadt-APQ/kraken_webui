import React from 'react';
import MySelect from "./UI/button/select/MySelect";
import MyInput from "./UI/button/input/MyInput";

const PostFilter = ({filter, setFilter}) => {
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
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
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