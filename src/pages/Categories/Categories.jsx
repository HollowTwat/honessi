import React, {useEffect} from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from "react-router-dom"
import Button from "../../components/UI/Button";
import {initOrder} from "../../initData/order/InitOrder";
import {mainBlue} from "../../styles/colors";

const Categories = () => {

    const {tg} = useTelegram();

    const navigate = useNavigate();

    useEffect(() => {

        tg.BackButton.hide();
        tg.MainButton.hide()
        tg.setHeaderColor('#ffffff')
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const unfinishedOrder = (answerId, localStorageKey, to) => {

        if (answerId !== '1') {
            localStorage.removeItem(localStorageKey)
        }
        navigate(to)
    }

    const isObjectsEqual = (obj1, obj2) => {
        const obj1Keys = Object.keys(obj1);
        const obj2Keys = Object.keys(obj2);

        if (obj1Keys.length !== obj2Keys.length) {
            return false;
        }

        for (let key of obj1Keys) {
            const val1 = obj1[key];
            const val2 = obj2[key];
            const areObjects = isObject(val1) && isObject(val2);
            if (
                (areObjects && !isObjectsEqual(val1, val2)) ||
                (!areObjects && val1 !== val2)
            ) {
                return false;
            }
        }

        return true;
    }

    const isObject = (object) => {
        return object != null && typeof object === 'object';
    }

    const onClickCategory = (localStorageKey = '', to) => {

        const localStorageValue = localStorage.getItem(localStorageKey);
        const localStorageObject = localStorageValue && JSON.parse(localStorageValue);

        if (localStorageObject && !isObjectsEqual(localStorageObject, initOrder)) {
            tg.showPopup({
                title: 'Незавершенный заказ',
                message: 'Имеется незавершенный заказа. Хотите продолжить?',
                buttons: [
                    {id: 1, type: 'default', text: 'Да'},
                    {id: 2, type: 'default', text: 'Нет'}
                ]
            }, (answerId) => {
                unfinishedOrder(answerId, localStorageKey, to)
            })
        } else {
            navigate(to)
        }
    }

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', padding: 20}}>
                <h2>Выберите категорию:</h2>
                <Button onClick={() => {onClickCategory('orderShoes', '/shoes')}}>Обувь</Button>
                <Button onClick={() => {onClickCategory('orderClothes','/clothes')}}>Одежда</Button>
                <Button onClick={() => {onClickCategory('orderUnderwear','/underwear')}}>Белье</Button>
                <Button onClick={() => {onClickCategory('orderPerfume','/perfume')}}>Духи</Button>
                <button
                    style={{
                        //background: mainBlue,
                        //color: 'white',
                        background: mainBlue,
                        color: buttontext,
                        
                        marginTop: 10,
                        marginBottom: 10,
                        padding: 10,
                        borderRadius: 20,
                        border: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                        height: 80,
                        fontSize: 18
                }}
                    onClick={() =>  navigate('/ad')}
                >
                    Хочешь такое же приложение?
                    <br />
                    Напиши мне
                </button>
            </div>
        </div>
    );
};

export default Categories;
