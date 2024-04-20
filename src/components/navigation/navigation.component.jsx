// Utilities
import { Outlet, Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";

// Styles & Assets
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import './navigation.styles.scss';

// Hooks
import { useContext } from "react";

// Context
import { UserContext } from "../../contexts/user.context";

const Navigation = () => {
const { currentUser } = useContext(UserContext)

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/ ">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="shop">
            SHOP
          </Link>
          {
            currentUser ? ( <span className="nav-link" onClick={signOutUser}>SIGN OUT</span> ) : ( <Link className="sign-in nav-link" to="auth">SIGN IN</Link> )
          }
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation