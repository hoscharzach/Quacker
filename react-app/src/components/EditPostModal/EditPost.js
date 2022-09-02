import { useState } from "react"
import './editpost.css'


export default function EditPost({ post }) {
    console.log(post)
    return (
        <div className="edit-post-modal-container">
            <p>{post.content}</p>
            <p>{post.authorId} </p>
            <p>{post.createdAt}</p>
            <div>
                {post.images.length > 0 &&
                    post.images.map(el => (
                        <img src={el.url} alt="" key={el.id}></img>
                    ))}
            </div>
        </div>
    )
}
