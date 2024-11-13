import React, {useState} from 'react';
import Image from "next/image";
import PostItem from "./PostItem";
import TableItem from "./TableItem";


const PostList = ({posts, listTitle, remove}) => {

    const [isTableView, setIsTableView] = useState(false);

    return(
        <div>
            <h1 style={{ textAlign: 'center' }}>{listTitle}</h1>

            <div className="view-buttons">
  <button onClick={() => setIsTableView(true)} className="list-button">
    <Image src="/table-list.png" alt="Table View" className="icon-button" width={20} height={20} />
  </button>
  <button onClick={() => setIsTableView(false)} className="list-button">
    <Image src="/list.png" alt="Posts View" className="icon-button" width={20} height={20} />
  </button>
</div>

{isTableView ? (
  <table className="sensor-table" border={0}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Beschreibung</th>
        <th>Date created</th>
        <th>Date modified</th>
        <th>Enabled</th>
        <th>Label</th>
        <th>UID</th>
        <th>Config</th>
        <th>on_connect</th>
      </tr>
    </thead>
    <tbody>
      {posts.map(post => <TableItem post={post} key={post.id} />)}
    </tbody>
  </table>
) : (
  posts.map((post, index) => <PostItem remove={remove} number={index + 1} post={post} key={post.id} />)
)}
        </div>
    );
};

export default PostList;