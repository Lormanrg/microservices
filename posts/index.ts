import express, { Request, Response } from "express";

import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";
import { Status } from '../comments/index';




const app = express();
app.use(bodyParser.json());
app.use(cors());

export interface Post {

    id: string
    title: string
    comments: { id: string, content: string, status: Status }[]
}

const posts: { [key: string]: Post } = {};

app.get("/posts", (req: Request, res: Response) => {
    res.send(posts);
});

app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body

    const post: Post = {
        id, title, comments: []
    }

    posts[id] = post;

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title, comments: []
        }
    })
    res.status(201).send(post);
});

app.post('/events', (req: Request, res: Response) => {
    console.log('received event', req.body.type);

    res.send({})
})

app.listen(4003, () => {
    console.log("Listening on port 4003");
});