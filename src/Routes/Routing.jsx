import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from '../Pages/WelcomePage';
import CurrencyConverter from '../Pages/CurrencyConverterPage';
import Signin from '../Pages/Signin'
import Signup from '../Pages/Signup'




export const Routing = ()=>{
    return(
        <Router>
            <Routes>
              
          
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='/signin' element={<Signin/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/converter' element={<CurrencyConverter/>}/>
                
            </Routes>
        </Router>
    )
}
export default Routing;