import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { fetchProduct } from "../redux/thunks/productThunk";
import { addToCart } from "../redux/actions/shoppingCartActions";
import { toggleFavorite } from "../redux/actions/favoriteActions";

export default function Product() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const requestedProductId = useRef(null);

    const { product, fetchState } = useSelector(
        (state) => state.product
    );

    const favorites = useSelector(
        (state) => state.favorite?.favorites || []
    );

    const {
        productId,
        categoryName,
        gender,
        categoryId,
    } = useParams();

    useEffect(() => {
        if (
            !productId ||
            requestedProductId.current === productId
        ) {
            return;
        }

        requestedProductId.current = productId;

        dispatch(fetchProduct(productId));
    }, [dispatch, productId]);

    const isFavorite = Boolean(
        product &&
        favorites.some(
            (favorite) => favorite.id === product.id
        )
    );

    const backUrl =
        gender && categoryName && categoryId
            ? `/shop/${gender}/${categoryName}/${categoryId}`
            : "/shop";

    const handleAddToCart = () => {
        if (!product) {
            return;
        }

        dispatch(addToCart(product));
    };

    const handleFavorite = () => {
        if (!product) {
            return;
        }

        dispatch(toggleFavorite(product));
    };

    if (fetchState === "FETCHING") {
        return (
            <div className="flex min-h-[600px] items-center justify-center">
                <div
                    className="h-12 w-12 animate-spin rounded-full border-4 border-[#e5e5e5] border-t-[#23a6f0]"
                    aria-label={t("product.loading")}
                />
            </div>
        );
    }

    if (fetchState === "FAILED") {
        return (
            <div className="flex min-h-[600px] flex-col items-center justify-center gap-6">
                <p className="text-red-500">
                    {t("product.loadError")}
                </p>

                <Link
                    to={backUrl}
                    className="bg-[#23a6f0] px-6 py-3 text-sm font-bold text-white"
                >
                    {t("product.backToShop")}
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

    const price = Number(
        product?.discountedPrice ??
        product?.price ??
        0
    );

    const stock = Number(product.stock ?? 0);

    return (
        <main className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">
            <div className="mx-auto max-w-[1050px]">
                <Link
                    to={backUrl}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#737373] hover:text-[#23a6f0]"
                >
                    <ArrowLeft size={18} />
                    {t("product.backToShop")}
                </Link>

                <div className="grid gap-10 md:grid-cols-2">
                    <div className="overflow-hidden bg-[#f5f5f5]">
                        <img
                            src={image}
                            alt={product.name || t("product.title")}
                            className="h-full max-h-[650px] w-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#23a6f0]">
                            {t("product.label")}
                        </p>

                        <h1 className="mb-5 text-3xl font-bold leading-tight">
                            {product.name}
                        </h1>

                        <p className="mb-6 text-xl font-bold text-[#23856d]">
                            {price.toFixed(2)} ₺
                        </p>

                        <p className="mb-8 text-sm leading-6 text-[#737373]">
                            {product.description}
                        </p>

                        <div className="mb-8 grid grid-cols-2 gap-4 border-y border-[#eeeeee] py-6">
                            <div>
                                <p className="mb-1 text-xs text-[#737373]">
                                    {t("product.rating")}
                                </p>

                                <p className="font-bold">
                                    ⭐{" "}
                                    {Number(
                                        product.rating ?? 0
                                    ).toFixed(1)}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs text-[#737373]">
                                    {t("product.stock")}
                                </p>

                                <p className="font-bold">
                                    {product.stock}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs text-[#737373]">
                                    {t("product.sold")}
                                </p>

                                <p className="font-bold">
                                    {product.sell_count}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs text-[#737373]">
                                    {t("product.categoryId")}
                                </p>

                                <p className="font-bold">
                                    {product.category_id}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={stock <= 0}
                                className="flex flex-1 items-center justify-center gap-2 bg-[#23a6f0] px-5 py-4 text-sm font-bold text-white transition-colors hover:bg-[#1d91d0] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ShoppingCart size={18} />

                                {stock <= 0
                                    ? t("product.outOfStock")
                                    : t("product.addToCart")}
                            </button>

                            <button
                                type="button"
                                onClick={handleFavorite}
                                aria-label={
                                    isFavorite
                                        ? t("product.removeFavorite")
                                        : t("product.addFavorite")
                                }
                                className={`flex h-[54px] w-[54px] items-center justify-center border transition-all hover:scale-105 ${isFavorite
                                        ? "border-red-500 text-red-500"
                                        : "border-[#eeeeee] text-[#737373]"
                                    }`}
                            >
                                <Heart
                                    size={21}
                                    fill={
                                        isFavorite
                                            ? "currentColor"
                                            : "none"
                                    }
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}