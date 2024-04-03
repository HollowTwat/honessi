import {
    initCompositionUnderwearOrder
} from "./InitCompositionUnderwearOrder";
import {
    initArticlePrice
} from "../articlePrice/InitArticlePrice";
import {
    initPermissiveDocumentation
} from "../permissiveDocumentation/InitPermissiveDocumentation";

export const initUnderwearPosition = {
    trademark: '',
    article: '',
    underwearType: '',
    color: '',
    set: false,
    setData: '',
    total: '',
    position: initCompositionUnderwearOrder,
    materials: '',
    textileType: '',
    composition: '',
    consumerAge: '',
    country: '',
    hsCode: '',
    articlePrice: false,
    articlePriceData: initArticlePrice,
    permissiveDocumentation: false,
    permissiveDocumentationData: initPermissiveDocumentation,
}

export const initUnderwearPositionValid = {
    trademark: false,
    article: false,
    underwearType: false,
    color: false,
    setData: '',
    position: false,
    textileType: false,
    composition: false,
    consumerAge: false,
    country: false,
    hsCode: false,
    articlePriceData: false,
    permissiveDocumentationData: false,
}