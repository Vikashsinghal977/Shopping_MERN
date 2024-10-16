import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../App.css"

const Search = ({history}) => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    console.log("stap 1")

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        console.log("Stap 2",keyword)
        if (keyword.trim()) {
            console.log("stap",keyword)
            navigate(`/products/${keyword}`)    
        }
        else {
            navigate("/products")
        }
    }


  return (
   
    <Fragment>

        <form className='searchBox' onSubmit={searchSubmitHandler}>

            <input 
                type='text'
                placeholder='Search a Product ....'
                onChange={(e) => setKeyword(e.target.value)}
            />

            <input type="submit" value="Search" />

        </form>

    </Fragment>

  )
}

export default Search
