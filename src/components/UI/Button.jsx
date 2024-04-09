import React from "react";
import {secondaryBG, buttontext} from "../../styles/colors";
import {button} from "../../styles/button";

const Button = ({background = secondaryBG, textColor = buttontext, ...props}) => {

    return (
        <button {...props} className={'button'} style={{backgroundColor: background, color: textColor, ...button}}/>
    );
};

export default Button;
