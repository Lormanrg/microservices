import axios from "axios"
import React, { useState } from "react"

import { Post } from "../../posts";


interface ICommentCreate extends Post {
    postId: Post['id']
}

const CommentCreate = ({ postId }: ICommentCreate) => {

    const [content, setContent] = useState<string>('')

    const onSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        await axios.post(`http://localhost:4000/posts/${postId}/comments`, { content })

        setContent('')
    }


    return <div>

        <form onSubmit={onSubmit} >

            <div className="form-group mt-3 mb-3 ml-3">
                <label >New Comment</label>
                <input value={content} onChange={e => setContent(e.target.value)} className="form-control w-80" />
            </div>
            <button className="btn btn-primary mt-3 mb-3 d-flex justify-content-center">Submit</button>
        </form>
    </div>
}

export default CommentCreate  