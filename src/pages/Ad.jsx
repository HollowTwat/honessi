import React from 'react';
import chz_logo from '../../src/images/chz_logo.jpg';
import {mainBlue} from "../styles/colors";
import {useTelegram} from "../hooks/useTelegram";
import {useNavigate} from "react-router-dom";

const Ad = () => {
    const navigate = useNavigate();

    const {tg} = useTelegram();

    tg.BackButton.show();
    tg.expand();

    tg.BackButton.onClick(() => {
        navigate("/");
    });

    return (
        <div>
            <div style={{width:200, height:200, marginLeft: "auto", marginTop: 30, marginRight: "auto", display: "block"}}>
                <img src={chz_logo} alt={'logo'} style={{borderRadius: 9999999}}/>
            </div>
            <br/>
            <div style={{textAlign: "center", fontWeight: 900, fontSize: 20}}>ЧЕСТНЫЙ ЗНАК | Заказ кодов</div>
            <div style={{padding: 25, fontWeight: 500, textIndent: 15, fontSize: 18, textAlign: "justify"}}>
                <p>
                    Наше приложение может обрабатывать сотни тысяч кодов маркировки каждый день. Делая жизнь продавцов
                    проще и лучше!<br/><br/>
                </p>
                <p>
                    Вы можете заказать такое же приложение или добавить любые другие функции которые сделают его еще
                    лучше и удобнее для ваших клиентов!
                </p>
            </div>
            <br/>
            <div style={{textAlign: "center", fontWeight: 900, fontSize: 20}}>Закодим любые ваши идеи❤️</div>
            <div style={{padding: 20}}>
                <button
                    style={{
                        background: mainBlue,
                        color: 'white',
                        borderRadius: 20,
                        border: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                        height: 80,
                    }}
                    onClick={() => window.open('https://t.me/ki_prog', '_blank')}
                >
                    <span style={{fontSize: 18,}}>Заказать приложение</span>
                    <br/>
                    <span style={{fontWeight: 10, fontSize: 12, paddingTop: 10}}>Написать разработчику</span>
                </button>
            </div>
        </div>
    );
};

export default Ad;