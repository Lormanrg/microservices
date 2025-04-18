import axios from "axios";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";



const app = express()

app.use(bodyParser.json())

app.post("/events", async (req: Request, res: Response) => {

    const event = req.body
    try {
        await Promise.all([

            axios.post('http://localhost:4000/events', event),
            axios.post('http://localhost:4002/events', event),
            axios.post('http://localhost:4003/events', event),
            axios.post('http://localhost:4004/events', event)
        ])
    } catch (error) {
        console.log(error)
    }


    res.send({ status: 'OK' })
})

app.listen(4001, () => {
    console.log("Listening on 4001")
})