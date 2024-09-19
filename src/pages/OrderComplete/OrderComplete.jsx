import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import CategoryHeader from "../../components/UI/Headers/CategoryHeader";
import {orderButton} from "../../styles/colors";
import {formStyle} from "../../styles/form";
import Button from "../../components/UI/Button";

const OrderComplete = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { tg } = useTelegram();
    const num = location.state.order_id;

    useEffect(() => {

        window.scrollTo(0, 0);
        tg.BackButton.hide();
        tg.MainButton.hide()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleToMainPage = () => {
        navigate('/')
    }

    const handleCloseWebApp = () => {
        tg.close()
    }

    return (
        <div>
            <CategoryHeader backgroundColor={orderButton}/>
            <div style={formStyle}>
                <div style={{textAlign: 'center'}}>
                    <h1>Тестовый режим</h1>
                    <h4>Спасибо что участвуете в тестировании нашего нового бота</h4>
                </div>
                <h4 style={{textAlign: 'center', marginTop: 50}}>
                    Номер заказа №{num}<br/>Скоро с Вами свяжется наш менеджер!
                </h4>


            </div>
            <div style={{position: 'fixed', padding: 20, bottom: 0}}>
                <Button onClick={handleToMainPage}>Сделать новый заказ</Button>
                <Button onClick={handleCloseWebApp}>Вернуться в Telegram</Button>
                <h5 style={{textAlign: 'center', marginTop: 20}}>
                    Для оперативной связи с разработкой напишите в канал<br/>https://t.me/KotOps_dev
                </h5>
            </div>
        </div>
    );
};

export default OrderComplete;
