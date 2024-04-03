import React from 'react';
import DivisionLine from "../DivisionLine";

const BlockHeader = ({text}) => {
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