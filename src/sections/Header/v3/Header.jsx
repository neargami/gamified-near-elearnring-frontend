import { useState } from "react";
import { handleNearLogin } from "../../../lib/nearhandler";
import NavWrapper from "./Header.style";
import Button from "components/button";
import MobileMenu from "../MobileMenu/MobileMenu";
import logo from "assets/images/brand/Logo/Without-BG/Logo-5.png";
import connectIcon from "assets/images/icons/connect.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

  return (
    <NavWrapper className="gamfi_header" id="navbar">
      <div className="container">
        {/* Main Menu Start */}
        <div className="gamfi_menu_sect">
          <div className="gamfi_menu_left_sect">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="gamfi nft logo" />
              </Link>
            </div>
          </div>
          <div className="gamfi_menu_right_sect gamfi_v1_menu_right_sect">
            <div className="gamfi_menu_list"></div>
            <div className="gamfi_menu_btns">
              <Button
                id="signMessageBtn"
                href="# "
                sm
                variant="white"
                className="connect_btn"
                onClick={handleNearLogin}
              >
                <img src={connectIcon} alt="icon" />
                Connect
              </Button>
            </div>
          </div>
        </div>
        {/* <!-- Main Menu END --> */}
        {/* <!-- mobile menu --> */}
        {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
      </div>
    </NavWrapper>
  );
};

export default Header;
