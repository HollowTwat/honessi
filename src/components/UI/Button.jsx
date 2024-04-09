import React from "react";
import {button} from "../../styles/button";

const Button = ({background = --tg-theme-bg-color, textColor = --tg-theme-text-color, ...props}) => {

    return (
        <button {...props} className={'button'} style={{backgroundColor: background, color: textColor, ...button}}/>
    );
};

export default Button;
