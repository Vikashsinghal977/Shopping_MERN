import React, { Fragment, useEffect } from 'react'
import {CgMouse} from 'react-icons/cg'
import Product from "./ProductCard.jsx"
import "./Home.css"
import MetaData from "../layout/MetaData.js"
import { clearErrors, getProduct } from '../../actions/productAction.js'
import { useSelector, useDispatch } from "react-redux"
import Loader from '../layout/Loader/Loader.jsx'
import {useAlert}    from "react-alert"  

const Home = () => {
    const alert =useAlert();
    const dispatch = useDispatch();
    const {loading, error, products} = useSelector((state) => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error)
      dispatch(clearErrors())
        }
        dispatch(getProduct());
    }, [dispatch, error,alert]);
    
  return (
    <Fragment>
        {loading ? (
            <Loader />
            ) : (
                <Fragment>
                    <MetaData title="BigGrow App"/>
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
                        {products && products.map((product) =>(
                            <Product product={product} />
                        ))}
                    </div>
                </Fragment>
            )
        }
    </Fragment>
  )
}

export default Home
