import React, { useState } from 'react';
import Image from "next/image";
import PostItem from "./PostItem"
import TableItem from "./TableItem";

import { PostListProps } from '@/app/types';

/**
 * Component for rendering a list of posts with the ability to toggle between table view and post view.
 *
 * @component
 * @param {Array} posts - Array of post objects to display.
 * @param {string} listTitle - Title of the list.
 * @param {(post: object) => void} remove - Callback function to handle removing a post.
 */
const PostList: React.FC<PostListProps> = ({ posts, listTitle, remove, edit }) => {

    // Display a message when no posts are available
    if (!posts.length) {
        return (
            <h1 style={{ textAlign: 'center' }}>
                No sensors found
            </h1>
        );
    }

    // State to toggle between table view and post view
    const [isTableView, setIsTableView] = useState(false);

    const [selectedColumns, setSelectedColumns] = useState({
        id: true,
        title: false,
        description: true,
        date_created: true,
        date_modified: true,
        enabled: true,
        label: false,
        uuid: true,
        config: true,
        on_connect: false,
        topic: false,
        unit: false,
        port: false,
        pad: false,
        sad: false,
        driver: false,
        sensor_type: false
      });

    return (
        <div>
            {/* Title for the list */}
            <h1 style={{ textAlign: 'center' }}>{listTitle}</h1>

            {/* Buttons to toggle view mode */}
            <div className="view-buttons">
                <button onClick={() => setIsTableView(true)} className="list-button">
                    <Image 
                        src="/table-list.png" 
                        alt="Table View" 
                        className="icon-button" 
                        width={20} 
                        height={20} 
                    />
                </button>
                <button onClick={() => setIsTableView(false)} className="list-button">
                    <Image 
                        src="/list.png" 
                        alt="Posts View" 
                        className="icon-button" 
                        width={20} 
                        height={20} 
                    />
                </button>
            </div>

            {/* Conditional rendering for table view or post view */}
            {isTableView ? (
                <div>
                <div className="toggle-container">
                {Object.keys(selectedColumns).map((columnKey) => (
                    <label key={columnKey}>
                      <input
                        type="checkbox"
                        checked={selectedColumns[columnKey]}
                        onChange={(e) =>
                          setSelectedColumns((prev) => ({
                            ...prev,
                            [columnKey]: e.target.checked,
                          }))
                        }
                      />
                      {columnKey}
                    </label>
                  ))}
                  </div>
                

                {/* Render posts in table format */}
                <div className="table-container">
                <table className="sensor-table" border={0}>
                    <thead>
                        <tr>
                            {selectedColumns.id && <th>ID</th>}
                            {selectedColumns.title && <th>Title</th>}
                            {selectedColumns.description && <th>Description</th>}
                            {selectedColumns.date_created && <th>Date created</th>}
                            {selectedColumns.date_modified && <th>Date modified</th>}
                            {selectedColumns.enabled && <th>Enabled</th>}
                            {selectedColumns.label && <th>Label</th>}
                            {selectedColumns.uuid && <th>UUID</th>}
                            {selectedColumns.config && <th>Config</th>}
                            {selectedColumns.on_connect && <th>on_connect</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <TableItem 
                                edit={edit}
                                remove={remove} 
                                post={post} 
                                selectedColumns={selectedColumns}
                                key={post.id} 
                            />
                        ))}
                    </tbody>
                </table>
                </div>
                </div>
            ) : (
                // Render posts in a card-like view
                posts.map((post, index) => (
                    <PostItem 
                        edit={edit}
                        remove={remove} 
                        number={index + 1} 
                        post={post} 
                        key={post.id} 
                    />
                ))
            )}
        </div>
    );
};

export default PostList;
