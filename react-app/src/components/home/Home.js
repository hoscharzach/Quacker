import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";
import './home.css'
import ReplyCard from "../ReplyCard/ReplyCard";

export default function Home({ mainLoaded }) {

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)
    const feed = useSelector(state => state.posts.feed)
    const latestPost = useSelector(state => state.posts.feed[0])


    async function getPosts() {

        if (feed.length === 0) {
            dispatch(getAllPosts())
                .then(a => setLoaded(true))
                .catch(a => alert('something went wrong'))
        } else {
            // const scrollPostId = latestPost.id
            // dispatch(getNewestPosts(latestPost.createdAt))
            // const postToScroll = document.getElementsByClassName(`reply${scrollPostId}`)
            // window.scrollTo({top: postToScroll.clientHeight})
            setLoaded(true)
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {

        dispatch(getAllPosts())
            .then(a => setLoaded(true))
            .catch(a => alert('something went wrong'))
    }, [mainLoaded, dispatch]);

    // useEffect(() => {
    //     const topReply = document.getElementsByClassName("reply8")[0]
    //     if (topReply) {
    //         topReply.scrollIntoView({ behavior: 'smooth' })
    //         // window.scrollTo({ top: (topReply.scrollHeight + 200), behavior: 'smooth' })
    //     }
    // }, [loaded])

    return (
        <>
            <div className="center-column">
                <div className="home-top-bar" onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    // dispatch(getNewPosts())
                }} style={{
                    zIndex: '998',
                    opacity: '.9',
                    position: 'sticky',
                    top: '0',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '15px',
                    boxSizing: 'border-box',
                    width: '650px',
                    height: '50px',
                    borderTop: '1px solid rgb(66, 83, 100)',
                    // borderBottom: '1px solid rgb(66, 83, 100)'
                }}>
                    <div>
                        Home
                    </div>

                </div>
                <CreatePost />

                {!loaded &&
                    <div style={{ width: '650px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <div id="loading"></div>
                    </div>}
                {loaded && feed &&
                    <div className="">
                        {feed.map((el) => (
                            <ReplyCard name={`reply${el.id}`} key={el.id} reply={el} />
                        ))}
                    </div>
                }
                <div style={{ height: '600px' }}>
                </div>
            </div>
        </>
    )
}
