import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";


export default function Main() {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const [viewPosts, setViewPosts] = useState([])

    useEffect(() => {
        (async () => {
            const data = await fetch('/api/posts/home');
            const res = await data.json();
            setViewPosts(res.userPosts);
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <>
            <div className="main-posts-wrapper">
                {viewPosts.length > 0 && viewPosts.map(el => (
                    <p key={Math.random() * 100} >{el.content}</p>
                ))}
            </div>
        </>
    )
}
