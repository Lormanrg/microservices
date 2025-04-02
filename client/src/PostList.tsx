import axios from "axios";
import { useEffect, useState } from "react"
import { Post } from '../../posts/index';
import CommentCreate from "./CommentCreate";
import { CommentList } from "./CommentList";



export const PostList = () => {

    const [posts, setPosts] = useState<Record<string, Post>>({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4004/posts')

        setPosts(res.data)
    }

    useEffect(
        () => {
            fetchPosts()
        }, []
    )

    const renderedPost = Object.values(posts).map(post => {
        return (
            <div className="card"
                style={{ width: '30%', marginBottom: '20px' }}
                key={post.id}>

                <div className="card-body">
                    <h3>{post.title}</h3>
                </div>
                <CommentList comments={post.comments} />
                <CommentCreate postId={post.id} id={post.id} title={post.title} comments={post.comments} />


            </div>
        )
    })



    return <>
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPost}
        </div>


    </>
} 