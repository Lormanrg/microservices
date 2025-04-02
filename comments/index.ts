import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from "cors";
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());


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

const commentsByPostId: { [key: string]: Comments[] } = {};

app.get('/posts/:id/comments', (req: Request, res: Response) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', (req, res) => {

    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: Status.PENDING });

    commentsByPostId[req.params.id] = comments;

    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: Status.PENDING
        }
    })

    res.status(201).send({});
})

app.post('/events', async (req: Request, res: Response) => {
    console.log('received event', req.body.type);

    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { id, postId, content, status } = data;

        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => comment.id === id);

        if (comment) {

            comment.status = status;
        }
        try {

            await axios.post('http://localhost:4005/events', {
                type: 'CommentUpdated',
                data: {
                    id,
                    content,
                    postId,
                    status
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    res.send({ status: 'OK' })
})

app.listen(4002, () => {
    console.log('Listening on 4002');
})