import React from "react";
import MyButton from "./UI/button/MyButton";

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
            <td style={{ borderBottomStyle: 'hidden', borderTopStyle: 'hidden', borderRightStyle: 'hidden' }}><MyButton className="list-button">Edit</MyButton></td>
            <td style={{ borderBottomStyle: 'hidden', borderTopStyle: 'hidden', borderRightStyle: 'hidden' }}><MyButton onClick={() => props.remove(props.post)} className="list-button">Delete</MyButton></td>
        </tr>
    );
};

export default TableItem;

