export const createPaginationData = (count, page, perPage) => {
        const totalPages = Math.ceil(count / perPage);
        const hasNext = page < totalPages;
        const hasPrevious = page > 1 && page < ((totalPages + 1) || totalPages);
    return {
        totalPages: totalPages,
        hasPreviousPage: hasPrevious,
        hasNextPage: hasNext
    }
}
