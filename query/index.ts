import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';

export interface Post {
    id: string
    title: string
    comments: { id: string, content: string, status: Status }[]
}
export interface Comments {
    id: string,
    content: string
    status: Status
}



export enum Status {
    APPROVED = 'approved',
    REJECTED = 'rejected',
    PENDING = 'pending'
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts: { [key: string]: Post } = {}

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts)
})

app.post('/events', (req: Request, res: Response) => {

    const { type, data } = req.body;

    if (type === 'PostCreated') {

        const { id, title, comments } = data;

        posts[id] = { id, title, comments }
    }

    if (type === 'CommentCreated') {

        const { id, content, postId } = data;

        const post = posts[postId];


        const newComment: Comments = { id, content, status: Status.PENDING }

        post.comments.push(newComment)


    }
    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data

        const post = posts[postId]

        const comment = post.comments.find(comment => {
            return comment.id === id

        })
        if (comment) {
            comment.status = status
            comment.content = content
        }

    }
    console.log(posts)

    res.send({})
})

app.listen(4004, (data) => {
    console.log('Listening on 4004')
})