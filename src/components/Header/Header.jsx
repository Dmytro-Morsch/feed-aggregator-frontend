import {Link} from "react-router-dom";
import {MdArrowDropDown} from "react-icons/md";

import logo from '../../assets/logo.svg';
import useComponentVisible from "../../useCompontentVisible.js";

import "./Header.css";
import {useUser} from "../../context/User.context.jsx";

function Header() {
    const {user} = useUser();

    const {
        ref: refPopup,
        isComponentVisible: isPopup,
        setIsComponentVisible: setPopup
    } = useComponentVisible(false);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="/" className="logo">
                    <img src={logo} alt="logo"/>
                    Collection of news
                </a>
            </div>

            <div className="navbar-end">
                {!user && <div className="auth">
                    <Link to="/signup" className="signup">Sign up</Link>
                    <Link to="/login" className="signin">Sign in</Link>
                </div>}

                {user &&
                    <div className="dropdown">
                        <button ref={refPopup} className="btn btn-user"
                                onClick={() => setPopup(!isPopup)}>{user.username}
                            <MdArrowDropDown/></button>

                        {isPopup && <ul id="dropdown-user" className="menu-settings">
                            <li className="link">
                                <a href="#">Manage account</a>
                            </li>
                            <hr className="hr"/>
                            <li className="link">
                                <a href="#">Sign out</a>
                            </li>
                        </ul>}
                    </div>

                }
            </div>
        </nav>
    );
}

export default Header;
