import {
    useState
} from 'react';

const useFetchOrganizationData = () => {

    const [error, setError] = useState(null);
    const {
        REACT_APP_API_KEY
    } = process.env;


    const extractEntityAndName = (rawName) => {
        let cleanedName = rawName.replace(/"/g, '').trim();

        const entityTypeMatch = cleanedName.match(/^(АО|ИП|ООО)/);
        let entityType = entityTypeMatch ? entityTypeMatch[0] : null;
        let name = entityType ? cleanedName.substring(entityType.length).trim() : cleanedName;

        return {
            entity: entityType,
            name: name
        };
    };

    const getData = async (inn) => {

        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";

        try {
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${"Token " + REACT_APP_API_KEY}`
                },
                body: JSON.stringify({
                    query: inn
                })
            });

            const data = await response.json();
            const {
                entity,
                name
            } = extractEntityAndName(data.suggestions[0]['value'])

            return {
                entity,
                name
            }
        } catch (error) {
            setError(error);
            return {
                entity: '',
                name: ''
            }
        }
    }

    const handleOrganizationInfo = async (inn) => {
        return getData(inn)
    };

    return {
        handleOrganizationInfo,
        error
    };
};

export default useFetchOrganizationData;