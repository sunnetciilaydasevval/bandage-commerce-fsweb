import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ProductCard from "../components/ProductCard";

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

function createProductUrl(product, category) {
    if (!category) {
        return `/product/${createSlug(product.name)}/${product.id}`;
    }

    const gender =
        category.gender === "k"
            ? "kadin"
            : "erkek";

    const categoryName = createSlug(category.title);
    const productSlug = createSlug(product.name);

    return `/shop/${gender}/${categoryName}/${category.id}/${productSlug}/${product.id}`;
}

export default function Favorites() {
    const { t } = useTranslation();

    const favorites = useSelector(
        (state) => state.favorite?.favorites || []
    );

    const categories = useSelector(
        (state) => state.product.categories || []
    );

    return (
        <div className="min-h-screen bg-white px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">
            <div className="mx-auto max-w-[1050px]">
                <div className="mb-12 text-center">
                    <div className="mb-4 flex justify-center">
                        <Heart
                            size={36}
                            className="text-red-500"
                            fill="currentColor"
                        />
                    </div>

                    <h1 className="mb-3 text-[24px] font-bold">
                        {t("favorites.title")}
                    </h1>

                    <p className="text-sm text-[#737373]">
                        {t("favorites.subtitle")}
                    </p>
                </div>

                {favorites.length === 0 ? (
                    <div className="flex min-h-[350px] flex-col items-center justify-center">
                        <Heart
                            size={55}
                            className="mb-5 text-[#d5d5d5]"
                        />

                        <h2 className="mb-2 text-xl font-bold">
                            {t("favorites.emptyTitle")}
                        </h2>

                        <p className="mb-6 text-sm text-[#737373]">
                            {t("favorites.emptyDescription")}
                        </p>

                        <Link
                            to="/shop"
                            className="bg-[#23a6f0] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1d91d0]"
                        >
                            {t("favorites.goToShop")}
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-4">
                        {favorites.map((product) => {
                            const category = categories.find(
                                (cat) =>
                                    cat.id === product.category_id
                            );

                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    productUrl={createProductUrl(
                                        product,
                                        category
                                    )}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
