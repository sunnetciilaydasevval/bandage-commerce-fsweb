import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { toggleFavorite } from "../redux/actions/favoriteActions";

export default function ProductCard({
    product,
    productUrl,
}) {
    const dispatch = useDispatch();

    const favorites = useSelector(
        (state) =>
            state.favorite?.favorites || []
    );

    const isFavorite = favorites.some(
        (favorite) =>
            favorite.id === product.id
    );

    const colorClasses = [
        "bg-[#23a6f0]",
        "bg-[#2dc071]",
        "bg-[#e77c40]",
        "bg-[#252b42]",
    ];

    const image =
        product?.images?.[0]?.url ||
        "https://via.placeholder.com/300x365?text=No+Image";

    const handleFavorite = (event) => {
        event.preventDefault();
        event.stopPropagation();

        dispatch(toggleFavorite(product));
    };

    return (
        <article className="flex w-full max-w-[239px] flex-col bg-white">

            {/* IMAGE */}
            <div className="relative overflow-hidden">

                <Link
                    to={
                        productUrl ||
                        `/product/${product.id}`
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
                            ? "Remove from favorites"
                            : "Add to favorites"
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

                <Link
                    to={
                        productUrl ||
                        `/product/${product.id}`
                    }
                    className="cursor-pointer text-[14px] font-bold leading-6 tracking-[0.2px] text-[#252b42] transition-colors hover:text-[#23a6f0]"
                >
                    {product.name}
                </Link>

                <p className="line-clamp-2 text-[14px] leading-5 tracking-[0.2px] text-[#737373]">
                    {product.description}
                </p>

                <p className="text-[14px] font-bold leading-6 tracking-[0.2px] text-[#23856d]">
                    {Number(product.price).toFixed(2)} ₺
                </p>

                <div
                    className="flex gap-1.5 pt-1"
                    aria-label="Available colors"
                >
                    {colorClasses.map(
                        (colorClass) => (
                            <span
                                key={colorClass}
                                className={`h-4 w-4 rounded-full ${colorClass}`}
                            />
                        )
                    )}
                </div>

            </div>

        </article>
    );
}
