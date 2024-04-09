import React from "react";
import {tg_bttn,textcolor} from "../../styles/colors";
import {button} from "../../styles/button";

const Button = ({background = tg_bttn, textColor = textcolor, ...props}) => {

    return (
        <button {...props} className={'button'} style={{backgroundColor: background, color: textColor, ...button}}/>
    );
};

export default Button;
