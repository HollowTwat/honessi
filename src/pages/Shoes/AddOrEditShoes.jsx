import React, {useCallback, useEffect, useState} from 'react';

import Input from "../../components/UI/Input";
import DivisionLine from "../../components/UI/DivisionLine";
import CustomSelect from "../../components/UI/CustomSelect";
import CategoryHeader from "../../components/UI/Headers/CategoryHeader";
// import WithBox from "../../components/categories/shoes/WithBox/WithBox";
import CompositionShoesOrder from "../../components/categories/shoes/CompositionShoesOrder";
import ArticlePrice from "../../components/common/articlePrice/ArticlePrice";
import PermissiveDocumentation from "../../components/common/permissiveDocumentation/PermissiveDocumentation";
import {useTelegram} from "../../hooks/useTelegram";
import {useNavigate, useParams} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";

import {colors} from "../../constants/shoes/Colors";
import {shoesType} from "../../constants/shoes/ShoesType";
import {shoesMaterial} from "../../constants/shoes/ShoesMaterial";
import {shoesBottomMaterial} from "../../constants/shoes/ShoesBottomMaterial";
import {sexShoes} from "../../constants/shoes/SexShoes";
import {countries} from "../../constants/Сountries";

import Button from "../../components/UI/Button";
import {initShoesPosition, initShoesPositionValid} from "../../initData/shoes/InitShoesPosition";
import {formStyle} from "../../styles/form";
import {addOrEditPositionButton, unActiveButton} from "../../styles/colors";
import {localStorageNames} from "../../constants/LocalStorageNames";
import HsCodeHelp from "../../components/common/HsCodeHelp";
import useTNVED from "../../hooks/useTNVED";


const AddOrEditShoes = () => {

    const {editId} = useParams();
    const [isValid, setValid] = useState(false);
    const [data, setData] = useLocalStorage(localStorageNames['shoes']);
    const [position, setPosition] = useState(editId ? data.positions[editId] : initShoesPosition);
    const [positionValid, setPositionValid] = useState(initShoesPositionValid);
    const [triggerTNVED, setTriggerTNVED] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const tnvedResult = useTNVED(
        triggerTNVED ? position.shoesType : null,
        triggerTNVED ? [position.upperMaterial, position.liningMaterial, position.bottomMaterial] : null,
        triggerTNVED ? position.sex : null
    );

    useEffect(() => {
        const isButtonEnabled = position.shoesType && position.upperMaterial && position.liningMaterial && position.bottomMaterial && position.sex;
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

        navigate("/shoes");
    }, [data.positions, editId, position, setData, navigate]);

    useEffect(() => {

        tg.MainButton.onClick(handleAddPosition)
        return () => {
            tg.MainButton.offClick(handleAddPosition)
        }
    }, [tg, handleAddPosition])

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
        navigate("/shoes");
    });


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
        const boxdata = Number(position.withBoxData.countBox)
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
                    label={"Вид обуви"}
                    options={shoesType}
                    value={position.shoesType}
                    onChange={(e)=>{handleDataUpdate(e, 'shoesType')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'shoesType')}}
                />
                <CustomSelect
                    label={"Цвет"}
                    options={colors}
                    value={position.color}
                    onChange={(e)=>{handleDataUpdate(e, 'color')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'color')}}
                />
{/*                 <WithBox
                    initState={position.withBox}
                    initValue={position.withBoxData}
                    onChangeState={(state)=>{handleDataUpdate(state, 'withBox')}}
                    onChangeValue={(value)=>{handleDataUpdate(value, 'withBoxData')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'withBoxData')}}
                /> */}
                <CompositionShoesOrder
                    values={position.position}
                    setValue={(positions) => {updatePosition(positions)}}
                    withBox={position.withBox}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'position')}}
                />
                <Input
                    label={"Итого"}
                    value={position.total}
                    disabled={true}
                    onChange={(e) => {handleDataUpdate(e, 'total')}}
                />
                <DivisionLine height={1} marginTop={20} marginBottom={20}/>
                <CustomSelect
                    label={"Материал верха"}
                    options={shoesMaterial}
                    value={position.upperMaterial}
                    onChange={(e)=>{handleDataUpdate(e, 'upperMaterial')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'upperMaterial')}}
                />
                <CustomSelect
                    label={"Материал подкладки"}
                    options={shoesMaterial}
                    value={position.liningMaterial}
                    onChange={(e)=>{handleDataUpdate(e, 'liningMaterial')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'liningMaterial')}}
                />
                <CustomSelect
                    label={"Материал низа"}
                    options={shoesBottomMaterial}
                    value={position.bottomMaterial}
                    onChange={(e)=>{handleDataUpdate(e, 'bottomMaterial')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'bottomMaterial')}}
                />
                <CustomSelect
                    label={"Пол"}
                    options={sexShoes}
                    value={position.sex}
                    onChange={(e)=>{handleDataUpdate(e, 'sex')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'sex')}}
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
                <Button onClick={handleTNVEDClick} style={buttonStyle} disabled={!buttonEnabled}>Check TNVED</Button>
                <HsCodeHelp type={'shoes'}/>
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
                {/*<Button onClick={addPosition}>help</Button>*/}
            </div>
        </div>
    );
};

export default AddOrEditShoes;
