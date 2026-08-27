import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/thunks/productThunk";

const LIMIT = 25;

export default function Shop() {
    const dispatch = useDispatch();

    const { categoryId } = useParams();

    const {
        productList,
        total,
        fetchState,
        categories,
    } = useSelector((state) => state.product);

    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const category = categoryId
        ? Number(categoryId)
        : undefined;

    const selectedCategory = categories.find(
        (item) => item.id === category
    );

    const offset = (currentPage - 1) * LIMIT;

    const totalPages = Math.ceil(total / LIMIT);

    /*
     * URL'deki kategori değişirse
     * tekrar ilk sayfaya dön.
     */
    useEffect(() => {
        setCurrentPage(1);
    }, [category]);

    /*
     * Category / filter / sort / pagination
     * değiştiğinde API isteği gönder.
     */
    useEffect(() => {
        dispatch(
            fetchProducts({
                category,
                filter,
                sort,
                limit: LIMIT,
                offset,
            })
        );
    }, [
        dispatch,
        category,
        filter,
        sort,
        offset,
    ]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        setCurrentPage(page);
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
            startPage + maxVisiblePages - 1
        );

        if (
            endPage - startPage <
            maxVisiblePages - 1
        ) {
            startPage = Math.max(
                1,
                endPage - maxVisiblePages + 1
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

                {/* PAGE HEADER */}
                <div className="mb-10 text-center">

                    <h1 className="mb-3 text-[24px] font-bold">
                        {selectedCategory
                            ? selectedCategory.title
                            : "SHOP"}
                    </h1>

                    <p className="text-sm text-[#737373]">
                        {selectedCategory
                            ? `${selectedCategory.gender === "k"
                                ? "Kadın"
                                : "Erkek"
                            } / ${selectedCategory.title}`
                            : "Explore our products"}
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

                        {/* FILTER */}
                        <input
                            type="text"
                            value={filter}
                            onChange={handleFilterChange}
                            placeholder="Search products..."
                            className="border border-[#ececec] px-4 py-3 text-sm outline-none focus:border-[#23a6f0]"
                        />

                        {/* SORT */}
                        <select
                            value={sort}
                            onChange={handleSortChange}
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
                {fetchState === "FETCHING" && (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e5e5e5] border-t-[#23a6f0]" />
                    </div>
                )}

                {/* ERROR */}
                {fetchState === "FAILED" && (
                    <div className="py-20 text-center text-red-500">
                        Products could not be loaded.
                    </div>
                )}

                {/* PRODUCTS */}
                {fetchState !== "FETCHING" &&
                    fetchState !== "FAILED" && (
                        <>
                            {productList.length === 0 ? (
                                <div className="py-20 text-center text-[#737373]">
                                    No products found.
                                </div>
                            ) : (
                                <div className="flex flex-wrap justify-center gap-4">
                                    {productList.map(
                                        (product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={{
                                                    ...product,
                                                    image:
                                                        product.images?.[0]?.url,
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                            )}
                        </>
                    )}

                {/* PAGINATION */}
                {totalPages > 1 &&
                    fetchState !== "FETCHING" && (
                        <div className="flex justify-center pt-12">

                            <div className="flex flex-wrap border border-[#ececec] text-xs">

                                {/* FIRST */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(1)
                                    }
                                    disabled={currentPage === 1}
                                    className={`px-4 py-3 ${currentPage === 1
                                        ? "cursor-not-allowed text-[#bdbdbd]"
                                        : "text-[#23a6f0] hover:bg-[#f5f5f5]"
                                        }`}
                                >
                                    First
                                </button>

                                {/* PREVIOUS */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage - 1
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className={`px-4 py-3 ${currentPage === 1
                                        ? "cursor-not-allowed text-[#bdbdbd]"
                                        : "text-[#23a6f0] hover:bg-[#f5f5f5]"
                                        }`}
                                >
                                    Previous
                                </button>

                                {/* PAGE NUMBERS */}
                                {getPageNumbers().map(
                                    (page) => (
                                        <button
                                            key={page}
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

                                {/* NEXT */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage + 1
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

                                {/* LAST */}
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
