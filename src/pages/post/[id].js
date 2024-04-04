import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../redux/actions/postAction';
import PostCard from '../../components/PostCard';

const Post = () => {
    const {id} = useParams()
    const [post, setPost] = useState([])

    const auth = useSelector((state) => state.auth)
    const detailPost = useSelector((state) => state.detailPost)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost({detailPost, id, auth}))
        if(detailPost.length > 0){
            const newArr = detailPost.filter(post => post._id === id)
            setPost(newArr)
        }
    }, [auth, detailPost, dispatch, id])
    return (
        <div className="posts">
        {
            post.map(item => (
                <PostCard key={item._id} post={item} />
            ))
        }
    </div>
    );
}

export default Post;
