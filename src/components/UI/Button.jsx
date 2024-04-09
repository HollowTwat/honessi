import React from "react";
// import {mainYellow} from "../../styles/colors";
import {button} from "../../styles/button";
import tg from "../../hooks/useTelegram";

const Button = ({background = tg.ThemeParams.bg_color, textColor = 'black', ...props}) => {

    return (
        <button {...props} className={'button'} style={{backgroundColor: background, color: textColor, ...button}}/>
    );
};

export default Button;
