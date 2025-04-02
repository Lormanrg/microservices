import axios from "axios";
import React, { useState } from "react"

const PostCreate = () => {



    const [title, setTitle] = useState<string>('');

    const onSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4003/posts', { title })


            setTitle('')

        } catch (error) {
            console.log('Error creating post', error)
        }

    }




    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label >Title</label>
                        <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <button className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </>
    )
}

export default PostCreate