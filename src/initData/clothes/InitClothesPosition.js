import {
    initArticlePrice
} from "../articlePrice/InitArticlePrice";
import {
    initPermissiveDocumentation
} from "../permissiveDocumentation/InitPermissiveDocumentation";
import {
    initCompositionClothesOrder
} from "./InitCompositionClothesOrder";

export const initClothesPosition = {
    total: '',
    trademark: '',
    article: '',
    clothesType: '',
    color: '',
    position: initCompositionClothesOrder,
    materials: [],
    userMaterials: [],
    sex: '',
    country: '',
    hsCode: '',
    articlePrice: false,
    articlePriceData: initArticlePrice,
    permissiveDocumentation: false,
    permissiveDocumentationData: initPermissiveDocumentation,
}

export const initClothesPositionValid = {
    trademark: false,
    article: false,
    clothesType: false,
    color: false,
    position: false,
    materials: false,
    sex: false,
    country: false,
    hsCode: false,
    articlePriceData: true,
    permissiveDocumentationData: false,
}
