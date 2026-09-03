import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getGravatarUrl } from "../utils/gravatar";

import {
    Phone,
    Mail,
    Search,
    ShoppingCart,
    Heart,
    Menu,
    X,
    ChevronDown,
    LogOut,
} from "lucide-react";

import { logoutUser } from "../redux/thunks/clientThunks";

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);

    const [isCategoryOpen, setIsCategoryOpen] =
        useState(false);

    const [mobileCategoryOpen, setMobileCategoryOpen] =
        useState(false);

    const [isUserMenuOpen, setIsUserMenuOpen] =
        useState(false);

    const [isSearchOpen, setIsSearchOpen] =
        useState(false);

    const [isCartOpen, setIsCartOpen] =
        useState(false);

    const [searchTerm, setSearchTerm] =
        useState("");

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

    const user = useSelector(
        (state) =>
            state.client?.user || {}
    );

    const [gravatarUrl, setGravatarUrl] =
        useState("");

    useEffect(() => {
        let cancelled = false;

        const loadGravatar = async () => {
            if (!user?.email) {
                setGravatarUrl("");
                return;
            }

            const url =
                await getGravatarUrl(user.email);

            if (!cancelled) {
                setGravatarUrl(url);
            }
        };

        loadGravatar();

        return () => {
            cancelled = true;
        };
    }, [user?.email]);

    const isLoggedIn =
        Boolean(
            localStorage.getItem("token") ||
            sessionStorage.getItem("token")
        );

    const userName =
        user?.name ||
        user?.username ||
        user?.email ||
        "Account";

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

    const handleSearch = (event) => {
        event.preventDefault();

        const trimmedSearch =
            searchTerm.trim();

        if (!trimmedSearch) {
            navigate("/shop");
            setIsSearchOpen(false);
            return;
        }

        navigate(
            `/shop?filter=${encodeURIComponent(
                trimmedSearch
            )}`
        );

        setIsSearchOpen(false);
        closeMobileMenu();
    };

    const openSearch = () => {
        setIsSearchOpen(true);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchTerm("");
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        setIsUserMenuOpen(false);
        closeMobileMenu();
        navigate("/");
    };

    const closeCart = () => setIsCartOpen(false);

    return (
        <header className="w-full bg-white font-['Montserrat',sans-serif]">

            {/* TOP BAR */}
            <div className="flex min-h-16 flex-col items-center justify-center gap-2 bg-[#252b42] px-4 py-3 text-center text-[11px] font-bold leading-4 tracking-[0.2px] text-white sm:flex-row sm:justify-between sm:px-6 lg:px-10 lg:py-2 lg:text-[14px] lg:leading-6">

                <div className="hidden items-center gap-4 lg:flex">

                    <a
                        href="tel:+12255550118"
                        className="flex items-center gap-1 transition-opacity hover:opacity-70"
                    >
                        <Phone size={16} />
                        (225) 555-0118
                    </a>

                    <a
                        href="mailto:michelle.rivera@example.com"
                        className="flex items-center gap-1 transition-opacity hover:opacity-70"
                    >
                        <Mail size={16} />
                        michelle.rivera@example.com
                    </a>

                </div>

                <p>
                    Follow Us and get a chance to win 80% off
                </p>

                <div className="hidden items-center gap-2 lg:flex">

                    <span>
                        Follow Us :
                    </span>

                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaInstagram size={16} />
                    </a>

                    <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaYoutube size={16} />
                    </a>

                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaFacebookF size={15} />
                    </a>

                    <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaTwitter size={16} />
                    </a>

                </div>

            </div>

            {/* MAIN NAVIGATION */}
            <nav className="relative mx-auto flex min-h-[82px] max-w-[1438px] items-start justify-between px-6 py-6 lg:items-center lg:px-8 lg:py-3">

                {/* LOGO */}
                <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="text-[24px] font-bold leading-8 tracking-[0.1px] text-[#252b42]"
                >
                    Bandage
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
                            setIsCategoryOpen(true)
                        }
                        onMouseLeave={() =>
                            setIsCategoryOpen(false)
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

                                    <div>

                                        <h3 className="mb-4 text-sm font-bold text-[#252b42]">
                                            Kadın
                                        </h3>

                                        <div className="flex flex-col gap-3">

                                            {womenCategories.map(
                                                (category) => (
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

                                    <div>

                                        <h3 className="mb-4 text-sm font-bold text-[#252b42]">
                                            Erkek
                                        </h3>

                                        <div className="flex flex-col gap-3">

                                            {menCategories.map(
                                                (category) => (
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

                    {/* ACCOUNT */}
                    {isLoggedIn ? (
                        <div className="relative">

                            <button
                                type="button"
                                onClick={() =>
                                    setIsUserMenuOpen(
                                        (current) => !current
                                    )
                                }
                                className="flex items-center gap-2 rounded-full p-2 text-[14px] font-bold text-[#23a6f0] transition-colors hover:bg-[#f5f5f5]"
                            >
                                {gravatarUrl ? (
                                    <img
                                        src={gravatarUrl}
                                        alt={userName}
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#23a6f0] text-xs font-bold text-white">
                                        {userName
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>
                                )}

                                <span>
                                    {userName}
                                </span>

                                <ChevronDown
                                    size={15}
                                    className={`transition-transform ${isUserMenuOpen
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                />
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md border border-[#eeeeee] bg-white py-2 shadow-lg">

                                    <Link
                                        to="/orders"
                                        onClick={() =>
                                            setIsUserMenuOpen(
                                                false
                                            )
                                        }
                                        className="block px-4 py-3 text-sm font-bold text-[#737373] transition-colors hover:bg-[#f5f5f5] hover:text-[#23a6f0]"
                                    >
                                        Previous Orders
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-bold text-[#737373] transition-colors hover:bg-[#f5f5f5] hover:text-[#e74040]"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>

                                </div>
                            )}

                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-full p-3 text-[14px] font-bold text-[#23a6f0] transition-colors hover:bg-[#f5f5f5]"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="rounded-full bg-[#23a6f0] px-5 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#1d96dc]"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}

                    {/* SEARCH */}
                    {isSearchOpen ? (
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(
                                        event.target.value
                                    )
                                }
                                autoFocus
                                placeholder="Search products..."
                                className="w-48 rounded-full border border-[#ececec] px-4 py-2 text-sm text-[#252b42] outline-none focus:border-[#23a6f0]"
                            />

                            <button
                                type="button"
                                onClick={closeSearch}
                                aria-label="Close search"
                                className="rounded-full p-2 text-[#23a6f0] transition-colors hover:bg-[#f5f5f5]"
                            >
                                <X size={18} />
                            </button>
                        </form>
                    ) : (
                        <button
                            type="button"
                            aria-label="Search"
                            onClick={openSearch}
                            className="rounded-full p-3 text-[#23a6f0] transition-colors hover:bg-[#f5f5f5]"
                        >
                            <Search size={18} />
                        </button>
                    )}

                    {/* CART */}
                    <div className="relative">
                        <button
                            type="button"
                            aria-label="Shopping cart"
                            aria-expanded={isCartOpen}
                            onClick={() => setIsCartOpen((current) => !current)}
                            className="flex items-center gap-1 rounded-full p-3 text-[#23a6f0] transition-colors hover:bg-[#f5f5f5]"
                        >
                            <ShoppingCart size={18} />
                            <span className="text-xs">{cartCount}</span>
                        </button>

                        {isCartOpen && (
                            <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-md border border-[#eeeeee] bg-white p-4 shadow-lg">
                                <h3 className="mb-3 text-sm font-bold text-[#252b42]">Cart</h3>
                                {cart.length === 0 ? (
                                    <p className="py-4 text-sm text-[#737373]">Your cart is empty.</p>
                                ) : (
                                    <div className="flex max-h-64 flex-col gap-3 overflow-y-auto">
                                        {cart.slice(0, 4).map((item) => (
                                            <div key={item.product.id} className="flex items-center gap-3">
                                                <img src={item.product?.images?.[0]?.url} alt="" className="h-12 w-10 object-cover" />
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-xs font-bold text-[#252b42]">{item.product?.name}</p>
                                                    <p className="text-xs text-[#737373]">Qty: {item.count}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <Link to="/cart" onClick={closeCart} className="mt-4 block bg-[#23a6f0] px-4 py-3 text-center text-xs font-bold text-white">View Cart</Link>
                            </div>
                        )}
                    </div>

                    {/* FAVORITES */}
                    <Link
                        to="/favorites"
                        aria-label="Favorites"
                        className="flex items-center gap-1 rounded-full p-3 text-[#23a6f0] transition-colors hover:bg-[#f5f5f5]"
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

                    {/* SEARCH */}
                    {isSearchOpen ? (
                        <form
                            onSubmit={handleSearch}
                            className="absolute left-4 right-4 top-[82px] z-50 flex items-center gap-2 bg-white py-3"
                        >
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(
                                        event.target.value
                                    )
                                }
                                autoFocus
                                placeholder="Search products..."
                                className="min-w-0 flex-1 rounded-full border border-[#ececec] px-4 py-3 text-sm text-[#252b42] outline-none focus:border-[#23a6f0]"
                            />

                            <button
                                type="button"
                                onClick={closeSearch}
                                aria-label="Close search"
                                className="rounded-full p-2 text-[#252b42]"
                            >
                                <X size={22} />
                            </button>
                        </form>
                    ) : (
                        <button
                            type="button"
                            aria-label="Search"
                            onClick={openSearch}
                            className="p-0 text-[#252b42]"
                        >
                            <Search size={22} />
                        </button>
                    )}

                    {/* CART */}
                    <button
                        type="button"
                        aria-label="Shopping cart"
                        aria-expanded={isCartOpen}
                        onClick={() => setIsCartOpen((current) => !current)}
                        className="relative p-0 text-[#252b42]"
                    >
                        <ShoppingCart size={22} />

                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#23a6f0] px-1 text-[9px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* FAVORITES */}
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

                {isCartOpen && (
                    <div className="absolute right-4 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-md border border-[#eeeeee] bg-white p-4 shadow-lg lg:hidden">
                        <h3 className="mb-3 text-sm font-bold text-[#252b42]">Cart</h3>
                        {cart.length === 0 ? (
                            <p className="py-4 text-sm text-[#737373]">Your cart is empty.</p>
                        ) : (
                            <div className="flex max-h-56 flex-col gap-3 overflow-y-auto">
                                {cart.slice(0, 4).map((item) => (
                                    <div key={item.product.id} className="flex items-center gap-3">
                                        <img src={item.product?.images?.[0]?.url} alt="" className="h-12 w-10 object-cover" />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs font-bold text-[#252b42]">{item.product?.name}</p>
                                            <p className="text-xs text-[#737373]">Qty: {item.count}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Link to="/cart" onClick={closeCart} className="mt-4 block bg-[#23a6f0] px-4 py-3 text-center text-xs font-bold text-white">View Cart</Link>
                    </div>
                )}

            </nav>

            {/* MOBILE NAVIGATION */}
            {isMobileMenuOpen && (
                <div className="border-t border-[#eeeeee] px-4 pb-10 pt-5 lg:hidden">

                    <div className="flex flex-col items-center gap-6 text-center">

                        {/* MOBILE ACCOUNT */}
                        {!isLoggedIn && (
                            <div className="flex items-center gap-4">

                                <Link
                                    to="/login"
                                    onClick={
                                        closeMobileMenu
                                    }
                                    className="rounded-full px-4 py-2 text-[24px] leading-8 text-[#23a6f0]"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={
                                        closeMobileMenu
                                    }
                                    className="rounded-full bg-[#23a6f0] px-5 py-2 text-[24px] leading-8 text-white transition-colors hover:bg-[#1d96dc]"
                                >
                                    Sign Up
                                </Link>

                            </div>
                        )}

                        {isLoggedIn && (
                            <div className="flex flex-col items-center gap-4">
                                <Link
                                    to="/orders"
                                    onClick={closeMobileMenu}
                                    className="text-[24px] leading-8 text-[#23a6f0]"
                                >
                                    Previous Orders
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-[20px] font-bold text-[#e74040]"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        )}

                        {/* NAV ITEMS */}
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

                                    <div>

                                        <h3 className="mb-4 text-sm font-bold text-[#252b42]">
                                            Kadın
                                        </h3>

                                        <div className="flex flex-col gap-3">

                                            {womenCategories.map(
                                                (category) => (
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

                                    <div>

                                        <h3 className="mb-4 text-sm font-bold text-[#252b42]">
                                            Erkek
                                        </h3>

                                        <div className="flex flex-col gap-3">

                                            {menCategories.map(
                                                (category) => (
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
