import React from "react";
import { v4 as uuidv4 } from "uuid";
import { tinkerforgeDTO } from "../models/zTinkerforgeSensor.schema"; // Adjust the import path accordingly

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (postToEdit) {
      edit(post);
    } else {
      create(post);
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
