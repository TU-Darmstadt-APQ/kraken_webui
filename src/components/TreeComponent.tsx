import React, { useEffect, useState } from "react";
import MyButton from "./UI/button/MyButton";
import Tree from "react-d3-tree";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

/**
 * Interface representing a tree node structure.
 * Each node has a `name` (label) and a list of `children` (sub-nodes).
 */
interface TreeNode {
  name: string;
  children: TreeNode[];
}

/**
 * Function to build a balanced binary tree from a given list of sensors.
 * This function ensures that each parent node has at most two child nodes.
 *
 * @param sensors - An array of sensor objects, each containing an `id` and an optional `label`.
 * @returns The root node of the balanced tree.
 */
const buildBalancedTree = (
  sensors: { id: string; label?: string | null }[],
): TreeNode | null => {
  if (!sensors.length) return null; // If no sensors are provided, return null.

  // The first sensor in the list becomes the root of the tree.
  const root: TreeNode = {
    name: sensors[0].label ?? `No description №1`, // If `label` is null, assign a default name.
    children: [],
  };

  // Using a queue to manage node insertion in a breadth-first manner.
  const queue: TreeNode[] = [root];
  let index = 1; // Start from the second sensor.

  while (index < sensors.length) {
    const parent = queue.shift();
    if (parent) {
      for (let i = 0; i < 2 && index < sensors.length; i++, index++) {
        // Create a new child node with the sensor's label (or a default name if null).
        const childNode: TreeNode = {
          name: sensors[index].label ?? `No description №${index + 1}`,
          children: [],
        };
        parent.children.push(childNode); // Attach the child to its parent.
        queue.push(childNode); // Add the new node to the queue for future expansion.
      }
    }
  }

  return root;
};

/**
 * React component that visualizes a tree structure built from sensor data.
 *
 * @param sensors - Array of sensor objects used to construct the tree.
 */
const TreeComponent = ({ sensors }: { sensors: tinkerforgeDTO[] }) => {
  // State to store the generated tree data.
  const [treeData, setTreeData] = useState<TreeNode | null>(null);

  // State for managing zoom level.
  const [zoomLevel, setZoomLevel] = useState(1);

  // Build the tree whenever the `sensors` data changes.
  useEffect(() => {
    if (sensors.length) {
      setTreeData(buildBalancedTree(sensors)); // Convert sensor data into a tree structure.
    }
  }, [sensors]);

  // Display a loading message if the tree is not yet built.
  if (!treeData) return <p>Loading tree...</p>;

  return (
    <div style={{ width: "100%", height: "800px" }}>
      {/* Buttons for zooming in and out */}
      <MyButton onClick={() => setZoomLevel(zoomLevel * 1.1)}>
        ➕ Zoom In
      </MyButton>
      <MyButton onClick={() => setZoomLevel(zoomLevel * 0.9)}>
        ➖ Zoom Out
      </MyButton>

      {/* Render the tree with horizontal orientation */}
      <Tree
        data={treeData} // Provide tree data
        orientation="horizontal" // Set the tree layout to be left-to-right
        scaleExtent={{ min: 0.5, max: 2 }} // Define minimum and maximum zoom levels
        zoom={zoomLevel} // Apply zoom level from state
        translate={{ x: 400, y: 100 }} // Adjust the initial position of the tree
      />
    </div>
  );
};

export default TreeComponent;
