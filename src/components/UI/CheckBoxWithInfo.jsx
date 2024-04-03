import React from 'react';
import {Checkbox, IconButton} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const CheckBoxWithInfo = ({label, stateCheckBox, onClickCheckBox, onClickInfo}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <div>
                <Checkbox
                    defaultChecked
                    sx={{width: "unset"}}
                    checked={stateCheckBox}
                    onClick={onClickCheckBox}
                />
                {label}
            </div>
            <IconButton
                aria-label="info"
                sx={{width: 50, height: 50}}
                onClick={onClickInfo}
            >
                <InfoIcon/>
            </IconButton>
        </div>
    );
};

export default CheckBoxWithInfo;