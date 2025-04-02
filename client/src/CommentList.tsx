
import { Comments } from '../../comments/index';


export const CommentList = ({ comments }: { comments: Comments[] }) => {

    // const [comments, setComments] = useState<Record<string, Comments>>({});

    // const fetchComments = async () => {


    //     const res = await axios.get(`http://localhost:4002/posts/${postId}/comments`)

    //     setComments(res.data)
    // }

    // useEffect(
    //     () => {
    //         fetchComments()
    //     }, []
    // )



    const renderedComments = Object.values(comments).map(comment => {
        return <li key={comment.id} style={{ marginLeft: '20px' }}> {comment.content}</li>
    })

    return <ul>
        {renderedComments}
    </ul>


}