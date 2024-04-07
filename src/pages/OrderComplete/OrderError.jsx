import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import CategoryHeader from "../../components/UI/Headers/CategoryHeader";
import {error} from "../../styles/colors";
import {formStyle} from "../../styles/form";
import Button from "../../components/UI/Button";
//new
import {useLocalStorage} from "@uidotdev/usehooks";
import useServer from "../../hooks/useServer";
import {localStorageNames} from "../../constants/LocalStorageNames";
import {initOrder} from "../../initData/order/InitOrder";


const OrderError = () => {

    const navigate = useNavigate();
    const { tg, user } = useTelegram();
    //new
    const { savejson } = useServer();
    const [data] = useLocalStorage(localStorageNames['clothes'], initOrder)
    //

    const handleDownload = () =>{
        savejson('clothes', user, data);
    }

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
            <CategoryHeader backgroundColor={error}/>
            <div style={formStyle}>
                <div style={{textAlign: 'center'}}>
                    <h1>Ошибка!</h1>
                    <h2>К сожалению, при оформелении заказа произошла ошибка!</h2>
                </div>
                <h4 style={{textAlign: 'center', marginTop: 50}}>
                    {JSON.stringify({category: type,user_name: user?.username,user_id: user?.id.toString(),order: order})}
                </h4>
            </div>
            <div style={{position: 'fixed', padding: 20, bottom: 0}}>
                <Button onClick={handleToMainPage}>Сделать новый заказ</Button>
                <Button onClick={handleCloseWebApp}>Вернуться в Telegram</Button>
                <Button onClick={handleDownload}>Download</Button>
            </div>
        </div>
    );
};

export default OrderError;
