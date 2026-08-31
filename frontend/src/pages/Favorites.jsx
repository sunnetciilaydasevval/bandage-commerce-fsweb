import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";

export default function Favorites() {
    const favorites = useSelector(
        (state) =>
            state.favorite?.favorites || []
    );

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
                    <div className="flex flex-wrap justify-center gap-4">

                        {favorites.map(
                            (product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            )
                        )}

                    </div>
                )}

            </div>

        </div>
    );
}
