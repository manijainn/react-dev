import React from "react";
import './styles/InputCal.css';

export default function Expression({expression,show_expression=false}){
    console.log('expression',expression,show_expression);
    return (
        <>
            <div className="expression input"
            style={{ display : (show_expression) ? 'block' : 'none', padding: "0px" }}
            >
                {expression}
            </div>
        </>
    )
}