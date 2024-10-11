
const SORT_ORDER = ['asc', 'desc'];
const SORT_BY_PROPERTIES = ['name']

export const parsingSortParams = (query) => {
    const sortOrder = SORT_ORDER.includes(query.sortOrder)? query.sortOrder : 'asc';
    const sortBy = SORT_BY_PROPERTIES.includes(query.sortOrder)? query.sortBy : 'name';
    return {
        sortOrder,
        sortBy
    }
}
