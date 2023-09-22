
import React from 'react'
import '../Styles/CurrencyOptions.css'

// function CurrencyOptions({ prop, fromCurrency, toCurrency, currencyOptions, updateCurrency }) {
//     const options = currencyOptions.map((data, index) => {
//         return <option key={index} value={data}>
//             {data}
//         </option>
//     })


    function CurrencyOptions({ prop, fromCurrency, toCurrency, updateCurrency,currencyOptions }) {
        const options = currencyOptions.map((currencyCode, index) => {
            return (
              <option key={index} value={currencyCode}>
                {currencyCode}
              </option>
            );
          });

          
    return (
        <>
            {
                prop === "From currency" ?
                    <select name="currency" className={prop} value={fromCurrency} onChange={updateCurrency}>
                        {options}
                    </select> : prop === "To currency" ?
                        <select name="currency" className={prop} value={toCurrency} onChange={updateCurrency}>
                            {options}
                        </select> : null
            }
        </>
    )
}

export default CurrencyOptions