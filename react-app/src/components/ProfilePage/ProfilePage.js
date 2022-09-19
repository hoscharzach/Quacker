

export default function ProfilePage() {
    return (
        <div className="center-column">
            <div className="profile-top-bar" onClick={() => {
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
                borderBottom: '1px solid rgb(66, 83, 100)'
            }}>
                <div>
                    User's username and <br></br>
                    Number of tweets
                </div>
                <div>

                </div>
            </div>
            <div id=""></div>
        </div>
    )
}
