import React, {useState} from "react";

import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

import { PostFormProps } from '@/app/types';


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
    const [post, setPost] = useState({title: '', description: ''}); //gesteuerter Element 

    const addNewPost = (e: any) => {
        e.preventDefault(); // So that the page does not refresh after pressing the button
        const newPost ={
            ...post, id: Date.now() // Generate a unique ID based on the current timestamp
        }// We change the state indirectly. We create a new array where we write our old one. And at the end comes the new element
        create(newPost);
        setPost({title: '', description: ''}); // After inserting Element, we empty InputFields
      }

    return(
        <form>
         {/* Controlled input field for the post title */}
        <MyInput value={post.title} onChange={e => setPost({...post, title: e.target.value})} type="text" placeholder="Name der Sensor"/>
        <MyInput value={post.description} onChange={e => setPost({...post, description: e.target.value})} type="text" placeholder="Beschreibung"/>
        <MyButton onClick={addNewPost}>Sensor einfügen</MyButton>
      </form>
    );
};

export default PostForm;

