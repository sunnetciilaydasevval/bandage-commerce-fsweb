import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Phone,
    Mail,
    UserRound,
    Search,
    ShoppingCart,
    Heart,
    Menu,
    X,
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

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="w-full bg-white font-['Montserrat',sans-serif]">
            {/* Top Bar */}
            <div className="flex min-h-16 flex-col items-center justify-center gap-2 bg-[#252b42] px-4 py-3 text-center text-[11px] font-bold leading-4 tracking-[0.2px] text-white sm:flex-row sm:justify-between sm:px-6 lg:px-10 lg:py-2 lg:text-[14px] lg:leading-6">
                <div className="hidden items-center gap-4 lg:flex">
                    <span className="flex items-center gap-1">
                        <Phone
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                        (225) 555-0118
                    </span>

                    <span className="flex items-center gap-1">
                        <Mail
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                        michelle.rivera@example.com
                    </span>
                </div>

                <p>
                    Follow Us and get a chance to win 80% off
                </p>

                <div className="hidden items-center gap-2 lg:flex">
                    <span>Follow Us :</span>

                    <a
                        href="#"
                        aria-label="Instagram"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaInstagram size={16} aria-hidden="true" />
                    </a>

                    <a
                        href="#"
                        aria-label="YouTube"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaYoutube size={16} aria-hidden="true" />
                    </a>

                    <a
                        href="#"
                        aria-label="Facebook"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaFacebookF size={15} aria-hidden="true" />
                    </a>

                    <a
                        href="#"
                        aria-label="Twitter"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaTwitter size={16} aria-hidden="true" />
                    </a>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="mx-auto flex min-h-[82px] max-w-[1438px] items-start justify-between px-6 py-6 lg:items-center lg:px-8 lg:py-3">
                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="text-[24px] font-bold leading-8 tracking-[0.1px] text-[#252b42]"
                >
                    BrandName
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-4 lg:flex">
                    {navItems.map(([label, href]) => (
                        <Link
                            key={label}
                            to={href}
                            className="text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373] transition-colors hover:text-[#23a6f0]"
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-1 lg:flex">
                    <Link
                        to="/signup"
                        className="flex items-center gap-1 rounded-full p-3 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#23a6f0] transition-colors hover:bg-[#f5f5f5]"
                    >
                        <UserRound
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                        Login / Register
                    </Link>

                    <button
                        type="button"
                        aria-label="Search"
                        className="rounded-full p-3 text-[#23a6f0] transition-colors hover:bg-[#f5f5f5]"
                    >
                        <Search
                            size={18}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>

                    <button
                        type="button"
                        aria-label="Shopping cart"
                        className="flex items-center gap-1 rounded-full p-3 text-[#23a6f0] transition-colors hover:bg-[#f5f5f5]"
                    >
                        <ShoppingCart
                            size={18}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                        <span className="text-xs">1</span>
                    </button>

                    <button
                        type="button"
                        aria-label="Favorites"
                        className="flex items-center gap-1 rounded-full p-3 text-[#23a6f0] transition-colors hover:bg-[#f5f5f5]"
                    >
                        <Heart
                            size={18}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                        <span className="text-xs">1</span>
                    </button>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-5 lg:hidden">
                    <button
                        type="button"
                        aria-label="Search"
                        className="p-0 text-[#252b42]"
                    >
                        <Search
                            size={22}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>

                    <button
                        type="button"
                        aria-label="Shopping cart"
                        className="p-0 text-[#252b42]"
                    >
                        <ShoppingCart
                            size={22}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>

                    <button
                        type="button"
                        aria-label={
                            isMobileMenuOpen
                                ? "Close menu"
                                : "Open menu"
                        }
                        aria-expanded={isMobileMenuOpen}
                        onClick={() =>
                            setIsMobileMenuOpen(
                                (current) => !current
                            )
                        }
                        className="p-0 text-[#252b42]"
                    >
                        {isMobileMenuOpen ? (
                            <X
                                size={24}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        ) : (
                            <Menu
                                size={24}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="flex flex-col items-center gap-[30px] border-t border-[#eeeeee] px-4 pb-12 pt-5 text-center text-[30px] font-normal leading-[45px] tracking-[0.2px] text-[#737373] lg:hidden">
                    {navItems.map(([label, href]) => (
                        <Link
                            key={label}
                            to={href}
                            onClick={closeMobileMenu}
                            className="transition-colors hover:text-[#23a6f0]"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
