import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    CircleUserRound,
    Camera,
    MessageCircle,
    BriefcaseBusiness,
    Phone,
    Mail,
    MapPin,
    Send,
} from "lucide-react";

import {
    FaInstagram,
    FaYoutube,
    FaFacebookF,
    FaTwitter,
} from "react-icons/fa";

const contactHero =
    "https://www.figma.com/api/mcp/asset/5581bbe5-5b26-443e-beeb-7bfac398a9c0.png";

const phoneNumber = "+12255550118";
const phoneDisplay = "(225) 555-0118";
const email = "michelle.rivera@example.com";

export default function Contact() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        if (isSubmitted) {
            setIsSubmitted(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = formData.name.trim();
        const emailValue = formData.email.trim();
        const message = formData.message.trim();

        if (!name || !emailValue || !message) {
            return;
        }

        setIsSubmitted(true);

        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    const handleTryItFree = () => {
        navigate("/signup");
    };

    return (
        <div className="font-['Montserrat',sans-serif] text-[#252b42]">
            {/* HERO */}
            <section className="mx-auto flex max-w-[1050px] flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-between md:py-24">
                <div className="max-w-[330px] text-center md:text-left">
                    <p className="mb-5 text-xs font-bold">
                        {t("contact.eyebrow")}
                    </p>

                    <h1 className="mb-5 text-[40px] font-bold leading-[50px]">
                        {t("contact.title")}
                    </h1>

                    <p className="mb-5 text-sm leading-5 text-[#737373]">
                        {t("contact.heroDescription")}
                    </p>

                    <a
                        href={`tel:${phoneNumber}`}
                        className="mb-2 block text-sm font-bold transition-colors hover:text-[#23a6f0]"
                    >
                        {t("contact.phoneLabel")} : {phoneDisplay}
                    </a>

                    <a
                        href={`mailto:${email}`}
                        className="mb-5 block text-sm font-bold transition-colors hover:text-[#23a6f0]"
                    >
                        {t("contact.emailLabel")} : {email}
                    </a>

                    <div className="flex justify-center gap-5 md:justify-start">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="transition-colors hover:text-[#23a6f0]"
                        >
                            <FaInstagram size={18} />
                        </a>

                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            className="transition-colors hover:text-[#23a6f0]"
                        >
                            <FaYoutube size={18} />
                        </a>

                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="transition-colors hover:text-[#23a6f0]"
                        >
                            <FaFacebookF size={17} />
                        </a>

                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X"
                            className="transition-colors hover:text-[#23a6f0]"
                        >
                            <FaTwitter size={18} />
                        </a>
                    </div>
                </div>

                <img
                    src={contactHero}
                    alt={t("contact.heroImageAlt")}
                    className="w-full max-w-[470px] object-contain"
                />
            </section>

            {/* CONTACT METHODS */}
            <section className="bg-[#fafafa] px-6 py-16">
                <p className="mb-3 text-center text-xs font-bold">
                    {t("contact.officeEyebrow")}
                </p>

                <h2 className="mx-auto mb-12 max-w-[400px] text-center text-[30px] font-bold leading-9">
                    {t("contact.officeTitle")}
                </h2>

                <div className="mx-auto flex max-w-[900px] flex-col justify-center gap-8 md:flex-row">
                    {/* PHONE */}
                    <div className="flex w-full flex-col items-center gap-4 bg-white px-8 py-12 text-center">
                        <Phone
                            size={48}
                            className="text-[#23a6f0]"
                        />

                        <p className="text-xs font-bold">
                            {phoneDisplay}
                            <br />
                            {t("contact.callDirectly")}
                        </p>

                        <strong className="text-sm">
                            {t("contact.getSupport")}
                        </strong>

                        <a
                            href={`tel:${phoneNumber}`}
                            className="rounded-full border border-[#23a6f0] px-5 py-2 text-xs text-[#23a6f0] transition-colors hover:bg-[#23a6f0] hover:text-white"
                        >
                            {t("contact.callNow")}
                        </a>
                    </div>

                    {/* EMAIL */}
                    <div className="flex w-full flex-col items-center gap-4 bg-[#252b42] px-8 py-12 text-center text-white">
                        <Mail
                            size={48}
                            className="text-[#23a6f0]"
                        />

                        <p className="text-xs font-bold">
                            {email}
                            <br />
                            {t("contact.emailReply")}
                        </p>

                        <strong className="text-sm">
                            {t("contact.getSupport")}
                        </strong>

                        <a
                            href={`mailto:${email}`}
                            className="rounded-full border border-[#23a6f0] px-5 py-2 text-xs text-[#23a6f0] transition-colors hover:bg-[#23a6f0] hover:text-white"
                        >
                            {t("contact.sendEmail")}
                        </a>
                    </div>

                    {/* LOCATION */}
                    <div className="flex w-full flex-col items-center gap-4 bg-white px-8 py-12 text-center">
                        <MapPin
                            size={48}
                            className="text-[#23a6f0]"
                        />

                        <p className="text-xs font-bold">
                            {t("contact.visitOffice")}
                            <br />
                            {t("contact.directions")}
                        </p>

                        <strong className="text-sm">
                            {t("contact.ourLocation")}
                        </strong>

                        <a
                            href="https://www.google.com/maps"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-[#23a6f0] px-5 py-2 text-xs text-[#23a6f0] transition-colors hover:bg-[#23a6f0] hover:text-white"
                        >
                            {t("contact.viewMap")}
                        </a>
                    </div>
                </div>
            </section>

            {/* CONTACT FORM */}
            <section className="mx-auto max-w-[700px] px-6 py-20">
                <div className="mb-10 text-center">
                    <Send className="mx-auto mb-5 text-[#23a6f0]" />

                    <p className="mb-3 text-xs font-bold">
                        {t("contact.formEyebrow")}
                    </p>

                    <h2 className="text-[32px] font-bold">
                        {t("contact.formTitle")}
                    </h2>
                </div>

                {isSubmitted && (
                    <div
                        role="status"
                        className="mb-6 rounded-md bg-green-50 px-5 py-4 text-center text-sm font-bold text-green-700"
                    >
                        {t("contact.successMessage")}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-xs font-bold"
                        >
                            {t("contact.name")}
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t("contact.yourName")}
                            required
                            className="w-full rounded-md border border-[#dddddd] px-4 py-3 text-sm outline-none transition-colors focus:border-[#23a6f0]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-xs font-bold"
                        >
                            {t("contact.email")}
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t("contact.yourEmail")}
                            required
                            className="w-full rounded-md border border-[#dddddd] px-4 py-3 text-sm outline-none transition-colors focus:border-[#23a6f0]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="mb-2 block text-xs font-bold"
                        >
                            {t("contact.message")}
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={t("contact.howCanWeHelp")}
                            rows={6}
                            required
                            className="w-full resize-none rounded-md border border-[#dddddd] px-4 py-3 text-sm outline-none transition-colors focus:border-[#23a6f0]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#23a6f0] px-8 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
                    >
                        {t("contact.submit")}
                    </button>
                </form>
            </section>

            {/* SOCIAL LINKS */}
            <section className="flex flex-col items-center px-6 py-20 text-center">
                <div className="mb-6 flex items-center gap-5 text-[#23a6f0]">
                    <CircleUserRound size={18} />
                    <Camera size={18} />
                    <MessageCircle size={18} />
                    <BriefcaseBusiness size={18} />
                </div>

                <p className="mb-3 text-xs font-bold">
                    {t("contact.bottomEyebrow")}
                </p>

                <h2 className="mb-5 text-[32px] font-bold">
                    {t("contact.bottomTitle")}
                </h2>

                <button
                    type="button"
                    onClick={handleTryItFree}
                    className="bg-[#23a6f0] px-8 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
                >
                    {t("contact.tryItFree")}
                </button>
            </section>
        </div>
    );
}
