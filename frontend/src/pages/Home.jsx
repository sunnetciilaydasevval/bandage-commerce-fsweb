import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard from "../components/ProductCard";

const slides = [
    {
        image: "https://www.figma.com/api/mcp/asset/d4d4beeb-87cd-4f5d-bf27-f26f8abaca42.png",
        title: "NEW COLLECTION",
    },
    {
        image: "https://www.figma.com/api/mcp/asset/ae0942db-7ffd-48b9-bfc9-53d1f0a00e93.png",
        title: "VITA CLASSIC PRODUCT",
    },
];

function createCategoryUrl(category) {
    const gender =
        category.gender === "k"
            ? "kadin"
            : "erkek";

    const categoryName = category.title
        .toLocaleLowerCase("tr-TR")
        .replace(/ı/g, "i")
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/\s+/g, "-");

    return `/shop/${gender}/${categoryName}/${category.id}`;
}

export default function Home() {
    const [activeSlide, setActiveSlide] = useState(0);

    const categories = useSelector(
        (state) => state.product.categories || []
    );

    const productList = useSelector(
        (state) => state.product.productList || []
    );

    const topCategories = [...categories]
        .sort(
            (a, b) =>
                Number(b.rating || 0) -
                Number(a.rating || 0)
        )
        .slice(0, 5);

    const slide = slides[activeSlide];

    return (
        <div className="font-['Montserrat',sans-serif] text-[#252b42]">

            {/* HERO */}
            <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#23a6f0] px-10 py-20 text-white md:min-h-[620px] lg:min-h-[680px] lg:px-[12%]">

                <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="relative z-10 max-w-[470px] text-center md:text-left">
                    <p className="mb-6 text-[14px] font-bold">
                        SUMMER 2020
                    </p>

                    <h1 className="mb-6 text-[40px] font-bold leading-[50px] tracking-[0.2px] md:text-[58px] md:leading-[80px]">
                        {slide.title}
                    </h1>

                    <p className="mb-8 text-[16px] leading-6 text-[#fafafa] md:text-[20px] md:leading-[30px]">
                        We know how large objects will act,
                        but things on a small scale just do
                        not act that way.
                    </p>

                    <Link
                        to="/shop"
                        className="inline-block bg-[#2dc071] px-10 py-[15px] text-[14px] font-bold text-white"
                    >
                        SHOP NOW
                    </Link>
                </div>

                <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={() =>
                        setActiveSlide(
                            (activeSlide +
                                slides.length -
                                1) %
                            slides.length
                        )
                    }
                    className="absolute left-5 z-10"
                >
                    <ChevronLeft />
                </button>

                <button
                    type="button"
                    aria-label="Next slide"
                    onClick={() =>
                        setActiveSlide(
                            (activeSlide + 1) %
                            slides.length
                        )
                    }
                    className="absolute right-5 z-10"
                >
                    <ChevronRight />
                </button>

                <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            aria-label={`Slide ${index + 1}`}
                            onClick={() =>
                                setActiveSlide(index)
                            }
                            className={`h-1 w-8 ${index === activeSlide
                                    ? "bg-white"
                                    : "bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* TOP 5 CATEGORIES */}
            <section className="bg-[#fafafa] px-6 py-20">
                <SectionIntro
                    title="TOP CATEGORIES"
                    copy="Explore our highest rated categories"
                />

                {topCategories.length > 0 ? (
                    <div className="mx-auto grid max-w-[1050px] grid-cols-2 gap-4 md:grid-cols-5">
                        {topCategories.map((category) => (
                            <Link
                                key={category.id}
                                to={createCategoryUrl(category)}
                                className="group relative h-[240px] overflow-hidden md:h-[300px]"
                            >
                                <img
                                    src={category.img}
                                    alt={category.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 text-center text-white">
                                    <span className="mb-1 text-[16px] font-bold">
                                        {category.title}
                                    </span>

                                    <span className="text-xs">
                                        {category.gender === "k"
                                            ? "Kadın"
                                            : "Erkek"}
                                    </span>

                                    <span className="mt-1 text-xs text-[#f3cd03]">
                                        ★{" "}
                                        {Number(
                                            category.rating || 0
                                        ).toFixed(1)}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-sm text-[#737373]">
                        Categories are loading...
                    </div>
                )}
            </section>

            {/* BESTSELLER PRODUCTS */}
            <section className="bg-white px-6 py-20">
                <SectionIntro
                    title="BESTSELLER PRODUCTS"
                    copy="Problems trying to resolve the conflict between"
                />

                {productList.length > 0 ? (
                    <div className="mx-auto flex max-w-[1050px] flex-wrap justify-center gap-4">
                        {productList
                            .slice()
                            .sort(
                                (a, b) =>
                                    Number(
                                        b.sell_count || 0
                                    ) -
                                    Number(
                                        a.sell_count || 0
                                    )
                            )
                            .slice(0, 8)
                            .map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-sm text-[#737373]">
                        Products are loading...
                    </div>
                )}
            </section>

            {/* GREEN PROMOTION */}
            <section className="flex flex-col items-center gap-8 bg-[#23856d] px-6 py-16 text-white md:flex-row md:justify-center">
                <div className="max-w-[380px] text-center md:text-left">
                    <p className="mb-4 text-xs font-bold">
                        SUMMER 2020
                    </p>

                    <h2 className="mb-4 text-[32px] font-bold leading-10">
                        Vita Classic Product
                    </h2>

                    <p className="mb-5 text-sm leading-5">
                        We know how large objects will act,
                        but things on a small scale just do
                        not act that way.
                    </p>

                    <Link
                        to="/shop"
                        className="inline-block bg-white px-8 py-3 text-xs font-bold text-[#23856d]"
                    >
                        BUY NOW
                    </Link>
                </div>

                <img
                    src="https://www.figma.com/api/mcp/asset/b34fc066-38f8-4ab4-b9b7-fc164062079e.png"
                    alt="Vita classic product"
                    className="max-h-[310px] w-auto object-contain"
                />
            </section>

            {/* FEATURED */}
            <section className="mx-auto flex max-w-[1050px] flex-col items-center gap-10 px-6 py-20 md:flex-row">
                <img
                    src="https://www.figma.com/api/mcp/asset/fcddf8d1-32a7-46ea-b90f-68ad89067b0a.png"
                    alt="Featured product"
                    className="w-full max-w-[520px] object-cover"
                />

                <div>
                    <p className="mb-3 text-xs font-bold text-[#23a6f0]">
                        SUMMER 2020
                    </p>

                    <h2 className="mb-4 text-[30px] font-bold leading-9">
                        Part of the Neural Universe
                    </h2>

                    <p className="mb-6 text-sm leading-5 text-[#737373]">
                        We know how large objects will act,
                        but things on a small scale just do
                        not act that way.
                    </p>

                    <Link
                        to="/shop"
                        className="inline-block bg-[#23a6f0] px-8 py-3 text-xs font-bold text-white"
                    >
                        SHOP NOW
                    </Link>
                </div>
            </section>
        </div>
    );
}

function SectionIntro({ title, copy }) {
    return (
        <div className="mx-auto mb-12 max-w-[600px] text-center">
            <h2 className="mb-3 text-[24px] font-bold leading-8">
                {title}
            </h2>

            <p className="text-sm leading-5 text-[#737373]">
                {copy}
            </p>
        </div>
    );
}
