import React from "react";
// import {mainYellow} from "../../styles/colors";
import {button} from "../../styles/button";

const Button = ({background = window.Telegram.WebApp.ThemeParams.bg_color, textColor = 'black', ...props}) => {

    return (
        <button {...props} className={'button'} style={{backgroundColor: background, color: textColor, ...button}}/>
    );
};

export default Button;
