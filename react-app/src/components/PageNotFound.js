import NavBar from "./Nav/NavBar"
import RightColumn from "./RightColumn/RightColumn"
import { Link } from "react-router-dom"

export default function PageNotFound({ variant }) {
    let loggedIn
    switch (variant) {
        case "LOGGED_IN":
            return (
                <>
                    <NavBar />
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px 10px', width: '650px', boxSizing: 'border-box' }} >
                        <h3>Page couldn't be found or feature under development, check out the <Link to={'/home'}><span style={{ color: 'rgb(29, 155, 240)' }} >main feed</span></Link>, or refresh the page to try again.</h3>
                    </div>
                    <RightColumn />
                </>
            )
        case "LOGGED_OUT":
            return (
                <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px 10px', }} >
                    <h3>Page couldn't be found<br></br><Link to={'/'}><span style={{ color: 'rgb(29, 155, 240)' }} >Get outta here!</span></Link></h3>
                </div>
            )
    }

}
