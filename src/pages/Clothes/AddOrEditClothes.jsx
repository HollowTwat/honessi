import React, { useCallback, useEffect, useState } from 'react';
import CategoryHeader from "../../components/UI/Headers/CategoryHeader";
import { formStyle } from "../../styles/form";
import Input from "../../components/UI/Input";
import CustomSelect from "../../components/UI/CustomSelect";
import { clothesType } from "../../constants/clothes/ClothesType";
import { clothesColor } from "../../constants/clothes/ClothesColor";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { localStorageNames } from "../../constants/LocalStorageNames";
import { initClothesPosition, initClothesPositionValid } from "../../initData/clothes/InitClothesPosition";
import { useTelegram } from "../../hooks/useTelegram";
import { addOrEditPositionButton, unActiveButton } from "../../styles/colors";
import CompositionClothesOrder from "../../components/categories/clothes/CompositionClothesOrder";
import DivisionLine from "../../components/UI/DivisionLine";
import { countries } from "../../constants/Сountries";
import ArticlePrice from "../../components/common/articlePrice/ArticlePrice";
import PermissiveDocumentation from "../../components/common/permissiveDocumentation/PermissiveDocumentation";
import MultipleSelect from "../../components/UI/MultipleSelect";
import { clothesMaterial } from "../../constants/clothes/ClothesMaterial";
import MultilineInput from "../../components/UI/MultilineInput";
import HsCodeHelp from "../../components/common/HsCodeHelp";
import { sexClothes } from "../../constants/clothes/SexClothes";
import Button from "../../components/UI/Button";
import useTNVED from "../../hooks/useTNVED"; // Import the custom hook

const AddOrEditClothes = () => {
    const navigate = useNavigate();
    const { tg } = useTelegram();
    const { editId } = useParams();
    const [isValid, setValid] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false); // New state for button
    const [data, setData] = useLocalStorage(localStorageNames['clothes']);
    const [position, setPosition] = useState(editId ? data.positions[editId] : initClothesPosition);
    const [positionValid, setPositionValid] = useState(initClothesPositionValid);
    const [triggerTNVED, setTriggerTNVED] = useState(false);

    const tnvedResult = useTNVED(
      triggerTNVED ? position.clothesType : null,
      triggerTNVED ? position.materials : null,
      triggerTNVED ? position.sex : null
    );

    // Only run this useEffect once on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
        if (editId) {
            setPosition(data.positions[editId])
            const updatedPositionValid = { ...positionValid };
            for (const key in initClothesPositionValid) {
                updatedPositionValid[key] = true;
            }
            setPositionValid(updatedPositionValid);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const isValid = Object.values(positionValid).every(value => value === true);
        setValid(isValid)
    }, [positionValid]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: editId ? 'Сохранить изменения' : 'Добавить позицию',
            color: isValid ? addOrEditPositionButton : unActiveButton,
            text_color: isValid ? '#ffffff' : '#000000',
            is_active: isValid,
            is_visible: true
        })
    }, [isValid, editId, tg.MainButton]);

    useEffect(() => {
        const isButtonEnabled = position.clothesType && position.materials.length > 0 && position.sex;
        setButtonEnabled(isButtonEnabled);
    }, [position]);

    tg.BackButton.onClick(() => {
        navigate("/clothes");
    });

    const handleAddPosition = useCallback(() => {
        let updatedPositions = data.positions;
        if (editId) {
            updatedPositions[editId] = position;
        } else {
            updatedPositions.push(position);
        }
        setData(prevState => ({
            ...prevState,
            positions: updatedPositions
        }));
        navigate("/clothes");
    }, [data.positions, editId, navigate, position, setData]);

    useEffect(() => {
        tg.MainButton.onClick(handleAddPosition);
        return () => {
            tg.MainButton.offClick(handleAddPosition);
        }
    }, [tg, handleAddPosition]);

    const handleDataUpdate = (valueOrEvent, name) => {
        const value = valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent;
        setPosition(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleValidUpdate = (isValid, name) => {
        setPositionValid(prevState => ({
            ...prevState,
            [name]: isValid
        }));
    }

    const updatePosition = (positions) => {
        let totalCount = positions.reduce((accumulator, currentDict) => {
            const count = Number(currentDict.count);
            if (!isNaN(count)) {
                return accumulator + Number(currentDict.count);
            }
            return accumulator;
        }, 0);

        if (totalCount === 0) {
            totalCount = '';
        }

        handleDataUpdate(positions, 'position');
        handleDataUpdate(totalCount, 'total');
    }

    const handleTNVEDClick = () => {
        setTriggerTNVED(true);
    }

    useEffect(() => {
        if (tnvedResult) {
            console.log("TNVED Result: ", tnvedResult);
            // handle the result as needed, e.g., display it or update the state
        }
    }, [tnvedResult]);

    // Styles for the button
    const buttonStyle = {
        backgroundColor: buttonEnabled ? 'yellow' : 'grey',
        color: buttonEnabled ? 'black' : 'white',
        cursor: buttonEnabled ? 'pointer' : 'not-allowed'
    };

    return (
        <div>
            <CategoryHeader text={editId ? "Редактирование" : "Добавление позиции"} />
            <div style={formStyle}>
                <Input
                    label={"Товарный знак"}
                    value={position.trademark}
                    onChange={(e) => { handleDataUpdate(e, 'trademark') }}
                    onChangeValid={(isValid) => { handleValidUpdate(isValid, 'trademark') }}
                    helpText={"Не более 50 знаков"}
                />
                <Input
                    label={"Артикул"}
                    value={position.article}
                    onChange={(e) => { handleDataUpdate(e, 'article') }}
                    onChangeValid={(isValid) => { handleValidUpdate(isValid, 'article') }}
                    helpText={"Не более 50 знаков"}
                />
                <CustomSelect
                    label={"Вид товара"}
                    options={clothesType}
                    value={position.clothesType}
                    onChange={(value) => { handleDataUpdate(value, 'clothesType') }}
                    onChangeValid={(isValid) => { handleValidUpdate(isValid, 'clothesType') }}
                />
                <CustomSelect
                    label={"Цвет"}
                    options={clothesColor}
                    value={position.color}
                    onChange={(value) => { handleDataUpdate(value, 'color') }}
                    onChangeValid={(isValid) => { handleValidUpdate(isValid, 'color') }}
                />
                <CompositionClothesOrder
                    values={position.position}
                    setValue={(positions) => { updatePosition(positions) }}
                    onChangeValid={(isValid) => { handleValidUpdate(isValid, 'position') }}
                />
                <Input
                    label={"Итого"}
                    value={position.total}
                    disabled={true}
                    onChange={(e) => { handleDataUpdate(e, 'total') }}
                />
                <DivisionLine height={1} marginTop={20} marginBottom={20} />
                <MultipleSelect
                    label={"Состав"}
                    options={clothesMaterial}
                    initValue={position.materials}
                    onChange={(value) => { handleDataUpdate(value, 'materials') }}
                    onChangeValid={(isValid) => { handleValidUpdate(isValid, 'materials') }}
                />
                <MultilineInput
                    label={"Введите свое"}
                    helpText={'Необходимо указывать материалы чепез запятую'}
                    initValue={position.userMaterials} onChange={(value) => { handleDataUpdate(value, 'userMaterials') }}
                />
                <CustomSelect
                    label={"Пол"}
                    options={sexClothes}
                    value={position.sex}
                    onChange={(value) => { handleDataUpdate(value, 'sex') }}
                    onChangeValid={(isValid) => { handleValidUpdate(isValid, 'sex') }}
                />
                <CustomSelect
                    label={"Страна"}
                    options={countries}
                    value={position.country}
                    onChange={(value) => { handleDataUpdate(value, 'country') }}
                    onChangeValid={(isValid) => { handleValidUpdate(isValid, 'country') }}
                />
                <Input
                    label={"Код ТНВЭД"}
                    value={position.hsCode}
                    validationType={'hsCode'}
                    onChange={(e) => { handleDataUpdate(e, 'hsCode') }}
                    onChangeValid={(isValid) => { handleValidUpdate(isValid, 'hsCode') }}
                />
                <HsCodeHelp type={'clothes'} />
                <ArticlePrice
                    initState={position.articlePrice}
                    initValue={position.articlePriceData}
                    onChangeState={(state) => { handleDataUpdate(state, 'articlePrice') }}
                    onChangeValue={(value) => { handleDataUpdate(value, 'articlePriceData') }}
                    onChangeValid={(isValid) => { handleValidUpdate(isValid, 'articlePriceData') }}
                />
                <PermissiveDocumentation
                    initState={position.permissiveDocumentation}
                    initValue={position.permissiveDocumentationData}
                    onChangeState={(state) => { handleDataUpdate(state, 'permissiveDocumentation') }}
                    onChangeValue={(value) => { handleDataUpdate(value, 'permissiveDocumentationData') }}
                    onChangeValid={(isValid) => { handleValidUpdate(isValid, 'permissiveDocumentationData') }}
                />
                <Button onClick={handleTNVEDClick} style={buttonStyle}>Check TNVED</Button>
            </div>
        </div>
    );
};

export default AddOrEditClothes;
