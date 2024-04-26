import React from 'react';
import DivisionLine from "../DivisionLine";
import {tg, useTelegram} from "../../../hooks/useTelegram";

const BlockHeader = ({text}) => {
    const { tg } = useTelegram();
    tg.setHeaderColor('var(--tg-theme-bg-color)');
    return (
        <div>
            <h2 style={{
                paddingTop: 10
            }}>{text}</h2>
            <DivisionLine height={2}/>
        </div>
    );
};

export default BlockHeader;
