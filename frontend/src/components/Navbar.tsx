import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/Auth";

type NavbarContainerProps = {
  children: JSX.Element;
};

const NavbarContainer = (props: NavbarContainerProps) => {
  const navigate = useNavigate();

  return (
    <nav>
      <span>LOGO</span>
      {props.children}
      <span onClick={() => navigate("/profile")}>profile</span>
    </nav>
  );
};

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const getNavbar = (): JSX.Element => {
    if (!authContext.authenticated) {
      return <div></div>;
    }

    if (authContext.isAdmin) {
      return (
        <NavbarContainer>
          <div>admin</div>
        </NavbarContainer>
      );
    }

    return (
      <NavbarContainer>
        <div>user</div>
      </NavbarContainer>
    );
  };

  return getNavbar();
};

export default Navbar;
