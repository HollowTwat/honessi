import React, {useEffect, useState} from "react";
import CustomSelect from "../UI/CustomSelect"
import Input from "../UI/Input";
import BlockHeader from "../UI/Headers/BlockHeader";
import {entity} from "../../constants/oraganization/Entity";
import {edoType} from "../../constants/oraganization/EdoType";
import ImageSelect from "../UI/ImageSelect";
import {labelType} from "../../constants/oraganization/LabelType";
import useFetchOrganizationData from "../../hooks/useOrganizationInfo";
import {validate} from "../../validation/validation";

const Organization = ({data, onChange = () => {} }) => {

    const [organizationData, setOrganizationData] = useState(data)
    const {handleOrganizationInfo} = useFetchOrganizationData();

    useEffect(() => {

        onChange(organizationData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organizationData])

    const handleUpdateData = (valueOrEvent, name) => {

        const value = valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent;

        const copyData = organizationData;
        copyData[name] = value;

        setOrganizationData(copyData);
        onChange(copyData);
    }

    const handleGetInfo = async (valueOrEvent) => {

        const inn = valueOrEvent.target ? valueOrEvent.target.value : valueOrEvent;

        if (validate(inn, 'inn')) {
            const {name, entity} = await handleOrganizationInfo(inn)

            handleUpdateData(inn, 'inn')
            handleUpdateData(name, 'name')
            handleUpdateData(entity, 'entity')
        } else {
            handleUpdateData(inn, 'inn')
        }
    };

    return (
        <div>
            <BlockHeader text={"Организация"}/>
            <div style={{color: 'gray'}}>
                Необходимо первым заполнить поле "ИНН". <br/>
                Поля "Наименование" и "Юридическое лицо" заполнятся автоматически при наличии данных в базе.
                Если они не будут найдены, то необходимо заполнить вручную.
            </div>
            <Input
                label={"ИНН"}
                value={organizationData.inn}
                validationType='inn'
                onChange={(e) => {handleGetInfo(e)}}
            />
            <CustomSelect
                label={"Юридическое лицо"}
                options={entity}
                value={organizationData.entity}
                onChange={(e) => handleUpdateData(e, 'entity')}
            />
            <Input
                label={"Наименование"}
                value={organizationData.name}
                onChange={(e) => handleUpdateData(e, 'name')}
            />
            <CustomSelect
                label={"ЭДО"}
                options={edoType}
                value={organizationData.edoType}
                onChange={(e) => handleUpdateData(e, 'edoType')}
            />
            <ImageSelect
                placeholder={"Вид этикетки"}
                value={organizationData.labelType}
                images={labelType}
                onChange={(e) => handleUpdateData(e, 'labelType')}
            />
        </div>
    );
};

export default Organization;