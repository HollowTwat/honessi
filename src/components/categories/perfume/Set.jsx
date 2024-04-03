import React, {useEffect, useState} from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";
import Input from "../../UI/Input";
import {validNumberSet} from "../../../validation/validation";

const Set = ({initState, initValue, onChangeState = () => {}, onChangeValue = () => {}, onChangeValid}) => {

    const [state, setState] = useState(initState);
    const [data, setData] = useState(initValue)

    useEffect(() => {

        onChangeValue(data)

        if (!state) {
            console.log("состояние", state)
            onChangeValid(true)
        } else {
            console.log(validNumberSet(data))
            console.log(data)
            onChangeValid(validNumberSet(data))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, state])

    useEffect(() => {

        onChangeState(state);
        if (!state) {
            setData({count: ''});
            onChangeValid(true);
        } else {
            onChangeValid(validNumberSet(data))
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
            <FormControlLabel
                control={
                    <Checkbox
                        defaultChecked
                        sx={{width: "unset"}}
                        checked={state}
                        onClick={() => setState(!state)}
                    />}
                label={'Нужны комплекты'}
            />
            {state === true &&
                <div>
                    <Input label={"Кол-во комплектов"} value={data.countBox} validationType={'numeric'} onChange={(e) => {handleDataUpdate(e, 'count')}}/>
                </div>
            }
        </div>
    );
};

export default Set;