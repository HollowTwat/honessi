import {
    initArticlePrice
} from "../articlePrice/InitArticlePrice";
import {
    initPermissiveDocumentation
} from "../permissiveDocumentation/InitPermissiveDocumentation";

export const initPerfumePosition = {
    trademark: '',
    volume: '',
    measurementUnit: '',
    packagingType: '',
    packagingMaterial: '',
    perfumeType: '',
    set: false,
    setData: {
        count: ''
    },
    total: '',
    country: '',
    hsCode: '',
    articlePrice: false,
    articlePriceData: initArticlePrice,
    permissiveDocumentation: false,
    permissiveDocumentationData: initPermissiveDocumentation,
}

export const initPerfumePositionValid = {
    trademark: false,
    volume: false,
    measurementUnit: false,
    packagingType: false,
    packagingMaterial: false,
    perfumeType: false,
    setData: true,
    total: false,
    country: false,
    hsCode: false,
    articlePriceData: true,
    permissiveDocumentationData: false
}
