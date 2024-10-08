import React from 'react'
import { ReactNavbar } from "overlay-navbar"
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
          link2Text="Product"
          link3Text="Contact"
          link4Text="About"
          link1Url="/"
          link2Url="/Product"
          link3Url="/Contact"
          link4Url="/About"
          link1Size="1.3vmax"
          link1Color="rgba(35, 35, 35, 0.8)"
          nav1FlexDirection="flex-end"
          nav2FlexDirection="flex-end"
          nav3FlexDirection="flex-start"
          nav4FlexDirection="flex-start"
          link1ColorHover="#eb4034"
          link1Margin="1vmax"
          profileIconColor = "rgba(35, 35, 35, 0.8)"
          searchIconColor = "rgba(35, 35, 35, 0.8)"
          cartIconColor = "rgba(35, 35, 35, 0.8)"
          profileIconColorHover = "#eb4034"
          searchIconColorHover = "#eb4034"
          cartIconColorHover	 = "#eb4034"
          cartIconMargin = "1vmax"
        />
    </div>
  )
}

export default Header
