import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
    removeFavorite,
} from "../redux/actions/favoriteActions";

import {
    addToCart,
} from "../redux/actions/shoppingCartActions";

export default function Favorites() {
    const dispatch = useDispatch();

    const favorites = useSelector(
        (state) =>
            state.favorite?.favorites || []
    );

    const handleRemove = (productId) => {
        dispatch(removeFavorite(productId));
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">

            <div className="mx-auto max-w-[1050px]">

                {/* HEADER */}
                <div className="mb-12 text-center">

                    <div className="mb-4 flex justify-center">
                        <Heart
                            size={36}
                            className="text-red-500"
                            fill="currentColor"
                        />
                    </div>

                    <h1 className="mb-3 text-[24px] font-bold">
                        FAVORITES
                    </h1>

                    <p className="text-sm text-[#737373]">
                        Your favorite products
                    </p>

                </div>

                {/* EMPTY */}
                {favorites.length === 0 ? (
                    <div className="flex min-h-[350px] flex-col items-center justify-center">

                        <Heart
                            size={55}
                            className="mb-5 text-[#d5d5d5]"
                        />

                        <h2 className="mb-2 text-xl font-bold">
                            Your favorites are empty
                        </h2>

                        <p className="mb-6 text-sm text-[#737373]">
                            Add products to your favorites
                            to see them here.
                        </p>

                        <Link
                            to="/shop"
                            className="bg-[#23a6f0] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1d91d0]"
                        >
                            GO TO SHOP
                        </Link>

                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                        {favorites.map(
                            (product) => {
                                const image =
                                    product?.images?.[0]?.url ||
                                    "https://via.placeholder.com/300x365?text=No+Image";

                                return (
                                    <div
                                        key={
                                            product.id
                                        }
                                        className="overflow-hidden border border-[#eeeeee] bg-white"
                                    >

                                        <Link
                                            to={`/product/${product.id}`}
                                            className="block overflow-hidden"
                                        >
                                            <img
                                                src={
                                                    image
                                                }
                                                alt={
                                                    product.name
                                                }
                                                className="aspect-[0.82] w-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </Link>

                                        <div className="p-5">

                                            <Link
                                                to={`/product/${product.id}`}
                                                className="mb-2 block text-sm font-bold text-[#252b42] hover:text-[#23a6f0]"
                                            >
                                                {
                                                    product.name
                                                }
                                            </Link>

                                            <p className="mb-4 line-clamp-2 text-xs leading-5 text-[#737373]">
                                                {
                                                    product.description
                                                }
                                            </p>

                                            <p className="mb-5 text-sm font-bold text-[#23856d]">
                                                {Number(
                                                    product.price
                                                ).toFixed(
                                                    2
                                                )}{" "}
                                                ₺
                                            </p>

                                            <div className="flex gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            product
                                                        )
                                                    }
                                                    className="flex flex-1 items-center justify-center gap-2 bg-[#23a6f0] px-3 py-3 text-xs font-bold text-white hover:bg-[#1d91d0]"
                                                >
                                                    <ShoppingCart
                                                        size={
                                                            16
                                                        }
                                                    />
                                                    ADD TO CART
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemove(
                                                            product.id
                                                        )
                                                    }
                                                    aria-label="Remove from favorites"
                                                    className="flex h-11 w-11 items-center justify-center border border-[#eeeeee] text-red-500 hover:bg-red-50"
                                                >
                                                    <Trash2
                                                        size={
                                                            17
                                                        }
                                                    />
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>
                )}

            </div>
        </div>
    );
}
