import React, {useCallback, useEffect, useState} from 'react';
import CustomSelect from "../../components/UI/CustomSelect";
import {countries} from "../../constants/Сountries";
import Input from "../../components/UI/Input";
import ArticlePrice from "../../components/common/articlePrice/ArticlePrice";
import PermissiveDocumentation from "../../components/common/permissiveDocumentation/PermissiveDocumentation";
import Set from "../../components/categories/perfume/Set";
import {useNavigate, useParams} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import {localStorageNames} from "../../constants/LocalStorageNames";
import {useTelegram} from "../../hooks/useTelegram";
import {addOrEditPositionButton, unActiveButton} from "../../styles/colors";
import {initUnderwearPosition, initUnderwearPositionValid} from "../../initData/underwear/InitUnderwearPosition";
import CategoryHeader from "../../components/UI/Headers/CategoryHeader";
import {formStyle} from "../../styles/form";
import {colors} from "../../constants/shoes/Colors";
import CompositionUnderwearOrder from "../../components/categories/underwear/CompositionUnderwearOrder";
import DivisionLine from "../../components/UI/DivisionLine";
import {consumerAge} from "../../constants/underwear/consumerAge";
import {underwearType} from "../../constants/underwear/underwearType";
import {textileType} from "../../constants/underwear/textileType";
import HsCodeHelp from "../../components/common/HsCodeHelp";
import Button from "../../components/UI/Button";
import useTNVED from "../../hooks/useTNVED";

const AddOrEditUnderwear = () => {

    const {editId} = useParams();
    const [isValid, setValid] = useState(false);
    const [data, setData] = useLocalStorage(localStorageNames['underwear']);
    const [position, setPosition] = useState(editId ? data.positions[editId] : initUnderwearPosition);
    const [positionValid, setPositionValid] = useState(initUnderwearPositionValid);
    const [triggerTNVED, setTriggerTNVED] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const tnvedResult = useTNVED(
        triggerTNVED ? position.underwearType  : null,
        triggerTNVED ? position.textileType : null,
        triggerTNVED ? [""] : null
    );

    useEffect(() => {
        const isButtonEnabled = position.underwearType  && position.textileType;
        setButtonEnabled(isButtonEnabled);
    }, [position]);


    const handleTNVEDClick = () => {
        setTriggerTNVED(true);
    }

    useEffect(() => {
        if (tnvedResult) {
            console.log("TNVED Result: ", tnvedResult);
            setPosition(prevState => ({
                ...prevState,
                hsCode: tnvedResult
            }));
            setTriggerTNVED(false); // Reset the trigger
        }
    }, [tnvedResult]);

    const buttonStyle = {
        backgroundColor: buttonEnabled ? 'yellow' : 'grey',
        color: buttonEnabled ? 'black' : 'white',
        cursor: buttonEnabled ? 'pointer' : 'not-allowed'
    };

    const navigate = useNavigate();
    const { tg } = useTelegram();

    useEffect(() => {

        window.scrollTo(0, 0);
        if (editId) {

            setPosition(data.positions[editId])
            const updatedPositionValid = { ...positionValid };

            for (const key in positionValid) {
                updatedPositionValid[key] = true;
            }
            setPositionValid(updatedPositionValid);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        const isValid = Object.values(positionValid).every(value => value === true);
        setValid(isValid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positionValid])

    useEffect(() => {
        tg.MainButton.setParams({
            text: editId ? 'Сохранить изменения' : 'Добавить позицию',
            color: isValid ? addOrEditPositionButton : unActiveButton,
            text_color: isValid ? '#ffffff' : '#000000',
            is_active: isValid,
            is_visible: true
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValid])

    tg.BackButton.onClick(() => {
        navigate("/underwear");
    });

    const handleAddPosition = useCallback(() => {

        let updatedPositions = data.positions

        if (editId) {
            updatedPositions[editId] = position
        } else {
            updatedPositions.push(position)
        }

        setData(prevState => ({
            ...prevState,
            positions: updatedPositions
        }));
        navigate("/underwear");
    }, [data.positions, editId, navigate, position, setData]);

    useEffect(() => {

        tg.MainButton.onClick(handleAddPosition)
        return () => {
            tg.MainButton.offClick(handleAddPosition)
        }
    }, [tg, handleAddPosition])

    // const helpButton = () => {
    //
    //     let updatedPositions = data.positions
    //
    //     if (editId) {
    //         updatedPositions[editId] = position
    //     } else {
    //         updatedPositions.push(position)
    //     }
    //
    //     setData(prevState => ({
    //         ...prevState,
    //         positions: updatedPositions
    //     }));
    //     navigate("/underwear");
    // };

    const handleDataUpdate = (valueOrEvent, name) => {

        const value = valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent;

        setPosition(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleValidUpdate = (valueOrEvent, name) => {

        const value = valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent;

        setPositionValid(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const updatePosition = (positions) => {

        let totalCount = positions.reduce((accumulator, currentDict) => {
            const count = Number(currentDict.count)
            if (!isNaN(count)){
                return accumulator + Number(currentDict.count);
            }
            return accumulator
        }, 0);

        if (totalCount === 0) {
            totalCount = ''
        }

        handleDataUpdate(positions, 'position');
        // handleDataUpdate(totalCount, 'total');
        const boxdata = Number(position.setData.count)
        if (boxdata !== 0) {
            handleDataUpdate(totalCount*boxdata, 'total');
        } else {handleDataUpdate(totalCount, 'total');}
    }

    return (
        <div>
            <CategoryHeader text={editId ? "Редактирование" : "Добавление позиции"}/>
            <div style={formStyle}>
                <Input
                    label={"Товарный знак"}
                    value={position.trademark}
                    onChange={(e)=>{handleDataUpdate(e, 'trademark')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'trademark')}}
                    helpText={"Не более 50 знаков"}/>
                <Input
                    label={"Артикул"}
                    value={position.article}
                    onChange={(e)=>{handleDataUpdate(e, 'article')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'article')}}
                    helpText={"Не более 50 знаков"}
                />
                <CustomSelect
                    label={"Вид товара"}
                    options={underwearType}
                    value={position.underwearType}
                    onChange={(e)=>{handleDataUpdate(e, 'underwearType')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'underwearType')}}
                />
                <CustomSelect
                    label={"Цвет"}
                    options={colors}
                    value={position.color}
                    onChange={(e)=>{handleDataUpdate(e, 'color')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'color')}}
                />
                <Set
                    initState={position.set}
                    initValue={position.setData}
                    onChangeState={(state)=>{handleDataUpdate(state, 'set')}}
                    onChangeValue={(value)=>{handleDataUpdate(value, 'setData')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'setData')}}
                />
                <CompositionUnderwearOrder
                    values={position.position}
                    setValue={(positions) => {updatePosition(positions)}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'position')}}
                />
                <Input
                    label={"Итого"}
                    value={position.total}
                    disabled={true}
                    onChange={(e) => {handleDataUpdate(e, 'total')}}
                />
                <DivisionLine height={1} marginTop={20} marginBottom={20}/>
                <Input
                    label={"Состав"}
                    value={position.composition}
                    onChange={(e)=>{handleDataUpdate(e, 'composition')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'composition')}}
                />
                <CustomSelect
                    label={"Тип текстиля"}
                    options={textileType}
                    value={position.textileType}
                    onChange={(e)=>{handleDataUpdate(e, 'textileType')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'textileType')}}
                />
                <CustomSelect
                    label={"Возраст потребителя"}
                    options={consumerAge}
                    value={position.consumerAge}
                    onChange={(e)=>{handleDataUpdate(e, 'consumerAge')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'consumerAge')}}
                />
                <CustomSelect
                    label={"Страна"}
                    options={countries}
                    value={position.country}
                    onChange={(e)=>{handleDataUpdate(e, 'country')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'country')}}
                />
                <Input
                    label={"Код ТНВЭД"}
                    value={position.hsCode}
                    validationType={'hsCode'}
                    onChange={(e)=>{handleDataUpdate(e, 'hsCode')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'hsCode')}}
                />
                <Button onClick={handleTNVEDClick} style={buttonStyle} disabled={!buttonEnabled}>Подобрать код ТНВЭД</Button>
                <HsCodeHelp type={'underwear'}/>
                <ArticlePrice
                    initState={position.articlePrice}
                    initValue={position.articlePriceData}
                    onChangeState={(state)=>{handleDataUpdate(state, 'articlePrice')}}
                    onChangeValue={(value)=>{handleDataUpdate(value, 'articlePriceData')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'articlePriceData')}}
                />
                <PermissiveDocumentation
                    initState={position.permissiveDocumentation}
                    initValue={position.permissiveDocumentationData}
                    onChangeState={(state)=>{handleDataUpdate(state, 'permissiveDocumentation')}}
                    onChangeValue={(value)=>{handleDataUpdate(value, 'permissiveDocumentationData')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'permissiveDocumentationData')}}
                />
            </div>
        </div>
    );
};

export default AddOrEditUnderwear;
