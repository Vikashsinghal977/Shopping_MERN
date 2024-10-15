import './App.css';
import Header from "./components/layout/Header/Header"
import { BrowserRouter as Router,Routes, Route} from "react-router-dom"
import WebFont from "webfontloader"
import React from "react"
import Footer from './components/layout/Footer/Footer'
import Home from './components/Home/Home'
import ProductDetails from './components/Product/ProductDetails'
import Products from './components/Product/Products.jsx'

function App() {

  React.useEffect(() => {
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"]
      },
    });
  },[])

  return (
    <Router>
      <Header />
      <Routes>

      <Route exact path='/' Component={Home} />
      <Route exact path='/product/:id' Component={ProductDetails} />
      <Route exact path='/products' Component={Products} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
