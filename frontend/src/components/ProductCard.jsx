import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    Heart,
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { toggleFavorite } from "../redux/actions/favoriteActions";

import {
    addToCart,
    increaseCartItem,
    decreaseCartItem,
    removeFromCart,
} from "../redux/actions/shoppingCartActions";

export default function ProductCard({
    product,
    productUrl,
}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const favorites = useSelector(
        (state) =>
            state.favorite?.favorites || []
    );

    const cart = useSelector(
        (state) =>
            state.shoppingCart?.cart || []
    );

    const isFavorite = favorites.some(
        (favorite) =>
            favorite.id === product.id
    );

    const cartItem = cart.find(
        (item) =>
            item.product.id === product.id
    );

    const cartCount = cartItem?.count || 0;

    const image =
        product?.images?.[0]?.url ||
        "https://via.placeholder.com/300x365?text=No+Image";

    const handleFavorite = (event) => {
        event.preventDefault();
        event.stopPropagation();

        dispatch(toggleFavorite(product));
    };

    const handleAddToCart = (event) => {
        event.preventDefault();
        event.stopPropagation();

        dispatch(addToCart(product));
    };

    const handleIncrease = (event) => {
        event.preventDefault();
        event.stopPropagation();

        dispatch(increaseCartItem(product.id));
    };

    const handleDecrease = (event) => {
        event.preventDefault();
        event.stopPropagation();

        dispatch(decreaseCartItem(product.id));
    };

    const handleRemove = (event) => {
        event.preventDefault();
        event.stopPropagation();

        dispatch(removeFromCart(product.id));
    };

    return (
        <article className="flex w-full max-w-[239px] flex-col overflow-hidden bg-white">

            {/* IMAGE */}
            <div className="relative overflow-hidden">

                <Link
                    to={
                        productUrl ||
                        `/product/product/${product.id}`
                    }
                    className="block"
                >
                    <img
                        src={image}
                        alt={product.name}
                        className="aspect-[0.82] w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </Link>

                {/* FAVORITE */}
                <button
                    type="button"
                    onClick={handleFavorite}
                    aria-label={
                        isFavorite
                            ? t("product.removeFromFavorites")
                            : t("product.addToFavorites")
                    }
                    className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 ${isFavorite
                            ? "text-red-500"
                            : "text-[#737373]"
                        }`}
                >
                    <Heart
                        size={20}
                        fill={
                            isFavorite
                                ? "currentColor"
                                : "none"
                        }
                    />
                </button>

            </div>

            {/* CONTENT */}
            <div className="flex flex-col gap-2 px-5 py-6">

                {/* NAME */}
                <Link
                    to={
                        productUrl ||
                        `/product/product/${product.id}`
                    }
                    className="cursor-pointer text-[14px] font-bold leading-6 tracking-[0.2px] text-[#252b42] transition-colors hover:text-[#23a6f0]"
                >
                    {product.name}
                </Link>

                {/* DESCRIPTION */}
                <p className="line-clamp-2 text-[14px] leading-5 tracking-[0.2px] text-[#737373]">
                    {product.description}
                </p>

                {/* PRICE */}
                <p className="text-[14px] font-bold leading-6 tracking-[0.2px] text-[#23856d]">
                    {Number(product.price).toFixed(2)} ₺
                </p>

                {/* CART */}
                {!cartItem ? (
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="mt-3 flex w-full items-center justify-center gap-2 bg-[#23a6f0] px-3 py-3 text-xs font-bold text-white transition-colors hover:bg-[#1d91d0]"
                    >
                        <ShoppingCart size={16} />

                        {t("product.addToCart")}
                    </button>
                ) : (
                    <div className="mt-3 flex h-11 w-full items-center border border-[#23a6f0]">

                        {/* DECREASE / REMOVE */}
                        <button
                            type="button"
                            onClick={
                                cartCount === 1
                                    ? handleRemove
                                    : handleDecrease
                            }
                            aria-label={
                                cartCount === 1
                                    ? t("product.removeFromCart")
                                    : t("product.decreaseQuantity")
                            }
                            className="flex h-full w-10 items-center justify-center text-[#23a6f0] transition-colors hover:bg-[#f0f9ff]"
                        >
                            {cartCount === 1 ? (
                                <Trash2 size={16} />
                            ) : (
                                <Minus size={16} />
                            )}
                        </button>

                        {/* COUNT */}
                        <div className="flex flex-1 items-center justify-center gap-2 text-xs font-bold text-[#252b42]">
                            <ShoppingCart
                                size={15}
                                className="text-[#23a6f0]"
                            />

                            {cartCount}
                        </div>

                        {/* INCREASE */}
                        <button
                            type="button"
                            onClick={handleIncrease}
                            aria-label={t(
                                "product.increaseQuantity"
                            )}
                            className="flex h-full w-10 items-center justify-center text-[#23a6f0] transition-colors hover:bg-[#f0f9ff]"
                        >
                            <Plus size={16} />
                        </button>

                    </div>
                )}

            </div>

        </article>
    );
}
