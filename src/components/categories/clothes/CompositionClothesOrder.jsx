import React, {useCallback} from 'react';
import Input from "../../UI/Input";

import deleteIcon from "../../../images/icons/delete.png";
import Button from "../../UI/Button";
import DivisionLine from "../../UI/DivisionLine";
import {validate} from "../../../validation/validation";
import BlockHeader from "../../UI/Headers/BlockHeader";

const CompositionClothesOrder = ({values, setValue, onChangeValid = () => {}}) => {

    const handleUpdateValid = useCallback((list) => {

        let index = 0;
        let isValid = true;

        while (index < list.length && isValid) {
            if (!(validate(list[index]['size'], 'sizeClothes') &&
                validate(list[index]['count'], 'numeric'))) {
                isValid = false;
            }
            index++;
        }

        onChangeValid(isValid)

    }, [onChangeValid])

    const handleItemAdd = useCallback(() => {

        const newValues = [...values, { size: '', count: '' }];

        setValue(newValues);
        handleUpdateValid(newValues);
    }, [handleUpdateValid, setValue, values]);

    const handleItemRemove = useCallback((index) => {

        const list = [...values];
        list.splice(index, 1);

        setValue(list);
        handleUpdateValid(list);
    }, [handleUpdateValid, setValue, values]);

    const handleItemEditSize = useCallback((valueOrEvent, index) => {
        const size = valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent;
        const list = [...values];
        list[index]["size"] = size;
        setValue(list);
        handleUpdateValid(list);
    }, [handleUpdateValid, setValue, values]);

    const handleItemEditCount = useCallback((valueOrEvent, index) => {

        let count = valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent;
        count = count.replace(/^0+/, '');
        const list = [...values];
        list[index]["count"] = count;

        setValue(list);
        handleUpdateValid(list);
    }, [handleUpdateValid, setValue, values]);


    return (
        <div>
            <BlockHeader text={"Размеры/Кол-во"}/>
            {values.map((item, index) => (
                <div key={index}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Input
                                value={item.size}
                                validationType='sizeClothes'
                                onChange={(e) => {handleItemEditSize(e, index)}}
                                label={"Размер"}
                            />
                            <div style={{width: '3%'}}/>
                            <Input
                                value={item.count}
                                validationType={'numeric'}
                                onChange={(e) => {handleItemEditCount(e, index)}}
                                label={"Кол-во"}
                            />
                        </div>
                        {values.length > 1 && (
                            <div style={{display: 'flex', flex: 1}}>
                                <img
                                    src={deleteIcon}
                                    style={{marginTop: 25, marginLeft: 10, width: 25, height: 25}}
                                    alt=""
                                    onClick={() => handleItemRemove(index)}
                                />
                            </div>
                        )}
                    </div>
                    <DivisionLine height={1}/>
                    {values.length - 1 === index && <Button onClick={handleItemAdd}>Добавить еще</Button>}
                </div>
            ))}
        </div>
    );
};

export default CompositionClothesOrder;