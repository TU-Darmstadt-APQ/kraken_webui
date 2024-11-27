import React, { useState } from "react";

import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import ConfigEditorModal from "./UI/ConfigEditorModal";

import { PostFormProps, Post } from '@/app/types';


/**
 * A form component for creating and adding new posts.
 *
 * @component
 * @param {PostFormProps} props - Props for the PostForm component.
 * @param {(post: { title: string, description: string, id: number }) => void}
 * props.create - Callback function to handle creating a new post.
 *
 * @returns {JSX.Element} A form with controlled input fields for post creation.
 */
const PostForm: React.FC<PostFormProps> = ({create}) => {
    // Helper function to generate the current date
    const getCurrentDate = () => {
      const now = new Date();
      return {
        day: now.getDate(),
        month: now.getMonth() + 1, // Months are 0-indexed
        year: now.getFullYear(),
        nanoseconds: now.getMilliseconds() * 1e6, // Milliseconds to nanoseconds
      };
    };

    // State for managing the input values of the form  
    const [post, setPost] = useState<Post>({
      id: 0,
      title: "",
      description: "",
      date_created: getCurrentDate(),
      date_modified: getCurrentDate(),
      enabled: false,
      label: "",
      uid: "",
      config: {},
      on_connect: undefined,
    });

    const addNewPost = (e: React.FormEvent) => {
        e.preventDefault(); // So that the page does not refresh after pressing the button

        // Check for required fields
        if (!post.title.trim()) {
          alert("The title cannot be empty.");
          return;
        }
        if (!post.uid || !post.uid.trim()) {
          alert("The user ID cannot be empty.");
          return;
        }


        const newPost ={
            ...post, id: Date.now() // Generate a unique ID based on the current timestamp
        }// We change the state indirectly. We create a new array where we write our old one. And at the end comes the new element
        create(newPost);
        setPost({
          id: 0,
          title: "",
          description: "",
          date_created: getCurrentDate(),
          date_modified: getCurrentDate(),
          enabled: false,
          label: "",
          uid: "",
          config: {},
          on_connect: undefined,
        }); // After inserting Element, we empty InputFields
      }

    return(
        <form>
         {/* Controlled input field for the post title */}
        <MyInput value={post.title} onChange={e => setPost({...post, title: e.target.value})} type="text" placeholder="Name of the sensor"/>
        <MyInput value={post.description} onChange={e => setPost({...post, description: e.target.value})} type="text" placeholder="Description"/>
        
        {/* Display the creation date */}
        <div>
          <span>Created on: {`${post.date_created.day}.${post.date_created.month}.${post.date_created.year}`}</span>
        </div>

      {/* Input for the status */}
      <label>
        Enabled:
        <input
          type="checkbox"
          checked={post.enabled}
          onChange={(e) => setPost({ ...post, enabled: e.target.checked })}
        />
      </label>

      {/* Input for Label */}
      <MyInput
        value={post.label}
        onChange={(e) => setPost({ ...post, label: e.target.value })}
        type="text"
        placeholder="Label"
      />

      {/* Input for User-ID */}
      <MyInput
        value={post.uid}
        onChange={(e) => setPost({ ...post, uid: e.target.value })}
        type="text"
        placeholder="User-ID"
      />


      {/* Modal for editing the configuration */}
      <ConfigEditorModal
        config={post.config || {}} // If no Config exists, an empty object is provided
        setConfig={(newConfig) => setPost({ ...post, config: newConfig })}
      />
        
        <MyButton onClick={addNewPost}>Add new Sensor</MyButton>
      </form>
    );
};

export default PostForm;
