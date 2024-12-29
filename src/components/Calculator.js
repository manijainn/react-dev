import React, { useState } from "react";
import './styles/Calculator.css';
import Buttons from './Buttons.js';
import Expression from './Expression.js';
import InputCal from './InputCal.js';
import { evaluate,round } from "mathjs";

export default function Calculator(){
    const [input, setInput] = useState("");
    const [answer, setAnswer] = useState("");
    const [expression, setExpression] = useState("");
    const [show_expression, setShowExpression] = useState("");
    
   //input
    const inputHandler = (event) => {
        if(answer === "Invalid Input!!" ) return ;
        let val = event.target.innerHTML;
        if (val === "x2") val = "^2";
        else if (val === "x3") val = "^3";
        else if (val === "3√") val = "^(1÷3)";
        else if (val === "log") val = "log(";
        let str = input + val;
        if (str.length > 14) return;
        if (answer !== "") {
        setInput(answer + val);
        setAnswer("");
        setExpression("");
        setShowExpression(false);
        } else setInput(str);
    }

    //Clear screen
    const clearInput = () => {
        setInput("");
        setAnswer("");
        setExpression("");
        setShowExpression(false);
    };
  
    // check brackets are balance or not
    const checkBracketBalanced = (expr) => {
        let stack = [];
        for(let i = 0; i < expr.length; i++){
            let x = expr[i];
            if(x == '('){
                stack.push(x);
                continue;
            }
            if(x == ')'){
                if(stack.length == 0) return;
                else stack.pop();
            }
        }
        return stack.length == 0;
    }

    // calculate final answer
    const calculateAns = () => {
        if (input == "") return;
        let result = 0;
        
        let finalexpression = input;
        finalexpression = finalexpression.replaceAll("x", "*");
        finalexpression = finalexpression.replaceAll("÷", "/");

        // evaluate square root
        let noSqrt = input.match(/√[0-9]+/gi);
        if (noSqrt !== null) {
            let evalSqrt = input;
            for (let i = 0; i < noSqrt.length; i++) {
                evalSqrt = evalSqrt.replace(
                noSqrt[i],
                `sqrt(${noSqrt[i].substring(1)})`
                );
            }
            finalexpression = evalSqrt;
        }
        try {
        // check brackets are balanced or not
            if (!checkBracketBalanced(finalexpression)) {
                const errorMessage = { message: "Brackets are not balanced!" };
                throw errorMessage;
            }
            result = evaluate(finalexpression); //mathjs
        } catch (error) {
            result =
                error.message === "Brackets are not balanced!"
                ? "Brackets are not balanced!"
                : "Invalid Input!!"; //error.message;
        }
        isNaN(result) ? setAnswer(result) : setAnswer(round(result, 3));
        isNaN(result) ? setInput(result) : setInput(round(result, 3));
        isNaN(result) ? setExpression("") : setExpression(finalexpression+"=");
        isNaN(result) ? setShowExpression(false) : setShowExpression(true);
    };

    // remove last character
    const backspace = () => {
        if (answer !== "") {
            setInput(answer.toString().slice(0, -1));
            setAnswer("");
            setExpression("");
            setShowExpression(false);
        } else setInput((prev) => prev.slice(0, -1));
    };

    // change prefix of expression
    const changePlusMinus = () => {
        //change plus minus
        if (answer === "Invalid Input!!") return;
        else if(answer !==""){
            let ans = answer.toString();
            if (ans.charAt(0) === "-") {
            let plus = "+";
            setInput(plus.concat(ans.slice(1, ans.length)));
            } else if (ans.charAt(0) === "+") {
            let minus = "-";
            setInput(minus.concat(ans.slice(1, ans.length)));
            } else {
            let minus = "-";
            setInput(minus.concat(ans));
            }
            setAnswer("");
        }
        else {
            if (input.charAt(0) === "-") {
            let plus = "+";
            setInput((prev) => plus.concat(prev.slice(1, prev.length)));
            } else if (input.charAt(0) === "+") {
            let minus = "-";
            setInput((prev) => minus.concat(prev.slice(1, prev.length)));
            } else {
            let minus = "-";
            setInput((prev) => minus.concat(prev));
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className="main">
                    <div className="calculation-inp">
                        <Expression expression={expression} show_expression={show_expression} />
                        <InputCal input={input}  answer={answer} />
                    </div>
                    <Buttons 
                    inputHandler={inputHandler}
                    clearInput={clearInput}
                    backspace={backspace}
                    calculateAns={calculateAns}
                    changePlusMinus={changePlusMinus}
                    />
                </div>
            </div>
        </>
    );
}