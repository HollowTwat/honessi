import {tg} from '../hooks/useTelegram'



// Define the light theme properties
const lightTheme = {
    // body: '#FFFFFF', // White background
    body: 'violet',
    text: '#363537', // Dark gray text color
    toggleBorder: '#FFF',
    background: '#363537',
};

// Define the dark theme properties
const darkTheme = {
    // body: '#363537', // Dark gray background
    body: 'red',
    text: '#FAFAFA', // Very light gray text color
    toggleBorder: '#6B8096',
    background: '#999',
};

// Export the themes
export const theme = {
    light: lightTheme,
    dark: darkTheme,
};

// const themestate = () =>{
//     if (typeof (tg.colorScheme) !== "undefined")
//     {return tg.colorScheme}
//     else {return 'dark'}
// }

// export default themestate
const colorScheme = tg.colorScheme ? tg.colorScheme : 'dark';

export const themestate = colorScheme



