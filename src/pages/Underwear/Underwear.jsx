import React from 'react';
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import CategoryHeader from "../../components/UI/Headers/CategoryHeader";
import Order from "../../components/common/Order";

const Underwear = () => {

    const navigate = useNavigate();

    const {tg} = useTelegram();

    tg.BackButton.show();
    tg.expand();

    tg.BackButton.onClick(() => {
        navigate("/");
    });

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <CategoryHeader text={"Белье"} />
            <Order type={'underwear'} />
        </div>
    );
};

export default Underwear;