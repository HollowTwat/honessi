import React, {useEffect, useState} from 'react';
import CheckBoxWithInfo from "../../../UI/CheckBoxWithInfo";
import { Modal } from "@mui/material";
import InfoWithBox from "./InfoWithBox";
import Input from "../../../UI/Input";
import BlockHeader from "../../../UI/Headers/BlockHeader";
import {initWithBoxData} from "../../../../initData/shoes/InitWithBoxData";
import {validWithBox} from "../../../../validation/validation";

const WithBox = ({initState, initValue, onChangeState = () => {}, onChangeValue = () => {}, onChangeValid}) => {

    const [openInfo, setOpenInfo] = useState(false);
    const [state, setState] = useState(initState);
    const [data, setData] = useState(initValue)

    useEffect(() => {

        onChangeValue(data);

        if (!state) {
            onChangeValid(true)
        } else {
            onChangeValid(validWithBox(data))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {

        onChangeState(state);

        if (!state) {
            setData(initWithBoxData);
            onChangeValid(true);
        } else {
            onChangeValid(validWithBox(data))
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
                label="C коробом"
                stateCheckBox={state}
                onClickCheckBox={() => setState(!state)}
                onClickInfo={() => setOpenInfo(!openInfo)}
            />
            {state === true &&
                <div>
                    <Input label={"Кол-во коробов"} value={data.countBox} validationType={'numeric'} onChange={(e) => {handleDataUpdate(e, 'countBox')}}/>
                    <BlockHeader text={"Состав короба"}/>
                </div>
            }
            <Modal open={openInfo} onClose={() => setOpenInfo(!openInfo)}>
                <InfoWithBox/>
            </Modal>
        </div>
    );
};

export default WithBox;