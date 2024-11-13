import React from "react";

const TableItem = (props) => {
    return(
        <tr>
            <td>{props.post.id}</td>
            <td>{props.post.title}</td>
            <td>{props.post.description}</td>
            <td>{props.post.date_created}</td>
            <td>{props.post.date_modified}</td>
            <td>{props.post.enabled}</td>
            <td>{props.post.label}</td>
            <td>{props.post.uid}</td>
            <td>{props.post.config}</td>
            <td>{props.post.on_connect}</td>
            <td style={{ borderBottomStyle: 'hidden', borderTopStyle: 'hidden', borderRightStyle: 'hidden' }}><button className="list-button">Edit</button></td>
            <td style={{ borderBottomStyle: 'hidden', borderTopStyle: 'hidden', borderRightStyle: 'hidden' }}><button className="list-button">Delete</button></td>
        </tr>
    );
};

export default TableItem;

