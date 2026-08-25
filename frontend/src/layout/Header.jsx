import { Link } from "react-router-dom";

const phoneIcon = "https://www.figma.com/api/mcp/asset/59859578-8e9d-4787-9e73-a796c91bf224.svg";
const emailIcon = "https://www.figma.com/api/mcp/asset/4a903f16-d55a-41e8-b732-18755e007110.svg";
const instagramIcon = "https://www.figma.com/api/mcp/asset/cccbec85-4a13-4b71-bdbf-bca39a16c53b.svg";
const youtubeIcon = "https://www.figma.com/api/mcp/asset/44babcdb-176a-4960-aefa-f5681c9060e8.svg";
const facebookIcon = "https://www.figma.com/api/mcp/asset/a8ca98ce-4582-4d2a-b8a2-22c95929912c.svg";
const twitterIcon = "https://www.figma.com/api/mcp/asset/c5a6d99d-7692-488b-9aea-9a25e74c6637.svg";
const loginIcon = "https://www.figma.com/api/mcp/asset/7aac79b5-68ab-4b2e-9e12-1adc00f312d0.svg";
const searchIcon = "https://www.figma.com/api/mcp/asset/8ec41f9e-d207-4614-b722-007c1b9ff854.svg";
const cartIcon = "https://www.figma.com/api/mcp/asset/1bd68f74-7eae-4f7a-bc22-1c758e58e67a.svg";
const heartIcon = "https://www.figma.com/api/mcp/asset/a0de61f1-2c2d-48ed-a5f6-e09706310b2c.svg";
const mobileSearchIcon = "https://www.figma.com/api/mcp/asset/fc12a6dc-7844-4798-8f02-41d51c697023.svg";
const mobileCartIcon = "https://www.figma.com/api/mcp/asset/6dc2b004-19b8-49a9-bb80-59ce90f5991c.svg";
const menuIcon = "https://www.figma.com/api/mcp/asset/04919240-e0ab-4840-8956-a1c97245e874.svg";

const navItems = [
    ["Home", "/"],
    ["Shop", "/shop"],
    ["About", "/about-us"],
    ["Blog", "/"],
    ["Contact", "/contact"],
    ["Pages", "/"],
];

function Icon({ src, alt }) {
    return <img src={src} alt={alt} className="h-4 w-4 object-contain" />;
}

export default function Header() {
    return (
        <header className="w-full bg-white font-['Montserrat',sans-serif]">
            <div className="flex min-h-16 flex-col items-center justify-center gap-2 bg-[#252b42] px-4 py-3 text-center text-[11px] font-bold leading-4 tracking-[0.2px] text-white sm:flex-row sm:justify-between sm:px-6 lg:px-10 lg:py-2 lg:text-[14px] lg:leading-6">
                <div className="hidden items-center gap-4 lg:flex">
                    <span className="flex items-center gap-1"><Icon src={phoneIcon} alt="Phone" />(225) 555-0118</span>
                    <span className="flex items-center gap-1"><Icon src={emailIcon} alt="Email" />michelle.rivera@example.com</span>
                </div>
                <p>Follow Us and get a chance to win 80% off</p>
                <div className="hidden items-center gap-2 lg:flex">
                    <span>Follow Us :</span>
                    {[instagramIcon, youtubeIcon, facebookIcon, twitterIcon].map((icon, index) => <Icon key={icon} src={icon} alt={`Social media ${index + 1}`} />)}
                </div>
            </div>

            <nav className="mx-auto flex min-h-[82px] max-w-[1438px] items-start justify-between px-6 py-6 lg:items-center lg:px-8 lg:py-3">
                <Link to="/" className="text-[24px] font-bold leading-8 tracking-[0.1px] text-[#252b42]">BrandName</Link>
                <div className="hidden items-center gap-4 lg:flex">
                    {navItems.map(([label, href]) => <Link key={label} to={href} className="text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373] transition-colors hover:text-[#23a6f0]">{label}{label === "Shop" && <span className="ml-1">⌄</span>}</Link>)}
                </div>
                <div className="hidden items-center gap-1 lg:flex">
                    <Link to="/" className="flex items-center gap-1 rounded-full p-3 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#23a6f0]"><Icon src={loginIcon} alt="" />Login / Register</Link>
                    <button type="button" aria-label="Search" className="rounded-full p-3"><Icon src={searchIcon} alt="Search" /></button>
                    <button type="button" aria-label="Shopping cart" className="flex items-center gap-1 rounded-full p-3"><Icon src={cartIcon} alt="Shopping cart" /><span className="text-xs text-[#23a6f0]">1</span></button>
                    <button type="button" aria-label="Favorites" className="flex items-center gap-1 rounded-full p-3"><Icon src={heartIcon} alt="Favorites" /><span className="text-xs text-[#23a6f0]">1</span></button>
                </div>
                <div className="flex items-center gap-5 lg:hidden">
                    <button type="button" aria-label="Search" className="p-0"><Icon src={mobileSearchIcon} alt="Search" /></button>
                    <button type="button" aria-label="Shopping cart" className="p-0"><Icon src={mobileCartIcon} alt="Shopping cart" /></button>
                    <button type="button" aria-label="Open menu" className="p-0"><Icon src={menuIcon} alt="Open menu" /></button>
                </div>
            </nav>

            <div className="flex flex-col items-center gap-[30px] px-4 pb-12 pt-5 text-center text-[30px] font-normal leading-[45px] tracking-[0.2px] text-[#737373] lg:hidden">
                <Link to="/">Home</Link>
                <Link to="/product">Product</Link>
                <Link to="/shop">Pricing</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </header>
    );
}