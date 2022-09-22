import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import backbutton from '../../images/backbutton.svg'
import { useHistory } from "react-router-dom"
import defaultUserIcon from '../../images/defaultprofilepic.svg'
import './profilepage.css'
import { getUserPosts } from "../../store/posts"
import ReplyCard from "../ReplyCard/ReplyCard"

export default function ProfilePage() {
    const { username } = useParams()

    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => state.posts.users[username])
    const sessionUser = useSelector(state => state.session.user)
    const selectPosts = useSelector(state => state.posts.normPosts)
    const postIds = useSelector(state => state.posts.users[username]?.postIds)

    const [viewType, setViewType] = useState('tweets')
    const [userLoaded, setUserLoaded] = useState(false)
    const [postsLoaded, setPostsLoaded] = useState(false)
    const [posts, setPosts] = useState([])

    async function fetchPosts() {

        const data = await dispatch(getUserPosts(username))
        if (!data) {
            setUserLoaded(true)
            setPostsLoaded(true)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [username])

    useEffect(() => {
        if (selectPosts)
            if (viewType === 'tweets') {
                setPosts(Object.values(selectPosts).filter(post => !post.inReplyTo))
                setPostsLoaded(true)
            } else if (viewType === 'replies') {
                setPosts(Object.values(selectPosts))
                setPostsLoaded(true)
            } else if (viewType === 'media') {
                setPosts(Object.values(selectPosts).filter(post => post.images.length > 0))
                setPostsLoaded(true)
            }
    }, [viewType, selectPosts])

    console.log(userLoaded, postsLoaded, selectPosts, "USER AND POST LOADED AND POSTS")

    return (
        <div className="center-column">


            <div className="profile-top-bar" onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
                style={{
                    zIndex: '998',
                    opacity: '.9',
                    position: 'sticky',
                    top: '0',
                    display: 'flex',

                    alignItems: 'flex-start',
                    paddingLeft: '15px',
                    boxSizing: 'border-box',
                    width: '650px',
                    height: '53px',
                    marginBottom: '10px'
                }}>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', marginRight: '20px' }}>
                    <button style={{ background: 'none' }} className="back-button" onClick={() => history.push('/home')}><img src={backbutton} alt="" ></img></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

                    <div style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', spacing: 'normal' }}>User's username</div>
                    <div><span style={{ fontSize: '13px', color: '#8B98AF' }}>Number of tweets</span></div>
                </div>
            </div>
            {userLoaded &&
                <>
                    <div style={{ position: 'relative', height: '200px', width: '650px' }}>
                        <div style={{ height: '200px', width: '650px', backgroundPosition: 'center center', backgroundImage: 'url("https://quacker-app.s3.us-east-2.amazonaws.com/0854d09678394bafbcd15d9b4d3be30a.jpg")' }} className="profile-background">
                        </div>
                    </div>
                    <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', height: '200px' }} className="below-background-profile-container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', height: '70px', width: '630px' }}>
                            <div style={{ width: '141px' }}>
                                <div style={{ position: 'absolute', height: '133px', width: '133px', backgroundColor: 'white', borderRadius: '50%', left: '15px', top: '-80px' }}>
                                    <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} src={defaultUserIcon}></img>
                                </div>
                            </div>
                            <div style={{ width: '110px' }}></div>
                        </div>
                        <div style={{ marginTop: '10px' }} className="profile-name-username">NAME AND</div>
                        <div>Username</div>
                        <div style={{ fontSize: '15px' }} className="profile-bio">LOREM IPSUM LOREM IPSUMLOREM IPSUM LOREM IPSUMLOREM IPSUM LOREM IPSUMLOREM IPSUM LOREM IPSUMLOREM IPSUM LOREM IPSUMLOREM IPSUM LOREM IPSUM</div>

                    </div>
                </>
            }
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '53px', padding: '15px 40px' }}>
                <div data-active={viewType === 'tweets' ? 'tweets' : null} className="tweets-profile-button" style={{ flexGrow: '1', display: 'flex', justifyContent: 'center', height: '100%', margin: '0 5px' }}>
                    <button style={{ background: 'none', width: '100%' }} onClick={(e) => {
                        setPostsLoaded(false)
                        setViewType('tweets')
                    }}>Quacks</button>

                </div>
                <div data-active={viewType === 'replies' ? 'replies' : null} className="replies-profile-button" style={{ flexGrow: '1', display: 'flex', justifyContent: 'center', height: '100%', margin: '0 5px' }}>
                    <button style={{ background: 'none', width: '100%' }} onClick={(e) => {
                        setPostsLoaded(false)
                        setViewType('replies')
                    }}>{'Quacks & Replies'}</button>

                </div>
                <div data-active={viewType === 'media' ? 'media' : null} className="media-profile-button" style={{ flexGrow: '1', display: 'flex', justifyContent: 'center', height: '100%', margin: '0 5px' }}>

                    <button style={{ width: '100%' }} onClick={(e) => {
                        setPostsLoaded(false)
                        setViewType('media')
                    }}>Media</button>
                </div>

            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '650px' }}>
                {!postsLoaded &&
                    <div style={{ width: '650px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <div id="loading"></div>
                    </div>
                }
                {postsLoaded && postIds && selectPosts &&
                    postIds.map(el => (
                        <ReplyCard name={`profilereply${el}`} key={el} reply={selectPosts[el]} />
                    ))}
            </div>
        </div>
    )
}
