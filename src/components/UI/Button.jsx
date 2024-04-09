import React from "react";
import {tg_bg, textcolor} from "../../styles/colors";
import {button} from "../../styles/button";

const Button = ({background = textcolor, textColor = tg_bg, ...props}) => {

    return (
        <button {...props} className={'button'} style={{backgroundColor: background, color: textColor, ...button}}/>
    );
};

export default Button;
