import React from "react";
// import {mainYellow} from "../../styles/colors";
import {button} from "../../styles/button";
import {theme, themestate} from '../../styles/theme'

// state = {
//     themeMode: themestate
// };

// toggleTheme = () =>{
//     this.setState({themeMode: this.state.themeMode === 'light' ? 'dark': 'dark'});
// };


// theme = theme[this.state.themeMode]

// const Button = ({background = mainYellow, textColor = 'black', ...props}) => {
const Button = ({background = theme[themestate].button, textColor = theme[themestate].text, ...props}) => {
//const Button = ({background = 'var(--tg-theme-button-color)', textColor = theme[themestate].text, ...props}) => {    

    return (
        <button {...props} className={'button'} style={{backgroundColor: background, color: textColor, ...button}}/>
    );
};

export default Button;
