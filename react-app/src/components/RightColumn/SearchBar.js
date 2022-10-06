import { ClickAwayListener, ownerDocument } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SearchIcon from "./SearchIcon";
import defaultProfilePic from '../../images/defaultprofilepic.svg'
import { Link, useHistory } from "react-router-dom";

export default function SearchBar() {

    const users = Object.values(useSelector(state => state.posts.users))
    const history = useHistory()

    const [search, setSearch] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [results, setResults] = useState([...users])

    async function handleSearch(e) {
        if (e.key === 'Enter') {
            // history.push(`/search/${search}`)
            setShowMenu(false)
        }
    }

    useEffect(() => {
        setResults(users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()) || user.displayName.toLowerCase().includes(search.toLowerCase())))
    }, [search])


    return (
        <>
            <div onClick={() => showMenu ? setShowMenu(false) : setShowMenu(true)} id="search-bar" data-focused={showMenu ? "1" : "0"}>
                <SearchIcon height={'18px'} width={'18px'} active={showMenu} />
                <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch} value={search} className="search-input" style={{ color: '#8b98a5' }} placeholder="Search Quacker" />
            </div >
            {showMenu &&
                <ClickAwayListener onClickAway={() => setShowMenu(false)}>

                    <div className="search-dropdown" style={{ position: 'fixed', top: 45, height: 'auto', width: '370px', backgroundColor: 'rgba(21,32,43,1.00)' }}>
                        <div style={{ height: '48px', boxSizing: 'border-box', padding: '12px 16px', display: 'flex', alignItems: 'center', fontSize: '20px', fontFamily: 'chirp', spacing: 'normal', lineHeight: '24px', weight: 700 }}>Recent</div>
                        {users && results && results.map(user => (

                            <div style={{
                                position: 'relative',
                                zIndex: 999
                            }} onClick={() => {
                                history.push(`/profile/${user.username}`)
                                setShowMenu(false)
                            }} className="search-item" key={user.id}>
                                <div>
                                    <img className="search-profile-pic" src={user.profilePic || defaultProfilePic}></img>
                                </div>
                                <div>
                                    <div className="search-profile-name">{user.displayName}</div>
                                    <div className="search-profile-username">@{user.username}</div>
                                </div>
                            </div>



                        ))}
                    </div>
                </ClickAwayListener>
            }
        </>
    )
}
