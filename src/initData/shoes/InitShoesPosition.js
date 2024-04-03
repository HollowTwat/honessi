import {
    initArticlePrice
} from "../articlePrice/InitArticlePrice";
import {
    initPermissiveDocumentation
} from "../permissiveDocumentation/InitPermissiveDocumentation";
import {
    initWithBoxData
} from "./InitWithBoxData";
import {
    initCompositionShoesOrder
} from "./InitCompositionShoesOrder";

export const initShoesPosition = {
    total: '',
    trademark: '',
    article: '',
    shoesType: '',
    color: '',
    withBox: false,
    withBoxData: initWithBoxData,
    position: initCompositionShoesOrder,
    upperMaterial: '',
    liningMaterial: '',
    bottomMaterial: '',
    sex: '',
    country: '',
    hsCode: '',
    articlePrice: false,
    articlePriceData: initArticlePrice,
    permissiveDocumentation: false,
    permissiveDocumentationData: initPermissiveDocumentation,
}

export const initShoesPositionValid = {
    trademark: false,
    article: false,
    shoesType: false,
    color: false,
    withBoxData: false,
    position: false,
    upperMaterial: false,
    liningMaterial: false,
    bottomMaterial: false,
    sex: false,
    country: false,
    hsCode: false,
    articlePriceData: false,
    permissiveDocumentationData: false,
}