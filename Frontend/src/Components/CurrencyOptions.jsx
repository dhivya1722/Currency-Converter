import React, { useState } from 'react';
import Select from 'react-select';
import '../Styles/CurrencyOptions.css';

function CurrencyOptions({ prop, fromCurrency, toCurrency, updateCurrency, currencyOptions }) {
    const [selectedOption, setSelectedOption] = useState(null);

//changing of dropdown values
    const handleChange = (selectedOption) => {
        if (selectedOption && selectedOption.value) {
            setSelectedOption(selectedOption);
            updateCurrency(selectedOption.value);
        }
    };

//get the options (currencycode) in dropdown
    const options = currencyOptions.map((currencyCode) => ({
        value: currencyCode,
        label: currencyCode,
    }));

    return (
        <div className="currency-options">
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder={prop === 'From currency' ? 'Select from currency' : 'Select to currency'}
            />
        </div>
    );
}

export default CurrencyOptions;
