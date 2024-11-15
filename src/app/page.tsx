"use client";

import React, { useState, useMemo } from "react";

import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import ModalWindow from "./components/UI/button/ModalWindow/ModalWindow";
import MyButton from "./components/UI/button/button/MyButton";


function Page() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Lorem ispum',
      description: 'Description',
      date_created: '2012',
      date_modified: '2012',
      enabled: 'true',
      label: 'XXX',
      uid: '125633',
      config: 'etwas',
      on_connect: 'etwas anderes'
    },
    { id: 2, title: 'Sensor', description: 'Description' },
    { id: 3, title: 'Sensor 2', description: 'Description' }
  ]);

  interface Post {
    id: number;
    title: string;
    description: string;
    date_created: string;
    date_modified: string;
    enabled: string;
    label: string;
    uid: string;
    config: string;
    on_connect: string;
  }


  //es gibt zwei Moeglichkeiten, wie man Zugrif zu DOM-Objekten kriegt - Controlled component und Uncontrolled component
  //wir benutzen "controlled"

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal]  =useState(false)

  const sortedPosts = useMemo(() => {
    if(filter.sort){
      return [...posts].sort((a: any, b: any) => {
        if (a[filter.sort] && b[filter.sort]) {
          return String(a[filter.sort]).localeCompare(String(b[filter.sort]));
        }
        return 0;
      })
    }
    return posts;
  }, [filter.sort, posts])

  //um Suche Registerunabhaengig zu machen, habe ich toLowerCase fuer IP und Titles eingefuehrt
  const sortedAndSeatchedPosts = useMemo(
    () => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts]
  )

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }
  const removePost = (post: Post) => {
    setPosts(posts.filter(p => p.id != post.id));
  }

  return (
    <div className="App">
      {/* Pop-Up Window oder ModalWindow */}
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Sensor Einfuegen
      </MyButton>
      <ModalWindow visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/> {/*als Argument fuer unseren Komponent senden wir eine Methode, die iwelchen Wert fuer Elternknoten zurueckliefert. Es ist so, da React als Baum dargestellt ist und Elternknoten koennen Attribute an Kinder senden, aber nicht umgekehrt */}
      </ModalWindow>
      
      <hr style={{margin: '15px 0'}}></hr>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <PostList remove={removePost} posts={sortedAndSeatchedPosts} listTitle={"Die Liste aller Sensoren"}></PostList> 
      
    </div>
  );
}

export default Page;
