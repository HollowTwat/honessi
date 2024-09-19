import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import CategoryHeader from "../../components/UI/Headers/CategoryHeader";
import {error1} from "../../styles/colors";
import {formStyle} from "../../styles/form";
import Button from "../../components/UI/Button";

const OrderError = () => {

    const navigate = useNavigate();
    const { tg } = useTelegram();

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
            <CategoryHeader backgroundColor={error1}/>
            <div style={formStyle}>
                <div style={{textAlign: 'center'}}>
                    <h1>Ошибка!(Тестовый режим)</h1>
                    <h4>Спасибо что участвуете в тестировании нашего нового бота!</h4>
                </div>
                <h4 style={{textAlign: 'center', marginTop: 50}}>
                    Мы запомнили ваш заказ, но пока не смогли его обработать, попробуйте повторить его отправку позже
                </h4>
                <h2 style={{textAlign: 'center', marginTop: 20}}>
                    Для оперативной связи с разработкой напишите в канал<br/>https://t.me/KotOps_dev
                </h2>
            </div>
            <div style={{position: 'fixed', padding: 20, bottom: 0}}>
                <Button onClick={handleToMainPage}>Сделать новый заказ</Button>
                <Button onClick={handleCloseWebApp}>Вернуться в Telegram</Button>
            </div>
        </div>
    );
};

export default OrderError;
