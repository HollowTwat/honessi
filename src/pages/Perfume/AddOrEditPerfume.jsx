import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useLocalStorage} from "@uidotdev/usehooks";
import {localStorageNames} from "../../constants/LocalStorageNames";
import {initPerfumePosition, initPerfumePositionValid} from "../../initData/perfume/InitPerfumePosition";
import {addOrEditPositionButton, unActiveButton} from "../../styles/colors";
import CategoryHeader from "../../components/UI/Headers/CategoryHeader";
import {formStyle} from "../../styles/form";
import Input from "../../components/UI/Input";
import CustomSelect from "../../components/UI/CustomSelect";
// import Set from "../../components/categories/perfume/Set";
import {countries} from "../../constants/Сountries";
import ArticlePrice from "../../components/common/articlePrice/ArticlePrice";
import PermissiveDocumentation from "../../components/common/permissiveDocumentation/PermissiveDocumentation";
// import Button from "../../components/UI/Button";
import {measurementUnit} from "../../constants/perfume/measurementUnit";
import {packagingType} from "../../constants/perfume/packagingType";
import {packagingMaterial} from "../../constants/perfume/packagingMaterial";
import {perfumeType} from "../../constants/perfume/perfumeType";
import HsCodeHelp from "../../components/common/HsCodeHelp";
import Button from "../../components/UI/Button";
import useTNVED from "../../hooks/useTNVED";

const AddOrEditPerfume = () => {

    const navigate = useNavigate();

    const { tg } = useTelegram();
    const {editId} = useParams();
    const [isValid, setValid] = useState(false);
    const [data, setData] = useLocalStorage(localStorageNames['perfume']);
    const [position, setPosition] = useState(editId ? data.positions[editId] : initPerfumePosition);
    const [positionValid, setPositionValid] = useState(initPerfumePositionValid);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [triggerTNVED, setTriggerTNVED] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);


const tnvedResult = useTNVED(
    triggerTNVED ? position.perfumeType : null,
    triggerTNVED ? [""] : null,
    triggerTNVED ? [""] : null
);

useEffect(() => {
    const isButtonEnabled = !!position.perfumeType && !isCooldown;
    setButtonEnabled(isButtonEnabled);
}, [position.perfumeType, isCooldown]);

const isTriggeredRef = useRef(false);

const handleTNVEDClick = useCallback(() => {
    if (!isTriggeredRef.current) {
        setTriggerTNVED(true);
        isTriggeredRef.current = true;  // Prevent multiple triggers

        // Start cooldown
        setIsCooldown(true);
        setTimeout(() => {
            setIsCooldown(false);
            isTriggeredRef.current = false;  // Reset after cooldown
        }, 5000);
    }
}, []);


useEffect(() => {
    if (tnvedResult) {
        console.log("TNVED Result: ", tnvedResult);
        console.log("TNVED Result: ", tnvedResult);
        console.log("TNVED Result: ", tnvedResult);
        setPosition(prevState => ({
            ...prevState,
            hsCode: tnvedResult
        }));
        setPositionValid(prevState => ({
            ...prevState,
            hsCode: true // Mark hsCode as valid
        }));
        setTriggerTNVED(false); // Reset the trigger
    }
}, [tnvedResult]);

// const buttonStyle = {
//     // backgroundColor: buttonEnabled ? 'yellow' : 'grey',
//     // color: buttonEnabled ? 'black' : 'white',
//     // cursor: buttonEnabled ? 'pointer' : 'not-allowed',
//     transition: 'background-color 0.3s, color 0.3s, cursor 0.3s'
// };

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
    }, [positionValid, position.hsCode])

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
        navigate("/perfume");
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

        navigate("/perfume");

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
    //     navigate("/perfume");
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

        const multiply = (randovalue) => {
        const boxmultiplier = Number(position.setData.count)
            if (boxmultiplier !== 0){
                handleDataUpdate(boxmultiplier*randovalue,'total');
            }else {handleDataUpdate (randovalue, 'total')};
    }


    return (
        <div>
            <CategoryHeader text={editId? "Редактирование" : "Добавление позиции"}/>
            <div style={formStyle}>
                <Input
                    label={"Товарный знак"}
                    value={position.trademark}
                    onChange={(e)=> {handleDataUpdate(e, 'trademark')}}
                    onChangeValid={(e) => {handleValidUpdate(e, 'trademark')}}
                    helpText={"Не более 50 знаков"}
                />
                <Input
                    label={"Обьем"}
                    value={position.volume}
                    onChange={(e)=> {handleDataUpdate(e, 'volume')}}
                    onChangeValid={(e) => {handleValidUpdate(e, 'volume')}}
                />
                <CustomSelect
                    label={"Ед. измерения"}
                    options={measurementUnit}
                    value={position.measurementUnit}
                    onChange={(e)=>{handleDataUpdate(e, 'measurementUnit')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'measurementUnit')}}
                />
                <CustomSelect
                    label={"Тип упаковки"}
                    options={packagingType}
                    value={position.packagingType}
                    onChange={(e)=>{handleDataUpdate(e, 'packagingType')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'packagingType')}}
                />
                <CustomSelect
                    label={"Материал упаковки"}
                    options={packagingMaterial}
                    value={position.packagingMaterial}
                    onChange={(e)=>{handleDataUpdate(e, 'packagingMaterial')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'packagingMaterial')}}
                />
                <CustomSelect
                    label={"Тип парфюмерии"}
                    options={perfumeType}
                    value={position.perfumeType}
                    onChange={(e)=>{handleDataUpdate(e, 'perfumeType')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'perfumeType')}}
                />
{/*                 <Set
                    initState={position.set}
                    initValue={position.setData}
                    onChangeState={(state)=>{handleDataUpdate(state, 'set')}}
                    onChangeValue={(value)=>{handleDataUpdate(value, 'setData')}}
                    onChangeValid={(isValid) => {handleValidUpdate(isValid, 'setData')}}
                /> */}
                <Input
                    label={"Кол-во"}
                    id = 'total1'
                    onChange={(e) => {multiply(e)}}
                    onChangeValid={(e) => {handleValidUpdate(e, 'total')}}
                />
                <Input
                    label={"Итого"}
                    value={position.total}
                    disabled={true}
                    onChange={(e) => {handleDataUpdate(e, 'total')}}
                    onChangeValid={(e) => {handleValidUpdate(e, 'total')}}
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
                {/* Conditionally render the TNVED button */}
                {buttonEnabled && (
                <Button 
                    onClick={handleTNVEDClick} 
                    disabled={isCooldown} // Disable the button during cooldown
                >
                    Подобрать код ТНВЭД
                </Button>
                )}
                <HsCodeHelp type={'perfume'}/>
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
                {/*<Button onClick={helpButton}>helpButton</Button>*/}
            </div>
        </div>
    );
};

export default AddOrEditPerfume;
