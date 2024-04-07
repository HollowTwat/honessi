import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import useServer from "../../hooks/useServer";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import {localStorageNames} from "../../constants/LocalStorageNames";
import {initOrder} from "../../initData/order/InitOrder";
import {validOrder} from "../../validation/validation";
import {orderButton, unActiveButton} from "../../styles/colors";
import {formStyle} from "../../styles/form";
import Organization from "./Organization";
import Positions from "./Positions";
import Button from "../UI/Button";

const Order = ({type}) => {

    const { tg, user } = useTelegram();
    const { sendNewOrder, savejson } = useServer();
    const navigate = useNavigate();

    const [isDarkened, setIsDarkened] = useState(false);
    const [isValid, setValid] = useState(false);
    const [data, setData] = useLocalStorage(localStorageNames[type], initOrder)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        setValid(validOrder(data))
    }, [data])

    useEffect(() => {

        tg.MainButton.setParams({
            text: 'Оформить заказ',
            color: isValid ? orderButton : unActiveButton,
            text_color: isValid ? '#ffffff' : '#000000',
            is_active: isValid,
            is_visible: true
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValid]);

    const handleSendData =  useCallback(async () => {

        tg.showPopup({
                title: 'Оформление заказа',
                message: 'Вы уверены что хотите офрмить заказ?',
                buttons: [
                    {id: 1, type: 'default', text: 'Да'},
                    {id: 2, type: 'default', text: 'Нет'},
                    {id: 3, type: 'default', text: 'debug'}
                ]
        }, async (answerId) => {
            if (answerId === '1') {
                setIsDarkened(!isDarkened);
                tg.MainButton.showProgress(false);

                const {order_id} = await sendNewOrder(type, user, data);

                tg.MainButton.hideProgress();
                if (order_id !== '') {
                    localStorage.removeItem(localStorageNames[type]);
                    navigate('/orderComplete', {state: {order_id: order_id}});
                } else {
                    navigate('/orderError');
                }
            }
            if (answerId === '3'){
                const button = savejson(type, user, data);
                tg.showPopup ({
                    message: 'download button',
                    buttons: [
                        button
                    ]
                })
            }
        })
        //             {id: 2, type: 'default', text: 'Нет'}
        //         ]
        // }, async (answerId) => {
        //     if (answerId === '1') {
        //         setIsDarkened(!isDarkened);
        //         tg.MainButton.showProgress(false);

        //         const {order_id} = await sendNewOrder(type, user, data);

        //         tg.MainButton.hideProgress();
        //         if (order_id !== '') {
        //             localStorage.removeItem(localStorageNames[type]);
        //             navigate('/orderComplete', {state: {order_id: order_id}});
        //         } else {
        //             navigate('/orderError');
        //         }
        //     }
        // })
    }, [data, isDarkened, navigate, sendNewOrder, tg, type, user])

    useEffect(() => {

        tg.MainButton.onClick(handleSendData);
        return () => {
            tg.MainButton.offClick(handleSendData);
        };
    }, [tg, handleSendData])

    const handleUpdateData = (value, name) => {

        const updatedData = { ...data };
        updatedData[name] = value;
        setData(updatedData);
    };

    const handleDeleteRow = (index) => {

        const copyData = data;
        const indexRow = Number(index);
        if (!isNaN(Number(index))) {
            copyData.positions.splice(indexRow, 1);
            setData(copyData)
        }
    }

    const handleEditRow = (index) => {

        navigate(`/${type}/addOrEdit${type.charAt(0).toUpperCase() + type.slice(1)}/${index}`)
    }

    const darkenStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    };

    return (
        <div>
            {isDarkened && <div style={darkenStyle}></div>}
            <div style={formStyle}>
                <Organization data={data.organization} onChange={(value)=>{handleUpdateData(value, 'organization')}}/>
                <Positions type={type}
                           positions={data.positions}
                           onChange={(value)=>{handleUpdateData(value, 'accumulation')}}
                           handleDelete={(index) => {handleDeleteRow(index)}}
                           handleEdit={(index) => {handleEditRow(index)}}/>
                <Button onClick={()=>{navigate(`/${type}/addOrEdit${type.charAt(0).toUpperCase() + type.slice(1)}/`)}}>Добавить позицию</Button>
            </div>
        </div>
    );
};

export default Order;
