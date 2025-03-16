import React from "react";
import Tree from "react-d3-tree";

const treeData = {
  name: "Root",
  children: [
    {
      name: "Parent 1",
      children: [{ name: "Child 1.1" }, { name: "Child 1.2" }],
    },
    {
      name: "Parent 2",
      children: [
        { name: "Child 2.1" },
        {
          name: "Child 2.2",
          children: [{ name: "Grandchild 2.2.1" }],
        },
      ],
    },
  ],
};

const TreeComponent = () => {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Tree data={treeData} orientation="vertical" />
    </div>
  );
};

export default TreeComponent;
