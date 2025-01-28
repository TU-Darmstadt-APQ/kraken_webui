import React from "react";
import { v4 as uuidv4 } from "uuid";
import { tinkerforgeDTO } from "../models/zTinkerforgeSensor.schema"; // Adjust the import path accordingly
import { insertSensorAction } from "@/actions/action_createSensor";

interface PostFormProps {
  create: (post: tinkerforgeDTO) => void;
  edit: (post: tinkerforgeDTO) => void;
  postToEdit?: tinkerforgeDTO;
}

const PostForm: React.FC<PostFormProps> = ({ create, edit, postToEdit }) => {
  const defaultPost: tinkerforgeDTO = {
    id: uuidv4(),
    date_created: new Date().toISOString(),
    date_modified: new Date().toISOString(),
    enabled: false,
    label: null,
    description: null,
    uid: 0, // Default UID, adjust as necessary
    config: {}, // Default empty config object
    on_connect: [], // Default empty array for on_connect
  };

  const [post, setPost] = React.useState<tinkerforgeDTO>(
    postToEdit || defaultPost,
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const sensorDTO = {
      id: post.id || uuidv4(), // Ensure `uuid` is a string (or convert it if necessary)
      date_created: post.date_created, // Convert to string
      date_modified: post.date_modified, // Convert to string
      enabled: post.enabled || false, // Ensure `enabled` is a boolean
      label: post.label || null, // Ensure `label` is `string | null`
      description: post.description || null, // Ensure `description` is `string | null`
      uid: post.uid || 0, // Ensure `uid` is a string (or convert it if necessary)
      config: post.config || {}, // Ensure `config` is an object
      on_connect: post.on_connect || [], // Ensure `on_connect` is an array
    };

    // Call the server action
    const result = await insertSensorAction(sensorDTO);

    if (result.success) {
      if (postToEdit) {
        edit({ ...post, date_modified: new Date().toISOString() });
      } else {
        create({ ...post, id: uuidv4() });
      }

      setPost(defaultPost);
    } else {
      alert(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for each property in tinkerforgeDTO */}
      <div>
        <label>Label:</label>
        <input
          type="text"
          value={post.label || ""}
          onChange={(e) => setPost({ ...post, label: e.target.value })}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={post.description || ""}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        />
      </div>
      <div>
        <label>Enabled:</label>
        <input
          type="checkbox"
          checked={post.enabled}
          onChange={(e) => setPost({ ...post, enabled: e.target.checked })}
        />
      </div>
      {/* Add more fields as necessary for uid, config, on_connect, etc. */}
      <button type="submit">{postToEdit ? "Update" : "Create"}</button>
    </form>
  );
};

export default PostForm;
