import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import backbutton from '../../images/backbutton.svg'
import { useHistory } from "react-router-dom"
import defaultUserIcon from '../../images/defaultprofilepic.svg'
import './profilepage.css'
import { getUserPosts } from "../../store/posts"
import ReplyCard from "../ReplyCard/ReplyCard"
import ParentCard from "../ParentCard/ParentCard"

export default function ProfilePage() {
    const { username } = useParams()

    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => state.posts.users[username])
    const sessionUser = useSelector(state => state.session.user)
    const selectPosts = Object.values(useSelector(state => state.posts.normPosts))

    const [viewType, setViewType] = useState('tweets')
    const [userLoaded, setUserLoaded] = useState(false)
    const [postsLoaded, setPostsLoaded] = useState(false)



    let posts

    async function fetchPosts() {

        if (!user) {
            await dispatch(getUserPosts(username))
            setUserLoaded(true)
            setPostsLoaded(true)
        } else {
            setUserLoaded(true)
            await dispatch(getUserPosts(username))
            setPostsLoaded(true)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [username])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (viewType === 'tweets') {
        posts = selectPosts.filter(post => post.user.username === username && !post.inReplyTo)
    } else if (viewType === 'replies') {
        posts = selectPosts.filter(post => post.user.username === username && post.inReplyTo)
    } else if (viewType === 'media') {
        posts = selectPosts.filter(post => post.user.username === username && post.images.length > 0)
    }

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

                    <div style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', spacing: 'normal' }}>{user && user.displayName || username}</div>
                    <div><span style={{ fontSize: '13px', color: '#8B98AF' }}>{user && user.numPosts} Quacks</span></div>
                </div>
            </div>
            {userLoaded &&
                <>
                    <div style={{ position: 'relative', height: '200px', width: '650px' }}>
                        <div style={{ height: '200px', width: '650px', backgroundPosition: 'center center', backgroundImage: `url(${user.profileBackground || null})` }} className="profile-background">
                        </div>
                    </div>
                    <div style={{ padding: '15px', paddingBottom: '0', display: 'flex', flexDirection: 'column', height: '200px' }} className="below-background-profile-container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', height: '70px', width: '630px' }}>
                            <div style={{ width: '141px' }}>
                                <div style={{ position: 'absolute', height: '133px', width: '133px', backgroundColor: 'white', borderRadius: '50%', left: '15px', top: '-80px' }}>
                                    <img style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(0, 0, 0, 0)' }} src={user.profilePic || defaultUserIcon}></img>
                                </div>
                            </div>
                            <div style={{ width: '110px' }}></div>
                        </div>
                        <div style={{ marginTop: '10px', fontWeight: '700' }} className="profile-name-username">{user.displayName}</div>
                        <div className="reply-card-dim" style={{ marginBottom: '5px' }}>@{user.username}</div>
                        <div style={{ fontSize: '15px', marginTop: '5px' }} className="profile-bio">{user.bio}</div>

                    </div>
                </>
            }
            {!userLoaded &&
                <div style={{ width: '650px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <div id="loading"></div>
                </div>
            }
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '53px', padding: '4px 40px' }}>
                <div data-active={viewType === 'tweets' ? 'tweets' : null} className="tweets-profile-button" style={{ flexGrow: '1', display: 'flex', justifyContent: 'center', height: '100%', margin: '0 5px' }}>
                    <button style={{ background: 'none', width: '100%' }} onClick={(e) => {
                        setViewType('tweets')
                    }}>Quacks</button>

                </div>
                <div data-active={viewType === 'replies' ? 'replies' : null} className="replies-profile-button" style={{ flexGrow: '1', display: 'flex', justifyContent: 'center', height: '100%', margin: '0 5px' }}>
                    <button style={{ background: 'none', width: '100%' }} onClick={(e) => {

                        setViewType('replies')
                    }}>{'Replies'}</button>

                </div>
                <div data-active={viewType === 'media' ? 'media' : null} className="media-profile-button" style={{ flexGrow: '1', display: 'flex', justifyContent: 'center', height: '100%', margin: '0 5px' }}>

                    <button style={{ width: '100%' }} onClick={(e) => {

                        setViewType('media')
                    }}>Media</button>
                </div>

            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '650px', borderTop: '1px solid rgb(66, 83, 100)' }}>
                {!postsLoaded &&
                    <div style={{ width: '650px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <div id="loading"></div>
                    </div>
                }
                {postsLoaded && posts &&
                    posts.map(post => (
                        post.inReplyTo ?
                            <>
                                <ParentCard postId={post.parent.id} />
                                <ReplyCard key={post.id} reply={post} name={`reply${post.id}`} borderTop={'none'} />
                            </> :
                            <ReplyCard key={post.id} reply={post} name={`reply${post.id}`} />


                    ))}
            </div>
        </div>
    )
}
