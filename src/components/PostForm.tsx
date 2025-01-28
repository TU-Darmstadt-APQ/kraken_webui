import React, { useState } from "react";

import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

import { PostFormProps, Post } from "@/types";

import { v4 as uuidv4 } from "uuid";

const sensorTypes = [
  {
    name: "GPIB",
    configFields: [
      { key: "frequence", required: true },
      { key: "voltage", required: false },
      { key: "temperature", required: false },
    ],
  },
  {
    name: "Tinkerforge",
    configFields: [
      { key: "freq", required: true },
      { key: "cel", required: true },
    ],
  },
];

/**
 * A form component for creating and adding new posts.
 *
 * @component
 * @param {PostFormProps} props - Props for the PostForm component.
 * @param {(post: { title: string, description: string, id: number }) => void}
 * props.create - Callback function to handle creating a new post.
 *
 * @returns {JSX.Element} A form with controlled input fields for post creation.
 * 
 * @example
 * // Example usage of PostForm component
 * const [postToEdit, setPostToEdit] = useState<Post | null>(null);
 * const createPost = (newPost: Post) => {
     setPosts([...posts, newPost]);
     setModal(false);
   };
   const editPost = (updatedPost: Post) => {
       setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
       setModal(false);
       setPostToEdit(null);
    };
 * 
 * <PostForm create={createPost} edit={editPost} postToEdit={postToEdit} />
 * 
 */
const PostForm: React.FC<PostFormProps> = ({ create, edit, postToEdit }) => {
  const defaultPost: Post = {
    id: uuidv4(),
    hostname: "",
    port: 0,
    pad: null,
    sad: null,
    driver: "",
    node_id: uuidv4(),
    reconnect_interval: null,
    date_created: new Date().toISOString(),
    date_modified: new Date().toISOString(),
    enabled: false,
    label: null,
    description: null,
  };

  // State for managing the input values of the form
  const [post, setPost] = useState<Post>(postToEdit || defaultPost);

  // State for managing the current type of sensor to be created
  const [selectedSensorType, setSelectedSensorType] = useState<string>("");

  const handleSensorTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setSelectedSensorType(selectedType);

    // find configuration for selected sensorType
    const selectedConfig =
      sensorTypes.find((type) => type.name === selectedType)?.configFields ||
      [];

    // set fields of configuration
    const newConfig = selectedConfig.reduce(
      (configEntities, field) => {
        configEntities[field.key] = "";
        return configEntities;
      },
      {} as Record<string, string>,
    );

    setPost((prev) => ({
      ...prev,
      config: newConfig,
      uuid: selectedType === "Tinkerforge" ? "AutoGeneratedHost" : "",
      port: selectedType === "Tinkerforge" ? 42 : 0,
    }));
  };

  React.useEffect(() => {
    // Update the form state whenever `postToEdit` changes
    if (postToEdit) {
      setPost(postToEdit); // editing mode
    } else {
      setPost(defaultPost); // creation mode => we clear all inputFields
    }
  }, [postToEdit]); // Runs whenever `postToEdit` changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // So that the page does not refresh after pressing the button

    // Check for required fields
    if (!post.driver.trim()) {
      alert("The `driver` must not be empty.");
      return;
    }
    if (!post.hostname.trim()) {
      alert("The `hostname` must not be empty.");
      return;
    }

    // We change the state indirectly. We create a new array where we write our old one. And at the end comes the new element

    if (postToEdit) {
      edit({ ...post, date_modified: new Date().toISOString() });
    } else {
      create({ ...post, id: uuidv4() }); // Generate a unique ID based on the current timestamp
    }

    setPost(defaultPost); // After inserting Element, we empty InputFields
  };

  return (
    <form>
      <label
        htmlFor="sensorType"
        style={{
          display: "block",
          marginBottom: "4px",
        }}
      >
        Sensor Type
      </label>
      <select
        id="sensorType"
        value={selectedSensorType}
        onChange={handleSensorTypeChange}
        style={{
          width: "100%",
          padding: "5px",
          border: "1px solid teal",
          marginBottom: "16px",
        }}
      >
        <option value="">Select Sensor Type</option>
        {sensorTypes.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>

      {/* Topic and Unit */}
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <MyInput
            value={post.label || ""}
            onChange={(e) => setPost({ ...post, label: e.target.value })}
            type="text"
            placeholder="Label"
          />
        </div>
      </div>

      {/* Description */}
      <MyInput
        value={post.description || ""}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
        type="text"
        placeholder="Description"
      />

      {/* Host, Port, Driver */}
      <div style={{ display: "flex", gap: "10px" }}>
        <MyInput
          value={post.hostname}
          onChange={(e) => setPost({ ...post, hostname: e.target.value })}
          type="text"
          placeholder="Host"
        />
        <MyInput
          value={post.port}
          onChange={(e) => setPost({ ...post, port: parseInt(e.target.value) })}
          type="number"
          placeholder="Port"
          disabled={selectedSensorType === "Tinkerforge"}
        />
        <MyInput
          value={post.driver}
          onChange={(e) => setPost({ ...post, driver: e.target.value })}
          type="text"
          placeholder="Driver"
        />
      </div>

      <MyButton onClick={handleSubmit}>
        {postToEdit ? "Save changes" : "Add new sensor"}
      </MyButton>
    </form>
  );
};

export default PostForm;
