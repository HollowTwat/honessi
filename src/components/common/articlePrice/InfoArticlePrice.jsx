import React from 'react';
import {Box} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '80%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    boxShadow: 24,
    padding: 5,
    borderRadius: 5,
    textAlign: 'justify',
};

const InfoArticlePrice = () => {
    return (
        <Box sx={style}>
            <h2 style={{color: '#0d5ffe'}}>Цена артикула</h2>
            <br/>
            <div>
                Указание ценовых характеристик обязательно для всех позиций для ПОДСЧЕТА суммы накладной,
                либо не указывайте цену артикула ни в одной позиции.
            </div>
        </Box>
    );
};

export default InfoArticlePrice;