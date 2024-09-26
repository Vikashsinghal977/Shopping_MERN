import React, { Fragment } from 'react'
import {CgMouse} from 'react-icons/cg'
import "./Home.css"

function Home() {
  return <Fragment>
    <div className="banner">

        <p>Welcome to Grow app</p>
        <h1>Find amazing product below</h1>

        <a href="#container">
            <button>
                Scroll<CgMouse />
            </button>
        </a>
    </div>
  </Fragment>
}

export default Home
