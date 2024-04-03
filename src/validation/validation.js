const validationPatterns = {
    numeric: /^[0-9]+$/,
    withBox: /^([1-9]|1[0-2])$/,
    floatNumeric: /^\d+([.,]\d+)?([eE][-+]?\d+)?$/,
    inn: /^(?:\d{10}|\d{12})$/,
    sizeShoes: /^((1[6-9]|2[0-9]|3[0-9]|4[0-9]|5[0-6])|(\d+(\.\d+)?)-(\d+(\.\d+)?)|(\d+(\.\d+)?))$/,
    sizeClothes: /^(XXS|XS|S|M|L|XL|XXL|ONE SIZE|1[2-9]|[2-6][0-9]|7[0-4]|(1[2-9]|[2-6][0-9]|7[0-4])-(1[2-9]|[2-6][0-9]|7[0-4]))$/,
};

export const validateError = {
    'inn': 'ИНН должен состоять из 10 или 12 цифр',
    'numeric': 'Значение должно быть целым числом',
    'withBox': 'Значение не должно быть больше 12',
    'floatNumeric': 'Значение должно быть числом',
    'sizeShoes': 'Число должно быть от 16 до 56.5 с шагом 0.5',
    'sizeClothes': 'Число от 12 до 74 с шагом 2\n или в виде число-число или в виде международного значения, например, XXS'
}

export function validate(value, validationType) {

    if (value === '') {
        return false;
    }

    if (validationType === 'hsCode') {
        return value.length >= 10 && isNaN(value) === false;
    }

    if (validationType in validationPatterns) {
        const pattern = validationPatterns[validationType];
        return pattern.test(value);
    }

    return true;
}

export function validShoesPosition(position) {
    return (
        position.total !== '' &&
        position.trademark !== '' &&
        position.article !== '' &&
        position.shoesType !== '' &&
        position.color !== '' &&
        position.position.length > 0 &&
        position.upperMaterial !== '' &&
        position.liningMaterial !== '' &&
        position.bottomMaterial !== '' &&
        position.sex !== '' &&
        position.country !== '' &&
        position.hsCode !== '' &&
        ((position.withBox && Object.keys(position.withBoxData).length > 0) || !(position.withBox)) &&
        ((position.articlePrice && Object.keys(position.articlePriceData).length > 0) || !(position.articlePrice)) &&
        ((position.permissiveDocumentation && Object.keys(position.permissiveDocumentationData).length > 0) || !(position.permissiveDocumentation))
    );
}

export function validArticlePrice(data) {
    return !isNaN(parseFloat(data.price)) && data.nds !== '';
}

export function validPermissiveDocumentation(data) {
    return data.documentationsType !== '' && data.nameDoc !== '' && data.date !== ''
}

export function validWithBox(data) {
    return !isNaN(Number(data.countBox)) && data.countBox !== ''
}

export function validNumberSet(data) {
    return !isNaN(Number(data.count)) && data.count !== ''
}

export function validOrder(data) {
    return data.organization.inn !== '' && data.positions.length > 0
}