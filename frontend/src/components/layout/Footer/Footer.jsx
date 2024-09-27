import React from 'react'
import playStore from "../../../images/playStore.png"
import appStore from "../../../images/appStore.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="">


        <div className="leftFooter">
            <h4>Download Our APP</h4>
            <p>Download App for Android and IOS mobile Phones</p>
            <img src={playStore} alt="PlayStore" />
            <img src={appStore} alt="AppStore" />
        </div>

        <div className="midFooter">
            <h1>Grow Shop.</h1>
            <p>High Quality is our first pripority</p>

            <p>Copyrights 2024 &copy; MeVikashSinghal</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="">Instagram</a>
            <a href="">YouTube</a>
            <a href="">FaceBook</a>
        </div>
    </footer>
  )
}

export default Footer
