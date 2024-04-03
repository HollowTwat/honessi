import React, { useEffect, useState } from 'react';
import BlockHeader from "../UI/Headers/BlockHeader";
import Input from "../UI/Input";
import PositionTable from "./PositionTable";
import useCounterPosition from "../../hooks/useCounterPosition";
import {initAccumulationResult} from "../../initData/order/InitAccumulationResult";

const Positions = ({type= 'shoes', positions, onChange = () => {}, handleDelete = () => {}, handleEdit = () => {}}) => {

    const [accumulationResult, setAccumulationResult] = useState(initAccumulationResult);
    const { handleCountItems, handleCountSum } = useCounterPosition();

    useEffect(() => {
        onChange(accumulationResult);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accumulationResult])

    useEffect(() => {

        const countLines = positions.length;
        const countItems = handleCountItems(positions);
        const totalPrice = handleCountSum(positions);

        setAccumulationResult(prevState => ({
            ...prevState,
            'countLines': countLines,
            'countItems': countItems,
            'totalPrice': totalPrice
        }));

        onChange(accumulationResult);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positions]);

    return (
        <div>
            <BlockHeader text={"Позиции"}/>
            <Input label={"Кол-во строк в накладной (макс. 1600)"} value={accumulationResult.countLines} disabled={true}/>
            <Input label={"Общее кол-во по накладной"} value={accumulationResult.countItems} disabled={true}/>
            <Input label={"Сумма по накладной"} value={accumulationResult.totalPrice} disabled={true}/>
            <PositionTable
                typeTable={type}
                values={positions}
                onClickDelete={(index) => {handleDelete(index)}}
                onClickEdit={(index) => {handleEdit(index)}}
            />
        </div>
    );
};

export default Positions;