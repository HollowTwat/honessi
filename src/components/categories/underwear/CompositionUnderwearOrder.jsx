import React, {useCallback} from 'react';
import Input from "../../UI/Input";

import deleteIcon from "../../../images/icons/delete.png";
import Button from "../../UI/Button";
import DivisionLine from "../../UI/DivisionLine";
import {validate} from "../../../validation/validation";
import BlockHeader from "../../UI/Headers/BlockHeader";

const CompositionUnderwearOrder = ({values, setValue, onChangeValid = () => {}}) => {

    const handleUpdateValid = useCallback((list) => {

        let index = 0;
        let isValid = true;

        while (index < list.length && isValid) {
            if (!(validate(list[index]['x'], 'numeric') &&
                validate(list[index]['y'], 'numeric') &&
                validate(list[index]['count'], 'numeric'))
            ) {
                isValid = false;
            }
            index++;
        }

        onChangeValid(isValid)

    }, [onChangeValid])

    const handleItemAdd = useCallback(() => {

        const newValues = [...values, {x: '', y: '', count: ''}];

        setValue(newValues);
        handleUpdateValid(newValues);
    }, [handleUpdateValid, setValue, values]);

    const handleItemRemove = useCallback((index) => {

        const list = [...values];
        list.splice(index, 1);

        setValue(list);
        handleUpdateValid(list);
    }, [handleUpdateValid, setValue, values]);


    const handleItemEdit = useCallback((valueOrEvent, name, index) => {

        let value = valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent;
        value = value.replace(/^0+/, '');
        const list = [...values];
        list[index][name] = value;

        setValue(list);
        handleUpdateValid(list);
    }, [handleUpdateValid, setValue, values]);


    return (
        <div>
            <BlockHeader text={"Размер X*Y/Кол-во"}/>
            {values.map((item, index) => (
                <div key={index}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Input
                                value={item.x}
                                validationType='numeric'
                                onChange={(e) => {handleItemEdit(e, 'x', index)}}
                                label={"X"}
                            />
                            <div style={{width: '3%'}}/>
                            <Input
                                value={item.y}
                                validationType='numeric'
                                onChange={(e) => {handleItemEdit(e, 'y', index)}}
                                label={"Y"}
                            />
                            <div style={{width: '3%'}}/>
                            <Input
                                value={item.count}
                                validationType={'numeric'}
                                onChange={(e) => {handleItemEdit(e, 'count', index)}}
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

export default CompositionUnderwearOrder;