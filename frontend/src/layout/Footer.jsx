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

const linkGroups = [
    ["Company Info", ["About Us", "Carrier", "We are hiring", "Blog"]],
    ["Legal", ["About Us", "Carrier", "We are hiring", "Blog"]],
    [
        "Features",
        ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"],
    ],
    ["Resources", ["IOS & Android", "Watch a Demo", "Customers", "API"]],
];

function ContactRow({ icon: Icon, children }) {
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

export default function Footer() {
    return (
        <footer className="font-['Montserrat',sans-serif]">
            {/* CTA Section */}
            <section className="flex flex-col items-start gap-[50px] bg-[#fafafa] px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-[13.5%] lg:py-8">
                <div>
                    <h2 className="text-[24px] font-bold leading-8 tracking-[0.1px] text-[#252b42]">
                        Consulting Agency For Your Business
                    </h2>

                    <p className="text-[14px] leading-5 tracking-[0.2px] text-[#737373]">
                        the quick fox jumps over the lazy dog
                    </p>
                </div>

                <a
                    href="/contact"
                    className="rounded-[5px] bg-[#23a6f0] px-10 py-[15px] text-center text-[14px] font-bold leading-[22px] tracking-[0.2px] text-white transition-colors hover:bg-[#1d96dc]"
                >
                    Contact Us
                </a>
            </section>

            {/* Links + Contact */}
            <section className="flex flex-col gap-[30px] bg-white px-6 py-[50px] sm:flex-row sm:flex-wrap lg:justify-between lg:px-[13.5%] lg:py-[40px]">
                {linkGroups.map(([title, links]) => (
                    <div
                        key={title}
                        className="flex flex-col gap-5"
                    >
                        <h3 className="text-[16px] font-bold leading-6 tracking-[0.1px] text-[#252b42]">
                            {title}
                        </h3>

                        <div className="flex flex-col gap-2.5 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373]">
                            {links.map((link) => (
                                <a
                                    href="#"
                                    key={link}
                                    className="transition-colors hover:text-[#23a6f0]"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Contact */}
                <div className="flex flex-col gap-5 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373]">
                    <h3 className="text-[16px] font-bold text-[#252b42]">
                        Get In Touch
                    </h3>

                    <div className="flex flex-col gap-2.5">
                        <ContactRow icon={Phone}>
                            (480) 555-0103
                        </ContactRow>

                        <ContactRow icon={MapPin}>
                            4517 Washington Ave.
                        </ContactRow>

                        <ContactRow icon={Mail}>
                            debra.holt@example.com
                        </ContactRow>
                    </div>
                </div>
            </section>

            {/* Bottom Bar */}
            <section className="flex flex-col items-start gap-[50px] bg-[#fafafa] px-6 py-[25px] text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373] sm:flex-row sm:items-center sm:justify-between lg:px-[13.5%] lg:py-[22px]">
                <p>
                    Made With Love By Figmaland All Right Reserved
                </p>

                <div className="flex items-center gap-5 text-[#23a6f0]">
                    <a
                        href="#"
                        aria-label="Instagram"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaInstagram
                            size={24}
                            aria-hidden="true"
                        />
                    </a>

                    <a
                        href="#"
                        aria-label="YouTube"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaYoutube
                            size={24}
                            aria-hidden="true"
                        />
                    </a>

                    <a
                        href="#"
                        aria-label="Facebook"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaFacebookF
                            size={22}
                            aria-hidden="true"
                        />
                    </a>

                    <a
                        href="#"
                        aria-label="Twitter"
                        className="transition-opacity hover:opacity-70"
                    >
                        <FaTwitter
                            size={22}
                            aria-hidden="true"
                        />
                    </a>
                </div>
            </section>
        </footer>
    );
}
