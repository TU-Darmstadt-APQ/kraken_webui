import React, {useState} from "react";

import MyButton from "./UI/button/button/MyButton";
import MyInput from "./UI/button/input/MyInput";


const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', description: ''}); //gesteuerter Element 

    const addNewPost = (e: any) => {
        e.preventDefault(); //damit nach dem Drucken des Knopfes die Seite sich nicht neulaedt
        const newPost ={
            ...post, id: Date.now()
        }//wir aendern den Zustand indirekt. Wir erstellen neuen Array wo wir unseren alten schreiben. Und am Ende das neue Element
        create(newPost);
        setPost({title: '', description: ''}); //nachdem Einfuegen von Element, leeren wir InputFields
      }

    return(
        <form>
        {/*das kontrollierte/ gesteuerte Objekt*/}
        <MyInput value={post.title} onChange={e => setPost({...post, title: e.target.value})} type="text" placeholder="Name der Sensor"/>
        <MyInput value={post.description} onChange={e => setPost({...post, description: e.target.value})} type="text" placeholder="Beschreibung"/>
        <MyButton onClick={addNewPost}>Sensor einfuegen</MyButton>
      </form>
    );
};

export default PostForm;

