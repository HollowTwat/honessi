import React from "react";
import {useTelegram} from "../../hooks/useTelegram";
import {useNavigate} from "react-router-dom";
import CategoryHeader from "../../components/UI/Headers/CategoryHeader";
import Order from "../../components/common/Order";

const Shoes = () => {

    const navigate = useNavigate();

    const {tg} = useTelegram();
    tg.expand();
    tg.BackButton.show();
    tg.BackButton.onClick(() => {
        navigate("/");
    });

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <CategoryHeader text={"Обувь"}/>
            <Order type={'shoes'} />
        </div>
    );
};

export default Shoes;