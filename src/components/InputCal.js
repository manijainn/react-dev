import React from "react";
import './styles/InputCal.css';

export default function InputCal({input ,setInput,answer}){
    const onChangeTagInput = (e) => {
        const re = /^[!%(-+\x2D-9^glox\xF7\u221A]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setInput(e.target.value);
          }
    };

    return (
        <>        
            <>
                <input
                type="text"
                name="input"
                className="input"
                style={{ padding: "0px" }}
                placeholder="0"
                value={input}
                maxLength={12}
                // disabled
                onChange={onChangeTagInput}
                autoComplete="off"
                />
            </>
        </>
    );
}