import React, { useState } from "react";

import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import ConfigEditorModal from "./UI/ConfigEditorModal";
import MyTooltip from "./UI/tooltip/MyTooltip";

import { PostFormProps, Post } from "@/app/types";

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
  // Helper function to generate the current date
  const getCurrentDate = () => {
    const currentDate = new Date();
    return {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1, // Months are 0-indexed
      year: currentDate.getFullYear(),
      nanoseconds: currentDate.getMilliseconds() * 1e6, // Milliseconds to nanoseconds
    };
  };

  const defaultPost: Post = {
    id: 0,
    title: "",
    description: "",
    date_created: getCurrentDate(),
    date_modified: getCurrentDate(),
    enabled: false,
    label: "",
    uuid: "",
    config: {},
    on_connect: undefined,
    topic: "",
    unit: "",
    driver: "",
    port: 0,
    sad: 0,
    pad: 0,
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
    if (!post.uuid.trim()) {
      alert("The `UUID` must not be empty.");
      return;
    }
    if (!post.topic.trim()) {
      alert("The `topic` must not be empty.");
      return;
    }
    if (!post.unit.trim()) {
      alert("The `unit` must not be empty.");
      return;
    }

    // We change the state indirectly. We create a new array where we write our old one. And at the end comes the new element

    if (postToEdit) {
      edit({ ...post, date_modified: getCurrentDate() });
    } else {
      create({ ...post, id: Date.now() }); // Generate a unique ID based on the current timestamp
    }

    setPost({
      id: 0,
      title: "",
      description: "",
      date_created: getCurrentDate(),
      date_modified: getCurrentDate(),
      enabled: false,
      label: "",
      uuid: "",
      config: {},
      on_connect: undefined,
      topic: "",
      unit: "",
      driver: "",
      port: 0,
      sad: 0,
      pad: 0,
    }); // After inserting Element, we empty InputFields
  };

  return (
    <form>
      <label htmlFor="sensorType">Sensor Type</label>
      <select
        id="sensorType"
        value={selectedSensorType}
        onChange={handleSensorTypeChange}
      >
        <option value="">Select Sensor Type</option>
        {sensorTypes.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>

      <div style={{ width: "100%" }}>
        {/* Sensor Host UUID */}
        {selectedSensorType === "Tinkerforge" ? (
          <MyTooltip
            infoText="Host is auto-generated for selected type of sensors."
            position="right"
          >
            <MyInput
              value={post.uuid}
              onChange={(e) => setPost({ ...post, uuid: e.target.value })}
              type="text"
              placeholder="Sensor Host UUID"
              disabled={true}
            />
          </MyTooltip>
        ) : (
          <MyInput
            value={post.uuid}
            onChange={(e) => setPost({ ...post, uuid: e.target.value })}
            type="text"
            placeholder="Sensor Host UUID"
          />
        )}
      </div>

      {/* Topic and Unit */}
      <div style={{ display: "flex", gap: "10px" }}>
        <MyInput
          value={post.topic}
          onChange={(e) => setPost({ ...post, topic: e.target.value })}
          type="text"
          placeholder="Topic"
        />
        <MyInput
          value={post.unit}
          onChange={(e) => setPost({ ...post, unit: e.target.value })}
          type="text"
          placeholder="Unit"
        />
      </div>

      {/* Port, Pad, Sad, Driver */}
      <div style={{ display: "flex", gap: "10px" }}>
        <MyInput
          value={post.port}
          onChange={(e) => setPost({ ...post, port: parseInt(e.target.value) })}
          type="number"
          placeholder="Port"
          disabled={selectedSensorType === "Tinkerforge"}
        />
        <MyInput
          value={post.pad}
          onChange={(e) => setPost({ ...post, pad: parseInt(e.target.value) })}
          type="number"
          placeholder="Pad"
        />
        <MyInput
          value={post.sad}
          onChange={(e) => setPost({ ...post, sad: parseInt(e.target.value) })}
          type="number"
          placeholder="Sad"
        />
        <MyInput
          value={post.driver}
          onChange={(e) => setPost({ ...post, driver: e.target.value })}
          type="text"
          placeholder="Driver"
        />
      </div>

      {/* Description */}
      <MyInput
        value={post.description}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
        type="text"
        placeholder="Description"
      />

      {/* For editing the configuration */}
      <ConfigEditorModal
        config={post.config || {}} // If no Config exists, an empty object is provided
        setConfig={(newConfig) => setPost({ ...post, config: newConfig })}
      />

      <MyButton onClick={handleSubmit}>
        {postToEdit ? "Save changes" : "Add new sensor"}
      </MyButton>
    </form>
  );
};

export default PostForm;
