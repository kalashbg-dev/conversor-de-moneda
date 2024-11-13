import { useState } from 'react';
import './InputSelectorStyles.css';

interface InputSelectorProps {
    label: string;

    // Input Props
    //type?: number;
    //placeholder?: string;
    value?: number;
    // onChange: (e) => setAmount(e.target.value);
    // onChange: (e) => setAmount(e.target.value);
    min?: number;
    onValueChange?: (e: any) => void;
    readOnly: boolean;

    // Select props
    availableCurrencies: Array<string>;
    onCurrencyChange?: (e: any) => void;
    
}

function InputSelector({label, value, min, onValueChange, readOnly, availableCurrencies, onCurrencyChange}: InputSelectorProps) {
    // const [amount, setAmount] = useState<string>(checkWhichInput());

    // This checks which input is the 'Amount' imput or the 'Converted to' input
    // and assigns the default values where corresponds. 
    // function checkWhichInput() {
    //     if (label === "Amount") {
    //         return "100"
    //     }
    //     else {
    //         return "6000"
    //     }
    // }

    return (
        <div className="currency-input">
            <div className='amount-input'>
                <label>{label}</label>
                <input type="number" value={value} onChange={onValueChange} min={min} readOnly={readOnly}/>
            </div>
            <div className='divider'></div>
            <div className="currency-selector">
                <select onChange={onCurrencyChange}>
                {availableCurrencies?.map((currency) => (
                    <option>{currency}</option>
                ))}
                </select>
                {/* <select name="" id="">
                    <option value="">USD</option>
                    <option value="">DOP</option>
                    <option value="">EUR</option>
                </select> */}
            </div>
        </div>
    )
}

export default InputSelector;