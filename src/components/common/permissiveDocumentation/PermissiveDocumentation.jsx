import React, {useEffect, useState} from 'react';
import Input from "../../UI/Input";
import CustomSelect from "../../UI/CustomSelect";

import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

import 'dayjs/locale/ru';

import CheckBoxWithInfo from "../../UI/CheckBoxWithInfo";
import {Modal} from "@mui/material";
import InfoPermissiveDocumentation from "./InfoPermissiveDocumentation";
import {documentationsType} from "../../../constants/permissiveDocumentation/DocumentationsType";
import dayjs from "dayjs";
import {validPermissiveDocumentation} from "../../../validation/validation";
import {initPermissiveDocumentation} from "../../../initData/permissiveDocumentation/InitPermissiveDocumentation";

const PermissiveDocumentation = ({initState, initValue, onChangeState = () => {}, onChangeValue = () => {}, onChangeValid = () => {}}) => {

    const [openInfo, setOpenInfo] = useState(false);
    const [state, setState] = useState(initState);
    const [data, setData] = useState(initValue)

    useEffect(() => {

        onChangeValue(data);

        if (!state) {
            onChangeValid(true)
        } else {
            onChangeValid(validPermissiveDocumentation(data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {

        onChangeState(state);

        if (!state) {
            setData(initPermissiveDocumentation);
            onChangeValid(true);
        } else {
            onChangeValid(validPermissiveDocumentation(data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    const handleDataUpdate = (valueOrEvent, name) => {

        setData(prevState => ({
            ...prevState,
            [name]: valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent
        }));
    };

    return (
        <div>
            <CheckBoxWithInfo
                label="Разрешительная документация"
                stateCheckBox={state}
                onClickCheckBox={() => setState(!state)}
                onClickInfo={() => setOpenInfo(!openInfo)}
            />

            {state === true &&
                <div>
                    <CustomSelect label={"Тип документа"}
                                  options={documentationsType}
                                  value={data.documentationsType}
                                  onChange={(e) => {handleDataUpdate(e, 'documentationsType')}}
                    />
                    <Input label={"Код/Название документа"}
                           value={data.nameDoc}
                           onChange={(e) => {handleDataUpdate(e, 'nameDoc')}}
                    />
                    <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                sx={{width: '100%'}}
                                label="Дата выдачи документа"
                                value={dayjs(data.date)}
                                onChange={(e) => {handleDataUpdate(e,'date')}}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            }

            <Modal open={openInfo} onClose={() => setOpenInfo(!openInfo)}>
                <InfoPermissiveDocumentation/>
            </Modal>
        </div>
    );
};

export default PermissiveDocumentation;