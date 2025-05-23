import Axios from "axios";
import express, { Request, Response } from "express";

import bodyParser from "body-parser";
import axios from "axios";

interface Event {
    type: string;
    data: CommentData
}

interface CommentData {
    id: string;
    content: string;
    postId: string;
    status: 'approved' | 'rejected'
}

interface CommentModerated extends Event {
    type: 'CommentModerated';
    data: CommentData
}


const app = express();

app.use(bodyParser.json());

app.post('/events', async (req: Request, res: Response) => {
    try {
        const { type, data } = req.body

        if (type === 'CommentCreated') {

            const commentData = data as CommentData
            const status = commentData.content.includes('orange') ? 'rejected' : 'approved'

            await axios.post('http://localhost:4001/events', {
                type: 'CommentModerated',
                data: {
                    id: commentData.id,
                    postId: commentData.postId,
                    content: commentData.content,
                    status
                }

            })
        }


    } catch (error) {
        console.error('Error processing event:', error)
    }
    res.send({})

})

app.listen(4002, () => {
    console.log("Listening on Port: 4002")
})
