// Utilities
import { Outlet } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";

// Styles & Assets
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.styles.jsx';

// Hooks
import { useContext } from "react";

// Context
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

// Components
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Navigation = () => {
const { currentUser } = useContext(UserContext)
const { isCartOpen } = useContext(CartContext)

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/ ">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="shop">
            SHOP
          </NavLink>
          {
            currentUser ? ( <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink> ) : ( <NavLink to="auth">SIGN IN</NavLink> )
          }
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation