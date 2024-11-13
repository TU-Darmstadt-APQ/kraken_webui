"use client";

import React, { useState } from "react";

import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/button/select/MySelect";


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

  const[selectedSort, setSelectedSort] = useState('')

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  }
  const removePost = (post: Post) => {
    setPosts(posts.filter(p => p.id != post.id));
  }
  const sortPosts = (sort: keyof Post) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => {
      if (a[sort] && b[sort]) {
        return String(a[sort]).localeCompare(String(b[sort]));
      }
      return 0;
    })); //da die Methode sort der ursprunglichen Array veraendert machen wir eine Kopie und sortieren sie
  }

  return (
    <div className="App">
      <PostForm create={createPost}/> {/*als Argument fuer unseren Komponent senden wir eine Methode, die iwelchen Wert fuer Elternknoten zurueckliefert. Es ist so, da React als Baum dargestellt ist und Elternknoten koennen Attribute an Kinder senden, aber nicht umgekehrt */}
      <hr style={{margin: '15px 0'}}></hr>
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="sortieren nach:"
          options={[
            {value: 'title', name: 'Nach Name'},
            {value: 'description', name: 'Nach Beschreibung'}
          ]}
        />
      </div>
      {posts.length !== 0 
        ? 
        <PostList remove={removePost} posts={posts} listTitle={"Die Liste aller Sensoren"}></PostList> 
        :
        <h1 style={{textAlign: 'center'}}>
          keine Sensoren gefunden
        </h1>
      }
      
    </div>
  );
}

export default Page;
