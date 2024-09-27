import React, { Fragment } from 'react'
import {CgMouse} from 'react-icons/cg'
import Product from "./Product.js"
import "./Home.css"

const product = {
    name:"Baby wipes",
    images:[{url:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQVqYTj4yfEW5c8PCSRKT3jDSTIq0MQFR0V5Vl5-WRYhk5A4lDW-noBetbGheB1upAcyPx_5Lzm76Wv9oigD9sKMMA8CxBXv7Y60_B8sGcgd52BJLTuNg9xxCvHAvfK0_x2Xf12dIA&usqp=CAc"}],
    price:"$3000",
    _id:"Vikash"
}

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

    <h2 className="homeHeading"> Featured Products </h2>

    <div className='container' id='container'>
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
    </div>

  </Fragment>
}

export default Home
