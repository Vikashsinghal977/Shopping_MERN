import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import { FaUserAlt, FaSearch, FaCartArrowDown } from "react-icons/fa"; 
import logo from "../../../images/logo.png"

const Header = () => {
  return (
    <div>
        <ReactNavbar
          burgerColorHover="#a62d24"
          logo={logo}
          logoWidth="20vmax"
          navColor1="white"
          logoHoverSize="10px"
          logoHoverColor="#eb4034"
          link1Text="Home"
          link2Text="Products"
          link3Text="Contact"
          link4Text="About"
          link1Url="/"
          link2Url="/products"
          link3Url="/contact"
          link4Url="/about"
          link1Size="1.3vmax"
          link1Color="rgba(35, 35, 35, 0.8)"
          nav1FlexDirection="flex-end"
          nav2FlexDirection="flex-end"
          nav3FlexDirection="flex-start"
          nav4FlexDirection="flex-start"
          link1ColorHover="#eb4034"
          link1Margin="1vmax"

          
          profileIcon={true}
          ProfileIconElement={FaUserAlt}
          profileIconColor = "rgba(35, 35, 35, 0.8)"
          profileIconColorHover = "#eb4034"

          searchIcon={true}
          SearchIconElement={FaSearch}
          searchIconColor = "rgba(35, 35, 35, 0.8)"
          searchIconColorHover = "#eb4034"
          
          cartIcon={true}
          CartIconElement={FaCartArrowDown}
          cartIconColor = "rgba(35, 35, 35, 0.8)"
          cartIconColorHover	 = "#eb4034"
          cartIconMargin = "1vmax"
        />
    </div>
  )
}

export default Header
