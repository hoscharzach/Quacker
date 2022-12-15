import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import backbutton from '../../images/backbutton.svg'
import { useHistory } from "react-router-dom"
import defaultUserIcon from '../../images/defaultprofilepic.svg'
import './profilepage.css'
import { getUserPosts } from "../../store/posts"
import ReplyCard from "../ReplyCard/ReplyCard"
import ParentCard from "../ParentCard/ParentCard"
import Loading from "../Loading"
import { Box, Modal } from "@mui/material"
import EditProfile from "./EditProfile"
import { nanoid } from "nanoid"
import { Fragment } from "react"
import { profileModalStyle, topBarStyle, postsContainerStyle } from "./profilepagestyles"

export default function ProfilePage() {
    const { username } = useParams()

    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => state.posts.users[username])
    const sessionUser = useSelector(state => state.session.user)
    const selectPosts = Object.values(useSelector(state => state.posts.normPosts))

    const checkLoaded = useSelector(state => state.posts.postsLoaded[username])

    const [viewType, setViewType] = useState('quacks')
    const [userLoaded, setUserLoaded] = useState(false)
    const [postsFetched, setPostsFetched] = useState(false)
    const [profileModalOpen, setProfileModalOpen] = useState(false)


    // if showing type of post for the first time, fetch latest data

    useEffect(() => {
        (async () => {
            setPostsFetched(false)
            if (!user) {
                await dispatch(getUserPosts(username, viewType))
            }
            else if (!checkLoaded || !checkLoaded[viewType]) {
                setPostsFetched(false)
                await dispatch(getUserPosts(username, viewType))
            }
            setPostsFetched(true)
            setUserLoaded(true)

        })()
    }, [viewType, username])

    // on first render, scroll window to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    // only re-calculate these lists if selectPosts changes
    let quacks = useMemo(() => selectPosts?.filter(post => post?.user.id === user?.id && !post?.inReplyTo)
        .map(el => <ReplyCard key={el.id} reply={el} name={`reply${el.id}`} />, [selectPosts]))

    let replies = useMemo(() => selectPosts?.filter(post => post?.user.id === user?.id && post?.inReplyTo)
        .map(post =>
            <Fragment key={nanoid()}>
                <ParentCard key={post.parent.id} post={post.parent} />
                <ReplyCard key={post.id} reply={post} name={`reply${post.id}`} borderTop={'none'} parent={true} />
            </Fragment>, [selectPosts]))

    let media = useMemo(() => selectPosts?.filter(post => post?.user.id === user?.id && post?.hasImages)
        .map(post => <ReplyCard key={post.id} reply={post} name={`reply${post.id}`} borderTop={'none'} />, [selectPosts]))

    let likes = useMemo(() => selectPosts?.filter(post => post?.userLikes.includes(user?.id))
        .map(post => <ReplyCard key={post.id} reply={post} name={`reply${post.id}`} borderTop={'none'} />), [selectPosts])

    let posts = {
        quacks,
        replies,
        media,
        likes
    }

    const tabStyle = { flexGrow: '1', display: 'flex', justifyContent: 'center', height: '100%', margin: '0 5px' }
    const tabs = [['quacks', 'Quacks'], ['replies', 'Replies'], ['media', 'Media'], ['likes', 'Likes']]

    return (
        <>
            <div className="center-column">
                <div
                    className="profile-top-bar"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={topBarStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%', marginRight: '20px' }}>
                        <button style={{ background: 'none' }} className="back-button" onClick={() => history.push('/home')}><img src={backbutton} alt="" ></img></button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

                        <div style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', spacing: 'normal' }}>{user && user.displayName || username}</div>
                        <div><span style={{ fontSize: '13px', color: '#8B98AF' }}>{user && user.numPosts} Quacks</span></div>
                    </div>
                </div>
                {userLoaded && user ?
                    <>
                        <div style={{ position: 'relative', height: '200px', width: '650px' }}>
                            <div style={{ height: '200px', width: '650px', backgroundPosition: 'center center', backgroundImage: `url(${user.profileBackground || null})` }} className="profile-background">
                            </div>
                        </div>
                        <div style={{ padding: '15px', paddingBottom: '0', display: 'flex', flexDirection: 'column', height: '200px' }} className="below-background-profile-container">
                            <div className="profile-top-relative" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', height: '70px', width: '630px' }}>
                                <div style={{ width: '141px' }}>
                                    <div style={{ position: 'absolute', height: '133px', width: '133px', borderRadius: '50%', left: '15px', top: '-80px' }}>
                                        <img style={{ backgroundColor: 'white', width: '100%', height: '100%', borderRadius: '50%', border: "4px solid #15202b" }} src={user.profilePic || defaultUserIcon}></img>
                                    </div>
                                </div>
                                {
                                    sessionUser.id === user.id &&
                                    <div style={{ width: '110px' }}>
                                        <button
                                            id="edit-profile-button"
                                            onClick={() => setProfileModalOpen(true)} >
                                            Edit Profile
                                        </button>
                                    </div>
                                }
                            </div>
                            <div style={{ marginTop: '10px', fontWeight: '700' }} className="profile-name-username">{user.displayName}</div>
                            <div className="reply-card-dim" style={{ marginBottom: '5px' }}>@{user.username}</div>
                            <div style={{ fontSize: '15px', marginTop: '5px' }} className="profile-bio">{user.bio}</div>

                        </div>
                    </> :

                    <Loading />
                }

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '53px', padding: '4px 40px' }}>
                    {tabs.map(tab => (
                        <div key={tab[0]} data-active={viewType === `${tab[0]}` ? `${tab[0]}` : null} className={`${tab[0]}-profile-button`} style={tabStyle}>
                            <button key={tab[0]} style={{ background: 'none', width: '100%' }} onClick={(e) => setViewType(`${tab[0]}`)} >{`${tab[1]}`}</button>
                        </div>
                    ))}

                </div>
                {selectPosts && user &&
                    <>
                        <div style={postsContainerStyle}>
                            {!postsFetched ? <Loading /> : posts[viewType]}
                        </div>
                    </>
                }

            </div >
            <Modal
                open={profileModalOpen}
                onClose={() => setProfileModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={profileModalStyle}>
                    <EditProfile setProfileModalOpen={setProfileModalOpen} user={user} />
                </Box>

            </Modal>
        </>
    )
}
