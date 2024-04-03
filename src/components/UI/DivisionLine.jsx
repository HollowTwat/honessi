import React from 'react';

const DivisionLine = (props) => {

    const {height = 1} = props;
    const {color = 'gray'} = props;
    const {marginTop = 10} = props;
    const {marginBottom = 10} = props;

    return (
        <div style={{
            marginTop: marginTop,
            marginBottom: marginBottom,
            height: height,
            backgroundColor: color,
            border: 'none'
        }}>
        </div>
    );
};

export default DivisionLine;