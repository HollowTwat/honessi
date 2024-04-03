import React from "react";
import {useTelegram} from "../../hooks/useTelegram";
import {useNavigate} from "react-router-dom";
import CategoryHeader from "../../components/UI/Headers/CategoryHeader";
import Order from "../../components/common/Order";

const Clothes = () => {

    const navigate = useNavigate();

    const {tg} = useTelegram();

    tg.BackButton.show();
    tg.expand();

    tg.BackButton.onClick(() => {
        navigate("/");
    });

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <CategoryHeader text={"Одежда"}/>
            <Order type={'clothes'}/>
        </div>
    );
};

export default Clothes;