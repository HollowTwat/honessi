import React from "react";
import {mainYellow} from "../../styles/colors";
import {button} from "../../styles/button";

const Button = ({background = var(--tg-theme-button-color), textColor = var(--tg-theme-button-text-color), ...props}) => {

    return (
        <button {...props} className={'button'} style={{backgroundColor: background, color: textColor, ...button}}/>
    );
};

export default Button;
