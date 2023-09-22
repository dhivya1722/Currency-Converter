import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from '../Pages/WelcomePage';
import CurrencyConverter from '../Pages/CurrencyConverterPage';



export const Routing = ()=>{
    return(
        <Router>
            <Routes>
              
          
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='/converter' element={<CurrencyConverter/>}/>
                
            </Routes>
        </Router>
    )
}