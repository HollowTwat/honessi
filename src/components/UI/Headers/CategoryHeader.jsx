import React from 'react';
import {useTelegram} from "../../../hooks/useTelegram";
import {mainBlue} from "../../../styles/colors";

const CategoryHeader = ({ text = '', backgroundColor = mainBlue, textColor = 'white'}) => {

    const { tg } = useTelegram();

    tg.setHeaderColor(backgroundColor);

    return (
        <div>
            <h1 style={{
                paddingTop: 20,
                // paddingLeft: 20,
                paddingBottom: 20,
                textAlign: "center",
                background: `linear-gradient(to bottom, ${backgroundColor}, transparent)`,
                color: textColor,
            }}>{text.toUpperCase()}&nbsp;</h1>
        </div>
    );
};

export default CategoryHeader;