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
import { useTranslation } from "react-i18next";

const linkGroupKeys = [
    {
        titleKey:
            "footer.companyInfo",
        links: [
            [
                "footer.aboutUs",
                "/about",
            ],
            [
                "footer.carrier",
                "/about",
            ],
            [
                "footer.weAreHiring",
                "/team",
            ],
            [
                "footer.blog",
                "/",
            ],
        ],
    },
    {
        titleKey: "footer.legal",
        links: [
            [
                "footer.aboutUs",
                "/about",
            ],
            [
                "footer.carrier",
                "/about",
            ],
            [
                "footer.weAreHiring",
                "/team",
            ],
            [
                "footer.blog",
                "/",
            ],
        ],
    },
    {
        titleKey:
            "footer.features",
        links: [
            [
                "footer.businessMarketing",
                "/shop",
            ],
            [
                "footer.userAnalytic",
                "/",
            ],
            [
                "footer.liveChat",
                "/contact",
            ],
            [
                "footer.unlimitedSupport",
                "/contact",
            ],
        ],
    },
    {
        titleKey:
            "footer.resources",
        links: [
            [
                "footer.iosAndroid",
                "https://www.apple.com/app-store/",
            ],
            [
                "footer.watchDemo",
                "/",
            ],
            [
                "footer.customers",
                "/",
            ],
            [
                "footer.api",
                "/contact",
            ],
        ],
    },
];

function ContactRow({
    icon: Icon,
    children,
}) {
    return (
        <div className="flex items-center gap-2.5">
            <Icon
                size={24}
                strokeWidth={2}
                className="shrink-0 text-[#23a6f0]"
                aria-hidden="true"
            />

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
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className="transition-colors hover:text-[#23a6f0]"
        >
            {children}
        </a>
    );
}

export default function Footer() {
    const { t } =
        useTranslation();

    return (
        <footer className="font-['Montserrat',sans-serif]">
            {/* CTA SECTION */}
            <section className="flex flex-col items-start gap-[50px] bg-[#fafafa] px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-[13.5%] lg:py-8">
                <div>
                    <h2 className="text-[24px] font-bold leading-8 tracking-[0.1px] text-[#252b42]">
                        {t(
                            "footer.consultingAgency"
                        )}
                    </h2>

                    <p className="text-[14px] leading-5 tracking-[0.2px] text-[#737373]">
                        {t(
                            "footer.tagline"
                        )}
                    </p>
                </div>

                <Link
                    to="/contact"
                    className="rounded-[5px] bg-[#23a6f0] px-10 py-[15px] text-center text-[14px] font-bold leading-[22px] tracking-[0.2px] text-white transition-colors hover:bg-[#1d96dc]"
                >
                    {t(
                        "footer.contactUs"
                    )}
                </Link>
            </section>

            {/* LINKS + CONTACT */}
            <section className="flex flex-col gap-[30px] bg-white px-6 py-[50px] sm:flex-row sm:flex-wrap lg:justify-between lg:px-[13.5%] lg:py-[40px]">
                {linkGroupKeys.map(
                    ({
                        titleKey,
                        links,
                    }) => (
                        <div
                            key={
                                titleKey
                            }
                            className="flex flex-col gap-5"
                        >
                            <h3 className="text-[16px] font-bold leading-6 tracking-[0.1px] text-[#252b42]">
                                {t(
                                    titleKey
                                )}
                            </h3>

                            <div className="flex flex-col gap-2.5 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373]">
                                {links.map(
                                    ([
                                        linkKey,
                                        href,
                                    ]) => {
                                        const isExternal =
                                            href.startsWith(
                                                "http"
                                            );

                                        if (
                                            isExternal
                                        ) {
                                            return (
                                                <ExternalLink
                                                    key={
                                                        linkKey
                                                    }
                                                    href={
                                                        href
                                                    }
                                                    ariaLabel={t(
                                                        linkKey
                                                    )}
                                                >
                                                    {t(
                                                        linkKey
                                                    )}
                                                </ExternalLink>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={
                                                    linkKey
                                                }
                                                to={
                                                    href
                                                }
                                                className="transition-colors hover:text-[#23a6f0]"
                                            >
                                                {t(
                                                    linkKey
                                                )}
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
                        {t(
                            "contact.contactUs"
                        )}
                    </h3>

                    <div className="flex flex-col gap-2.5">
                        <ContactRow
                            icon={Phone}
                        >
                            <a
                                href="tel:+14805550103"
                                className="transition-colors hover:text-[#23a6f0]"
                            >
                                (480)
                                {" "}
                                555-0103
                            </a>
                        </ContactRow>

                        <ContactRow
                            icon={MapPin}
                        >
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=4517+Washington+Ave"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-[#23a6f0]"
                            >
                                4517
                                Washington
                                Ave.
                            </a>
                        </ContactRow>

                        <ContactRow
                            icon={Mail}
                        >
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
                    © 2026 Bandage.{" "}
                    {t(
                        "copyright"
                    )}
                </p>

                <div className="flex items-center gap-5 text-[#23a6f0]">
                    <ExternalLink
                        href="https://instagram.com"
                        ariaLabel={t(
                            "footer.instagram"
                        )}
                    >
                        <FaInstagram
                            size={24}
                            aria-hidden="true"
                        />
                    </ExternalLink>

                    <ExternalLink
                        href="https://youtube.com"
                        ariaLabel={t(
                            "footer.youtube"
                        )}
                    >
                        <FaYoutube
                            size={24}
                            aria-hidden="true"
                        />
                    </ExternalLink>

                    <ExternalLink
                        href="https://facebook.com"
                        ariaLabel={t(
                            "footer.facebook"
                        )}
                    >
                        <FaFacebookF
                            size={22}
                            aria-hidden="true"
                        />
                    </ExternalLink>

                    <ExternalLink
                        href="https://x.com"
                        ariaLabel={t(
                            "footer.x"
                        )}
                    >
                        <FaTwitter
                            size={22}
                            aria-hidden="true"
                        />
                    </ExternalLink>

                    <ExternalLink
                        href="https://www.apple.com/app-store/"
                        ariaLabel={t(
                            "footer.appStore"
                        )}
                    >
                        <span className="sr-only">
                            {t(
                                "footer.appStore"
                            )}
                        </span>
                    </ExternalLink>

                    <ExternalLink
                        href="https://play.google.com/store"
                        ariaLabel={t(
                            "footer.googlePlay"
                        )}
                    >
                        <span className="sr-only">
                            {t(
                                "footer.googlePlay"
                            )}
                        </span>
                    </ExternalLink>
                </div>
            </section>
        </footer>
    );
}
