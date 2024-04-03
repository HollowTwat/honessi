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

const InfoPermissiveDocumentation = () => {
    return (
        <Box sx={style}>
            <h2 style={{color: '#0d5ffe'}}>Разрешительная документация</h2>
            <br/>
            <div>
                Если у вас есть разрешительный документ для позиции заказа,
                укажите тип документа, его название и дату получения документа.
            </div>
        </Box>
    );
};

export default InfoPermissiveDocumentation;