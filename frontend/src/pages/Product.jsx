import { useEffect } from "react";
import {
    Link,
    useParams,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProduct } from "../redux/thunks/productThunk";

export default function Product() {
    const dispatch = useDispatch();

    const {
        product,
        fetchState,
    } = useSelector(
        (state) => state.product
    );

    const {
        productId,
        categoryName,
        gender,
        categoryId,
    } = useParams();

    useEffect(() => {
        if (productId) {
            dispatch(
                fetchProduct(productId)
            );
        }
    }, [dispatch, productId]);

    const backUrl = `/shop/${gender}/${categoryName}/${categoryId}`;

    if (fetchState === "FETCHING") {
        return (
            <div className="flex min-h-[600px] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e5e5e5] border-t-[#23a6f0]" />
            </div>
        );
    }

    if (fetchState === "FAILED") {
        return (
            <div className="flex min-h-[600px] flex-col items-center justify-center gap-6">
                <p className="text-red-500">
                    Product could not be loaded.
                </p>

                <Link
                    to={backUrl}
                    className="bg-[#23a6f0] px-6 py-3 text-sm font-bold text-white"
                >
                    Back to Shop
                </Link>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    const image =
        product?.images?.[0]?.url ||
        "https://via.placeholder.com/600x700?text=No+Image";

    return (
        <div className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">

            <div className="mx-auto max-w-[1050px]">

                {/* BACK BUTTON */}
                <Link
                    to={backUrl}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#737373] transition-colors hover:text-[#23a6f0]"
                >
                    <ArrowLeft size={18} />
                    Back to Shop
                </Link>

                {/* PRODUCT DETAIL */}
                <div className="grid gap-10 md:grid-cols-2">

                    {/* IMAGE */}
                    <div className="overflow-hidden bg-[#f5f5f5]">
                        <img
                            src={image}
                            alt={product.name}
                            className="h-full max-h-[650px] w-full object-cover"
                        />
                    </div>

                    {/* INFO */}
                    <div className="flex flex-col justify-center">

                        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#23a6f0]">
                            {gender === "k"
                                ? "Kadın"
                                : gender === "e"
                                    ? "Erkek"
                                    : ""}
                        </p>

                        <h1 className="mb-5 text-3xl font-bold leading-tight">
                            {product.name}
                        </h1>

                        <p className="mb-6 text-xl font-bold text-[#23856d]">
                            {Number(
                                product.price
                            ).toFixed(2)}{" "}
                            ₺
                        </p>

                        <p className="mb-8 text-sm leading-6 text-[#737373]">
                            {product.description}
                        </p>

                        <div className="mb-8 grid grid-cols-2 gap-4 border-y border-[#eeeeee] py-6">

                            <div>
                                <p className="mb-1 text-xs text-[#737373]">
                                    Rating
                                </p>

                                <p className="font-bold">
                                    ⭐{" "}
                                    {Number(
                                        product.rating
                                    ).toFixed(1)}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs text-[#737373]">
                                    Stock
                                </p>

                                <p className="font-bold">
                                    {product.stock}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs text-[#737373]">
                                    Sold
                                </p>

                                <p className="font-bold">
                                    {product.sell_count}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs text-[#737373]">
                                    Category ID
                                </p>

                                <p className="font-bold">
                                    {product.category_id}
                                </p>
                            </div>

                        </div>

                        <button
                            type="button"
                            className="w-full bg-[#23a6f0] px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#1d91d0]"
                        >
                            ADD TO CART
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}
