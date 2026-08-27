import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchProduct } from "../redux/thunks/productThunk";

export default function ProductDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productId } = useParams();

    const {
        product,
        fetchState,
    } = useSelector((state) => state.product);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProduct(productId));
        }
    }, [dispatch, productId]);

    if (fetchState === "FETCHING") {
        return (
            <div className="flex min-h-[600px] items-center justify-center bg-white">
                <div
                    className="h-12 w-12 animate-spin rounded-full border-4 border-[#e5e5e5] border-t-[#23a6f0]"
                    aria-label="Loading"
                />
            </div>
        );
    }

    if (fetchState === "FAILED") {
        return (
            <div className="flex min-h-[600px] flex-col items-center justify-center gap-6 bg-white px-6 text-center">
                <p className="text-lg font-bold text-red-500">
                    Product could not be loaded.
                </p>

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="cursor-pointer bg-[#23a6f0] px-6 py-3 text-sm font-bold text-white hover:bg-[#168bd0]"
                >
                    Go Back
                </button>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    const image =
        product.images?.[0]?.url ||
        "https://via.placeholder.com/600x700?text=No+Image";

    return (
        <div className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">
            <div className="mx-auto max-w-[1050px]">

                {/* BACK BUTTON */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-10 cursor-pointer text-sm font-bold text-[#23a6f0] hover:opacity-70"
                >
                    ← Back
                </button>

                <div className="grid gap-12 md:grid-cols-2">

                    {/* PRODUCT IMAGE */}
                    <div className="overflow-hidden bg-[#f5f5f5]">
                        <img
                            src={image}
                            alt={product.name}
                            className="h-full max-h-[650px] w-full object-cover"
                        />
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="flex flex-col justify-center">

                        <p className="mb-3 text-sm font-bold uppercase text-[#23a6f0]">
                            Product Detail
                        </p>

                        <h1 className="mb-5 text-[30px] font-bold leading-10 md:text-[40px]">
                            {product.name}
                        </h1>

                        <div className="mb-6 flex items-center gap-4">
                            <span className="text-[24px] font-bold text-[#23856d]">
                                {Number(product.price).toFixed(2)} ₺
                            </span>

                            <span className="text-sm text-[#737373]">
                                ★{" "}
                                {Number(product.rating).toFixed(1)}
                            </span>
                        </div>

                        <p className="mb-8 text-[15px] leading-7 text-[#737373]">
                            {product.description}
                        </p>

                        <div className="mb-8 grid grid-cols-2 gap-4">

                            <div className="border border-[#eeeeee] p-4">
                                <p className="mb-1 text-xs text-[#737373]">
                                    Stock
                                </p>

                                <p className="font-bold">
                                    {product.stock}
                                </p>
                            </div>

                            <div className="border border-[#eeeeee] p-4">
                                <p className="mb-1 text-xs text-[#737373]">
                                    Sold
                                </p>

                                <p className="font-bold">
                                    {product.sell_count}
                                </p>
                            </div>

                        </div>

                        <button
                            type="button"
                            className="cursor-pointer bg-[#23a6f0] px-8 py-4 text-sm font-bold text-white hover:bg-[#168bd0]"
                        >
                            ADD TO CART
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}
