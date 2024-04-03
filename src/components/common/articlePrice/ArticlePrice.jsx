import React, {useEffect, useState} from 'react';
import {Modal} from "@mui/material";
import Input from "../../UI/Input";
import CheckBoxWithInfo from "../../UI/CheckBoxWithInfo";
import InfoArticlePrice from "./InfoArticlePrice";
import CustomSelect from "../../UI/CustomSelect";
import {nds} from "../../../constants/articlePrice/Nds";
import {validArticlePrice} from "../../../validation/validation";
import {initArticlePrice} from "../../../initData/articlePrice/InitArticlePrice";

const ArticlePrice = ({initState, initValue, onChangeState = () => {}, onChangeValue = () => {}, onChangeValid = () => {}}) => {

    const [openInfo, setOpenInfo] = useState(false);
    const [state, setState] = useState(initState);
    const [data, setData] = useState(initValue)

    useEffect(() => {

        onChangeValue(data)
        if (!state) {
            onChangeValid(true)
        } else {
            onChangeValid(validArticlePrice(data))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {

        onChangeState(state)

        if (!state) {
            setData(initArticlePrice);
            onChangeValid(true);
        } else {
            onChangeValid(validArticlePrice(data))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    const handleDataUpdate = (valueOrEvent, name) => {

        setData(prevState => ({
            ...prevState,
            [name]: valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent
        }));
    }

    return (
        <div>
            <CheckBoxWithInfo
                label="Цена артикула (необязательно)"
                stateCheckBox={state}
                onClickCheckBox={() => setState(!state)}
                onClickInfo={() => setOpenInfo(!openInfo)}
            />
            {state === true &&
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Input label={"Цена, руб"}
                           value={data.price}
                           validationType='floatNumeric'
                           onChange={(e) => {handleDataUpdate(e, 'price')}}
                    />
                    <div style={{width: '3%'}}/>
                    <CustomSelect label={"НДС"}
                                  options={nds}
                                  value={data.nds}
                                  onChange={(e) => {handleDataUpdate(e, 'nds')}}
                    />
                </div>
            }
            <Modal open={openInfo} onClose={() => setOpenInfo(!openInfo)}>
                <InfoArticlePrice/>
            </Modal>
        </div>
    );
};

export default ArticlePrice;