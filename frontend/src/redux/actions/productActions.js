export const setProduct = (product) => ({
    type: "PRODUCT_SET_PRODUCT",
    payload: product,
});

export const setCategories = (categories) => ({
    type: "PRODUCT_SET_CATEGORIES",
    payload: categories,
});

export const setProductList = (productList) => ({
    type: "PRODUCT_SET_PRODUCT_LIST",
    payload: productList,
});

export const setTotal = (total) => ({
    type: "PRODUCT_SET_TOTAL",
    payload: total,
});

export const setFetchState = (fetchState) => ({
    type: "PRODUCT_SET_FETCH_STATE",
    payload: fetchState,
});

export const setLimit = (limit) => ({
    type: "PRODUCT_SET_LIMIT",
    payload: limit,
});

export const setOffset = (offset) => ({
    type: "PRODUCT_SET_OFFSET",
    payload: offset,
});

export const setFilter = (filter) => ({
    type: "PRODUCT_SET_FILTER",
    payload: filter,
});

export const setSort = (sort) => ({
    type: "PRODUCT_SET_SORT",
    payload: sort,
});

export const setCategory = (category) => ({
    type: "PRODUCT_SET_CATEGORY",
    payload: category,
});
