import { validationQueryParams } from "../utils/validationQueryParams.js"

export const paginationValidateParams = (query) => {
    const page = validationQueryParams(query.page, 1)
    const perPage = validationQueryParams(query.perPage, 4)
    return {
        page,
        perPage
    }
}
