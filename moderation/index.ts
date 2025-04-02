import Axios from "axios";
import express, { Request, Response } from "express";

import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req: Request, res: Response) => {

    const { type, data } = req.body

    if (type === 'CommentCreated') {

        const status = data.content.includes('orange') ? 'rejected' : 'approved'

        await axios.post('localhost://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status
            }

        })
    }

    res.send({})
})

app.listen(4006, () => {
    console.log("Listening on Port: 4006")
})
