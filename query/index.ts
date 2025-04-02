import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { Post } from '../posts/index';
import { Comments, Status } from '../comments/index';


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
    console.log(posts)

    res.send({})
})




app.listen(4004, () => {
    console.log("Listening on 4004")
})