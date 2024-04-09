import React from "react";
import{tg_bttn, buttontext} from "../../styles/colors";
import {button} from "../../styles/button";

const Button = ({background = tg_bttn, textColor = buttontext, ...props}) => {

    return (
        <button {...props} className={'button'} style={{backgroundColor: background, color: textColor, ...button}}/>
    );
};

export default Button;
