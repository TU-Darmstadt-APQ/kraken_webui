import React, {useState} from "react";

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
const PostForm: React.FC<PostFormProps> = ({create, edit, postToEdit}) => {
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

    React.useEffect(() => {
      // Update the form state whenever `postToEdit` changes
      if (postToEdit) {
        setPost(postToEdit); // editing mode
      }
      else{
        setPost(defaultPost); // creation mode => we clear all inputFields
      }
    }, [postToEdit]); // Runs whenever `postToEdit` changes

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // So that the page does not refresh after pressing the button

        // Check for required fields
        if (!post.driver.trim()) {
          alert("The `driver` cannot be empty.");
          return;
        }
        if (!post.uuid.trim()) {
          alert("The `UUID` cannot be empty.");
          return;
        }
        if (!post.topic.trim()) {
          alert("The `topic` cannot be empty.");
          return;
        }
        if (!post.unit.trim()) {
          alert("The `unit` cannot be empty.");
          return;
        }


        // Generate a unique ID based on the current timestamp
        // We change the state indirectly. We create a new array where we write our old one. And at the end comes the new element
        
        if(postToEdit){
          edit({ ...post, date_modified: getCurrentDate() });
          //create({...post, id: Date.now()}); 
        }
        else{
          create({...post, id: Date.now()});
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
          pad: 0
        }); // After inserting Element, we empty InputFields
      }

    return(
        <form>
          {/* Sensor Host UUID */}
          <MyInput
            value={post.uuid}
            onChange={(e) => setPost({ ...post, uuid: e.target.value })}
            type="text"
            placeholder="Sensor Host UUID"
          />

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
            onChange={(e) =>
              setPost({ ...post, description: e.target.value })
            }
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

