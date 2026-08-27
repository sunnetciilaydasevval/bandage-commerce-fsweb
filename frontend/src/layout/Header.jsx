import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    Phone,
    Mail,
    UserRound,
    Search,
    ShoppingCart,
    Heart,
    Menu,
    X,
    ChevronDown,
} from "lucide-react";

import {
    FaInstagram,
    FaYoutube,
    FaFacebookF,
    FaTwitter,
} from "react-icons/fa";

const navItems = [
    ["Home", "/"],
    ["Shop", "/shop"],
    ["Contact", "/contact"],
    ["Team", "/team"],
    ["About", "/about"],
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

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);

    const [isCategoryOpen, setIsCategoryOpen] =
        useState(false);

    const [mobileCategoryOpen, setMobileCategoryOpen] =
        useState(false);

    const categories = useSelector(
        (state) =>
            state.product?.categories || []
    );

    const cart = useSelector(
        (state) =>
            state.shoppingCart?.cart || []
    );

    const favorites = useSelector(
        (state) =>
            state.favorite?.favorites || []
    );

    const cartCount = cart.reduce(
        (total, item) =>
            total + Number(item.count || 0),
        0
    );

    const favoriteCount =
        favorites.length;

    const womenCategories =
        categories.filter(
            (category) =>
                category.gender === "k"
        );

    const menCategories =
        categories.filter(
            (category) =>
                category.gender === "e"
        );

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setMobileCategoryOpen(false);
    };

    return (
        <header className="w-full bg-white font-['Montserrat',sans-serif]">

            {/* TOP BAR */}
            <div className="flex min-h-16 flex-col items-center justify-center gap-2 bg-[#252b42] px-4 py-3 text-center text-[11px] font-bold leading-4 tracking-[0.2px] text-white sm:flex-row sm:justify-between sm:px-6 lg:px-10 lg:py-2 lg:text-[14px] lg:leading-6">

                <div className="hidden items-center gap-4 lg:flex">

                    <span className="flex items-center gap-1">
                        <Phone size={16} />
                        (225) 555-0118
                    </span>

                    <span className="flex items-center gap-1">
                        <Mail size={16} />
                        michelle.rivera@example.com
                    </span>

                </div>

                <p>
                    Follow Us and get a chance to win 80% off
                </p>

                <div className="hidden items-center gap-2 lg:flex">

                    <span>
                        Follow Us :
                    </span>

                    <a
                        href="#"
                        aria-label="Instagram"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaInstagram size={16} />
                    </a>

                    <a
                        href="#"
                        aria-label="YouTube"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaYoutube size={16} />
                    </a>

                    <a
                        href="#"
                        aria-label="Facebook"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaFacebookF size={15} />
                    </a>

                    <a
                        href="#"
                        aria-label="Twitter"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaTwitter size={16} />
                    </a>

                </div>

            </div>

            {/* MAIN NAVIGATION */}
            <nav className="mx-auto flex min-h-[82px] max-w-[1438px] items-start justify-between px-6 py-6 lg:items-center lg:px-8 lg:py-3">

                {/* LOGO */}
                <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="text-[24px] font-bold leading-8 tracking-[0.1px] text-[#252b42]"
                >
                    BrandName
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden items-center gap-5 lg:flex">

                    {navItems.map(
                        ([label, href]) => (
                            <Link
                                key={label}
                                to={href}
                                className="text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373] transition-colors hover:text-[#23a6f0]"
                            >
                                {label}
                            </Link>
                        )
                    )}

                    {/* CATEGORY DROPDOWN */}
                    <div
                        className="relative"
                        onMouseEnter={() =>
                            setIsCategoryOpen(
                                true
                            )
                        }
                        onMouseLeave={() =>
                            setIsCategoryOpen(
                                false
                            )
                        }
                    >

                        <button
                            type="button"
                            onClick={() =>
                                setIsCategoryOpen(
                                    (current) =>
                                        !current
                                )
                            }
                            className="flex items-center gap-1 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373] transition-colors hover:text-[#23a6f0]"
                        >
                            Categories

                            <ChevronDown
                                size={15}
                                className={`transition-transform ${isCategoryOpen
                                        ? "rotate-180"
                                        : ""
                                    }`}
                            />
                        </button>

                        {isCategoryOpen && (
                            <div className="absolute left-1/2 top-full z-50 w-[430px] -translate-x-1/2 pt-3">

                                <div className="grid grid-cols-2 gap-8 rounded-md border border-[#eeeeee] bg-white p-6 shadow-lg">

                                    {/* WOMEN */}
                                    <div>

                                        <h3 className="mb-4 text-sm font-bold text-[#252b42]">
                                            Kadın
                                        </h3>

                                        <div className="flex flex-col gap-3">

                                            {womenCategories.map(
                                                (
                                                    category
                                                ) => (
                                                    <Link
                                                        key={
                                                            category.id
                                                        }
                                                        to={createCategoryUrl(
                                                            category
                                                        )}
                                                        onClick={() =>
                                                            setIsCategoryOpen(
                                                                false
                                                            )
                                                        }
                                                        className="text-sm text-[#737373] transition-colors hover:text-[#23a6f0]"
                                                    >
                                                        {
                                                            category.title
                                                        }
                                                    </Link>
                                                )
                                            )}

                                        </div>

                                    </div>

                                    {/* MEN */}
                                    <div>

                                        <h3 className="mb-4 text-sm font-bold text-[#252b42]">
                                            Erkek
                                        </h3>

                                        <div className="flex flex-col gap-3">

                                            {menCategories.map(
                                                (
                                                    category
                                                ) => (
                                                    <Link
                                                        key={
                                                            category.id
                                                        }
                                                        to={createCategoryUrl(
                                                            category
                                                        )}
                                                        onClick={() =>
                                                            setIsCategoryOpen(
                                                                false
                                                            )
                                                        }
                                                        className="text-sm text-[#737373] transition-colors hover:text-[#23a6f0]"
                                                    >
                                                        {
                                                            category.title
                                                        }
                                                    </Link>
                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>
                        )}

                    </div>

                </div>

                {/* DESKTOP ACTIONS */}
                <div className="hidden items-center gap-1 lg:flex">

                    <Link
                        to="/signup"
                        className="flex items-center gap-1 rounded-full p-3 text-[14px] font-bold text-[#23a6f0] hover:bg-[#f5f5f5]"
                    >
                        <UserRound size={16} />
                        Login / Register
                    </Link>

                    <button
                        type="button"
                        aria-label="Search"
                        className="rounded-full p-3 text-[#23a6f0] hover:bg-[#f5f5f5]"
                    >
                        <Search size={18} />
                    </button>

                    {/* CART */}
                    <Link
                        to="/cart"
                        aria-label="Shopping cart"
                        className="flex items-center gap-1 rounded-full p-3 text-[#23a6f0] hover:bg-[#f5f5f5]"
                    >
                        <ShoppingCart size={18} />

                        <span className="text-xs">
                            {cartCount}
                        </span>
                    </Link>

                    {/* FAVORITES */}
                    <Link
                        to="/favorites"
                        aria-label="Favorites"
                        className="flex items-center gap-1 rounded-full p-3 text-[#23a6f0] hover:bg-[#f5f5f5]"
                    >
                        <Heart
                            size={18}
                            fill={
                                favoriteCount > 0
                                    ? "currentColor"
                                    : "none"
                            }
                        />

                        <span className="text-xs">
                            {favoriteCount}
                        </span>
                    </Link>

                </div>

                {/* MOBILE ACTIONS */}
                <div className="flex items-center gap-5 lg:hidden">

                    <button
                        type="button"
                        aria-label="Search"
                        className="p-0 text-[#252b42]"
                    >
                        <Search size={22} />
                    </button>

                    {/* MOBILE CART */}
                    <Link
                        to="/cart"
                        aria-label="Shopping cart"
                        className="relative p-0 text-[#252b42]"
                    >
                        <ShoppingCart size={22} />

                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#23a6f0] px-1 text-[9px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* MOBILE FAVORITES */}
                    <Link
                        to="/favorites"
                        aria-label="Favorites"
                        className="relative p-0 text-[#252b42]"
                    >
                        <Heart size={22} />

                        {favoriteCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                                {favoriteCount}
                            </span>
                        )}
                    </Link>

                    {/* MOBILE MENU */}
                    <button
                        type="button"
                        aria-label={
                            isMobileMenuOpen
                                ? "Close menu"
                                : "Open menu"
                        }
                        aria-expanded={
                            isMobileMenuOpen
                        }
                        onClick={() =>
                            setIsMobileMenuOpen(
                                (current) =>
                                    !current
                            )
                        }
                        className="p-0 text-[#252b42]"
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>

                </div>

            </nav>

            {/* MOBILE NAVIGATION */}
            {isMobileMenuOpen && (
                <div className="border-t border-[#eeeeee] px-4 pb-10 pt-5 lg:hidden">

                    <div className="flex flex-col items-center gap-6 text-center">

                        {navItems.map(
                            ([label, href]) => (
                                <Link
                                    key={label}
                                    to={href}
                                    onClick={
                                        closeMobileMenu
                                    }
                                    className="text-[24px] leading-8 text-[#737373] transition-colors hover:text-[#23a6f0]"
                                >
                                    {label}
                                </Link>
                            )
                        )}

                        {/* MOBILE CATEGORIES */}
                        <div className="w-full max-w-[350px]">

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileCategoryOpen(
                                        (current) =>
                                            !current
                                    )
                                }
                                className="mx-auto flex items-center gap-2 text-[24px] leading-8 text-[#737373]"
                            >
                                Categories

                                <ChevronDown
                                    size={20}
                                    className={`transition-transform ${mobileCategoryOpen
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                />
                            </button>

                            {mobileCategoryOpen && (
                                <div className="mt-6 grid grid-cols-2 gap-8 text-left">

                                    {/* WOMEN */}
                                    <div>

                                        <h3 className="mb-4 text-sm font-bold text-[#252b42]">
                                            Kadın
                                        </h3>

                                        <div className="flex flex-col gap-3">

                                            {womenCategories.map(
                                                (
                                                    category
                                                ) => (
                                                    <Link
                                                        key={
                                                            category.id
                                                        }
                                                        to={createCategoryUrl(
                                                            category
                                                        )}
                                                        onClick={
                                                            closeMobileMenu
                                                        }
                                                        className="text-sm text-[#737373] hover:text-[#23a6f0]"
                                                    >
                                                        {
                                                            category.title
                                                        }
                                                    </Link>
                                                )
                                            )}

                                        </div>

                                    </div>

                                    {/* MEN */}
                                    <div>

                                        <h3 className="mb-4 text-sm font-bold text-[#252b42]">
                                            Erkek
                                        </h3>

                                        <div className="flex flex-col gap-3">

                                            {menCategories.map(
                                                (
                                                    category
                                                ) => (
                                                    <Link
                                                        key={
                                                            category.id
                                                        }
                                                        to={createCategoryUrl(
                                                            category
                                                        )}
                                                        onClick={
                                                            closeMobileMenu
                                                        }
                                                        className="text-sm text-[#737373] hover:text-[#23a6f0]"
                                                    >
                                                        {
                                                            category.title
                                                        }
                                                    </Link>
                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                </div>
            )}

        </header>
    );
}
