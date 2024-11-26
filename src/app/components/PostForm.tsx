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
    // State for managing the input values of the form  
    const [post, setPost] = useState<Post>({
      id: 0,
      title: "",
      description: "",
      date_created: {
        day: 0,
        month: 0,
        year: 0,
        nanoseconds: 0,
      },
      enabled: false,
      label: "",
      uid: "",
      config: {},
      on_connect: undefined,
    });

    const addNewPost = (e: React.FormEvent) => {
        e.preventDefault(); // So that the page does not refresh after pressing the button
        const newPost ={
            ...post, id: Date.now() // Generate a unique ID based on the current timestamp
        }// We change the state indirectly. We create a new array where we write our old one. And at the end comes the new element
        create(newPost);
        setPost({
          id: 0,
          title: "",
          description: "",
          date_created: { day: 0, month: 0, year: 0, nanoseconds: 0 },
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
        <MyInput value={post.title} onChange={e => setPost({...post, title: e.target.value})} type="text" placeholder="Name der Sensor"/>
        <MyInput value={post.description} onChange={e => setPost({...post, description: e.target.value})} type="text" placeholder="Beschreibung"/>
        
        {/* Eingaben für das Erstellungsdatum */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span>Ersteldatum: </span>
      <MyInput
        value={post.date_created?.day || ""}
        onChange={(e) =>
          setPost({
            ...post,
            date_created: { ...post.date_created, day: parseInt(e.target.value) },
          })
        }
        type="number"
        placeholder="Tag"
      />
      <MyInput
        value={post.date_created?.month || ""}
        onChange={(e) =>
          setPost({
            ...post,
            date_created: {
              ...post.date_created,
              month: parseInt(e.target.value),
            },
          })
        }
        type="number"
        placeholder="Monat"
      />
      <MyInput
        value={post.date_created?.year || ""}
        onChange={(e) =>
          setPost({
            ...post,
            date_created: {
              ...post.date_created,
              year: parseInt(e.target.value),
            },
          })
        }
        type="number"
        placeholder="Jahr"
      />
      </div>

      {/* Eingabe für den Status */}
      <label>
        Aktiviert:
        <input
          type="checkbox"
          checked={post.enabled}
          onChange={(e) => setPost({ ...post, enabled: e.target.checked })}
        />
      </label>

      {/* Eingabe für Label */}
      <MyInput
        value={post.label}
        onChange={(e) => setPost({ ...post, label: e.target.value })}
        type="text"
        placeholder="Label"
      />

      {/* Eingabe für Benutzer-ID */}
      <MyInput
        value={post.uid}
        onChange={(e) => setPost({ ...post, uid: e.target.value })}
        type="text"
        placeholder="Benutzer-ID"
      />


      {/* Modal für die Bearbeitung der Konfiguration */}
      <ConfigEditorModal
        config={post.config|| {}} //falls kein Config existiert, wird ein leeres Objekt übergeben
        setConfig={(newConfig) => setPost({ ...post, config: newConfig })}
      />
        
        <MyButton onClick={addNewPost}>Sensor einfügen</MyButton>
      </form>
    );
};

export default PostForm;
