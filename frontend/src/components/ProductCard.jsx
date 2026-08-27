import { Link } from "react-router-dom";

function slugify(text) {
    return String(text || "")
        .toLocaleLowerCase("tr-TR")
        .replace(/ı/g, "i")
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function ProductCard({
    product,
    category,
}) {
    const colorClasses = [
        "bg-[#23a6f0]",
        "bg-[#2dc071]",
        "bg-[#e77c40]",
        "bg-[#252b42]",
    ];

    const image =
        product?.images?.[0]?.url ||
        "https://via.placeholder.com/300x365?text=No+Image";

    const productNameSlug = slugify(product?.name);

    const categoryId =
        category?.id || product?.category_id;

    const categoryName = slugify(
        category?.title || "category"
    );

    const gender =
        category?.gender === "e"
            ? "erkek"
            : "kadin";

    const productUrl = `/shop/${gender}/${categoryName}/${categoryId}/${productNameSlug}/${product.id}`;

    return (
        <article className="flex w-full max-w-[239px] flex-col bg-white">

            <Link
                to={productUrl}
                className="block cursor-pointer overflow-hidden"
            >
                <img
                    src={image}
                    alt={product.name}
                    className="aspect-[0.82] w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </Link>

            <div className="flex flex-col gap-2 px-5 py-6">

                <Link
                    to={productUrl}
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
