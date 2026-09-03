import { useEffect } from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import {
    useParams,
    useSearchParams,
} from "react-router-dom";

import ProductCard from "../components/ProductCard";
import {
    fetchProducts,
} from "../redux/thunks/productThunk";

function createSlug(value = "") {
    return value
        .toLocaleLowerCase("tr-TR")
        .replace(/ı/g, "i")
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export default function Shop() {
    const dispatch = useDispatch();

    const {
        gender,
        categoryName,
        categoryId,
    } = useParams();

    const [
        searchParams,
        setSearchParams,
    ] = useSearchParams();

    const {
        productList,
        total,
        fetchState,
    } = useSelector(
        (state) => state.product
    );

    const filter = searchParams.get("filter") || "";
    const sort = searchParams.get("sort") || "";
    const currentPage = Number(searchParams.get("page")) || 1;

    const limit = 25;

    const category = categoryId
        ? Number(categoryId)
        : undefined;

    const offset =
        (currentPage - 1) * limit;

    const totalPages = Math.ceil(
        total / limit
    );

    /*
     * Category / filter / sort / page
     * değiştiğinde ürünleri tekrar çek.
     */
    useEffect(() => {
        dispatch(
            fetchProducts({
                category,
                filter,
                sort,
                limit,
                offset,
            })
        );
    }, [
        dispatch,
        category,
        filter,
        sort,
        limit,
        offset,
    ]);

    const handleFilterChange = (
        event
    ) => {
        const value =
            event.target.value;

        const params =
            new URLSearchParams(
                searchParams
            );

        if (value) {
            params.set(
                "filter",
                value
            );
        } else {
            params.delete("filter");
        }

        params.delete("page");

        setSearchParams(params);
    };

    const handleSortChange = (
        event
    ) => {
        const value =
            event.target.value;

        const params =
            new URLSearchParams(
                searchParams
            );

        if (value) {
            params.set(
                "sort",
                value
            );
        } else {
            params.delete("sort");
        }

        params.delete("page");

        setSearchParams(params);
    };

    const handlePageChange = (
        page
    ) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        const params =
            new URLSearchParams(
                searchParams
            );

        if (page === 1) {
            params.delete("page");
        } else {
            params.set(
                "page",
                String(page)
            );
        }

        setSearchParams(params);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(
            1,
            currentPage - 2
        );

        let endPage = Math.min(
            totalPages,
            startPage +
            maxVisiblePages -
            1
        );

        if (
            endPage - startPage <
            maxVisiblePages - 1
        ) {
            startPage = Math.max(
                1,
                endPage -
                maxVisiblePages +
                1
            );
        }

        for (
            let page = startPage;
            page <= endPage;
            page++
        ) {
            pages.push(page);
        }

        return pages;
    };

    return (
        <div className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">

            <div className="mx-auto max-w-[1050px]">

                {/* HEADER */}
                <div className="mb-10 text-center">

                    <h1 className="mb-3 text-[24px] font-bold">
                        SHOP
                    </h1>

                    <p className="text-sm text-[#737373]">
                        Explore our products
                    </p>

                </div>

                {/* FILTER / SORT */}
                <div className="mb-10 flex flex-col gap-4 border-y border-[#ececec] py-6 md:flex-row md:items-center md:justify-between">

                    <p className="text-sm font-bold text-[#737373]">
                        Showing{" "}
                        {productList.length}{" "}
                        of{" "}
                        {total} results
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">

                        <input
                            type="text"
                            value={filter}
                            onChange={
                                handleFilterChange
                            }
                            placeholder="Search products..."
                            className="border border-[#ececec] px-4 py-3 text-sm outline-none focus:border-[#23a6f0]"
                        />

                        <select
                            value={sort}
                            onChange={
                                handleSortChange
                            }
                            className="border border-[#ececec] bg-white px-4 py-3 text-sm outline-none focus:border-[#23a6f0]"
                        >
                            <option value="">
                                Sort
                            </option>

                            <option value="price:asc">
                                Price: Low to High
                            </option>

                            <option value="price:desc">
                                Price: High to Low
                            </option>

                            <option value="rating:asc">
                                Rating: Low to High
                            </option>

                            <option value="rating:desc">
                                Rating: High to Low
                            </option>
                        </select>

                    </div>

                </div>

                {/* LOADING */}
                {fetchState ===
                    "FETCHING" && (
                        <div className="flex min-h-[300px] items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e5e5e5] border-t-[#23a6f0]" />
                        </div>
                    )}

                {/* ERROR */}
                {fetchState ===
                    "FAILED" && (
                        <div className="flex flex-col items-center gap-4 py-20 text-center text-red-500">
                            <p>Products could not be loaded.</p>
                            <button
                                type="button"
                                onClick={() => dispatch(fetchProducts({ category, filter, sort, limit, offset }))}
                                className="bg-[#23a6f0] px-5 py-3 text-sm font-bold text-white"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                {/* PRODUCTS */}
                {fetchState !==
                    "FETCHING" &&
                    fetchState !==
                    "FAILED" && (
                        <>
                            {productList.length ===
                                0 ? (
                                <div className="py-20 text-center text-[#737373]">
                                    No products found.
                                </div>
                            ) : (
                                <div className="flex flex-wrap justify-center gap-4">

                                    {productList.map(
                                        (product) => {
                                            const productSlug =
                                                createSlug(
                                                    product.name
                                                );

                                            const productUrl =
                                                categoryId
                                                    ? `/shop/${gender}/${categoryName}/${categoryId}/${productSlug}/${product.id}`
                                                    : `/product/${productSlug}/${product.id}`;

                                            return (
                                                <ProductCard
                                                    key={
                                                        product.id
                                                    }
                                                    product={
                                                        product
                                                    }
                                                    productUrl={
                                                        productUrl
                                                    }
                                                />
                                            );
                                        }
                                    )}

                                </div>
                            )}
                        </>
                    )}

                {/* PAGINATION */}
                {totalPages > 1 &&
                    fetchState !==
                    "FETCHING" && (
                        <div className="flex justify-center pt-12">

                            <div className="flex overflow-x-auto border border-[#ececec] text-xs">

                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(
                                            1
                                        )
                                    }
                                    disabled={
                                        currentPage ===
                                        1
                                    }
                                    className={`px-4 py-3 ${currentPage ===
                                            1
                                            ? "cursor-not-allowed text-[#bdbdbd]"
                                            : "text-[#23a6f0] hover:bg-[#f5f5f5]"
                                        }`}
                                >
                                    First
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage -
                                            1
                                        )
                                    }
                                    disabled={
                                        currentPage ===
                                        1
                                    }
                                    className={`px-4 py-3 ${currentPage ===
                                            1
                                            ? "cursor-not-allowed text-[#bdbdbd]"
                                            : "text-[#23a6f0] hover:bg-[#f5f5f5]"
                                        }`}
                                >
                                    Previous
                                </button>

                                {getPageNumbers().map(
                                    (page) => (
                                        <button
                                            key={
                                                page
                                            }
                                            type="button"
                                            onClick={() =>
                                                handlePageChange(
                                                    page
                                                )
                                            }
                                            className={`px-4 py-3 ${page ===
                                                    currentPage
                                                    ? "bg-[#23a6f0] font-bold text-white"
                                                    : "text-[#252b42] hover:bg-[#f5f5f5]"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage +
                                            1
                                        )
                                    }
                                    disabled={
                                        currentPage ===
                                        totalPages
                                    }
                                    className={`px-4 py-3 ${currentPage ===
                                            totalPages
                                            ? "cursor-not-allowed text-[#bdbdbd]"
                                            : "text-[#23a6f0] hover:bg-[#f5f5f5]"
                                        }`}
                                >
                                    Next
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(
                                            totalPages
                                        )
                                    }
                                    disabled={
                                        currentPage ===
                                        totalPages
                                    }
                                    className={`px-4 py-3 ${currentPage ===
                                            totalPages
                                            ? "cursor-not-allowed text-[#bdbdbd]"
                                            : "text-[#23a6f0] hover:bg-[#f5f5f5]"
                                        }`}
                                >
                                    Last
                                </button>

                            </div>

                        </div>
                    )}

            </div>

        </div>
    );
}
