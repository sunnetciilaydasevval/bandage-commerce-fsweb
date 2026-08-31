import {
    Phone,
    MapPin,
    Mail,
} from "lucide-react";

import {
    FaInstagram,
    FaYoutube,
    FaFacebookF,
    FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const linkGroups = [
    {
        title: "Company Info",
        links: [
            ["About Us", "/about"],
            ["Carrier", "/about"],
            ["We are hiring", "/team"],
            ["Blog", "/"],
        ],
    },
    {
        title: "Legal",
        links: [
            ["About Us", "/about"],
            ["Carrier", "/about"],
            ["We are hiring", "/team"],
            ["Blog", "/"],
        ],
    },
    {
        title: "Features",
        links: [
            ["Business Marketing", "/shop"],
            ["User Analytic", "/"],
            ["Live Chat", "/contact"],
            ["Unlimited Support", "/contact"],
        ],
    },
    {
        title: "Resources",
        links: [
            ["IOS & Android", "https://www.apple.com/app-store/"],
            ["Watch a Demo", "/"],
            ["Customers", "/"],
            ["API", "/contact"],
        ],
    },
];

function ContactRow({ icon: Icon, children }) {
    return (
        <div className="flex items-center gap-2.5">
            <Icon size={24} strokeWidth={2} className="shrink-0 text-[#23a6f0]" aria-hidden="true" />

            <span>{children}</span>
        </div>
    );


}

function ExternalLink({
    href,
    children,
    ariaLabel,
}) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="transition-colors hover:text-[#23a6f0]" >
            {children}
        </a>
    );
}

export default function Footer() {
    return (
        <footer className="font-['Montserrat',sans-serif]">

            {/* CTA SECTION */}
            <section className="flex flex-col items-start gap-[50px] bg-[#fafafa] px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-[13.5%] lg:py-8">

                <div>
                    <h2 className="text-[24px] font-bold leading-8 tracking-[0.1px] text-[#252b42]">
                        Consulting Agency For Your Business
                    </h2>

                    <p className="text-[14px] leading-5 tracking-[0.2px] text-[#737373]">
                        the quick fox jumps over the lazy dog
                    </p>
                </div>

                <Link
                    to="/contact"
                    className="rounded-[5px] bg-[#23a6f0] px-10 py-[15px] text-center text-[14px] font-bold leading-[22px] tracking-[0.2px] text-white transition-colors hover:bg-[#1d96dc]"
                >
                    Contact Us
                </Link>

            </section>

            {/* LINKS + CONTACT */}
            <section className="flex flex-col gap-[30px] bg-white px-6 py-[50px] sm:flex-row sm:flex-wrap lg:justify-between lg:px-[13.5%] lg:py-[40px]">

                {linkGroups.map(
                    ({ title, links }) => (
                        <div
                            key={title}
                            className="flex flex-col gap-5"
                        >

                            <h3 className="text-[16px] font-bold leading-6 tracking-[0.1px] text-[#252b42]">
                                {title}
                            </h3>

                            <div className="flex flex-col gap-2.5 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373]">

                                {links.map(
                                    ([link, href]) => {
                                        const isExternal =
                                            href.startsWith(
                                                "http"
                                            );

                                        return isExternal ? (
                                            <ExternalLink
                                                key={link}
                                                href={href}
                                            >
                                                {link}
                                            </ExternalLink>
                                        ) : (
                                            <Link
                                                key={link}
                                                to={href}
                                                className="transition-colors hover:text-[#23a6f0]"
                                            >
                                                {link}
                                            </Link>
                                        );
                                    }
                                )}

                            </div>

                        </div>
                    )
                )}

                {/* CONTACT */}
                <div className="flex flex-col gap-5 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373]">

                    <h3 className="text-[16px] font-bold text-[#252b42]">
                        Get In Touch
                    </h3>

                    <div className="flex flex-col gap-2.5">

                        <ContactRow icon={Phone}>
                            <a
                                href="tel:+14805550103"
                                className="transition-colors hover:text-[#23a6f0]"
                            >
                                (480) 555-0103
                            </a>
                        </ContactRow>

                        <ContactRow icon={MapPin}>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=4517+Washington+Ave"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-[#23a6f0]"
                            >
                                4517 Washington Ave.
                            </a>
                        </ContactRow>

                        <ContactRow icon={Mail}>
                            <a
                                href="mailto:debra.holt@example.com"
                                className="transition-colors hover:text-[#23a6f0]"
                            >
                                debra.holt@example.com
                            </a>
                        </ContactRow>

                    </div>

                </div>

            </section>

            {/* BOTTOM BAR */}
            <section className="flex flex-col items-start gap-[50px] bg-[#fafafa] px-6 py-[25px] text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373] sm:flex-row sm:items-center sm:justify-between lg:px-[13.5%] lg:py-[22px]">

                <p>
                    © 2026 Bandage. All rights reserved.
                </p>

                <div className="flex items-center gap-5 text-[#23a6f0]">

                    <ExternalLink
                        href="https://instagram.com"
                        ariaLabel="Instagram"
                    >
                        <FaInstagram
                            size={24}
                            aria-hidden="true"
                        />
                    </ExternalLink>

                    <ExternalLink
                        href="https://youtube.com"
                        ariaLabel="YouTube"
                    >
                        <FaYoutube
                            size={24}
                            aria-hidden="true"
                        />
                    </ExternalLink>

                    <ExternalLink
                        href="https://facebook.com"
                        ariaLabel="Facebook"
                    >
                        <FaFacebookF
                            size={22}
                            aria-hidden="true"
                        />
                    </ExternalLink>

                    <ExternalLink
                        href="https://x.com"
                        ariaLabel="X"
                    >
                        <FaTwitter
                            size={22}
                            aria-hidden="true"
                        />
                    </ExternalLink>

                    <ExternalLink
                        href="https://www.apple.com/app-store/"
                        ariaLabel="Apple App Store"
                    >
                        <span className="sr-only">
                            App Store
                        </span>
                    </ExternalLink>

                    <ExternalLink
                        href="https://play.google.com/store"
                        ariaLabel="Google Play Store"
                    >
                        <span className="sr-only">
                            Google Play
                        </span>
                    </ExternalLink>

                </div>

            </section>

        </footer>
    );


}