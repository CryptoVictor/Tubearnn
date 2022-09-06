import React from "react";
import { user_tokens } from "../backend/index.js";

const Balance = () => {

    let balance;

    if(user_tokens==undefined){

        balance = 0.00;

    }else{

        balance = user_tokens;
    }
    

  return (
        <div>
            $SOL {balance}
        </div>
    )
};

export default Balance;