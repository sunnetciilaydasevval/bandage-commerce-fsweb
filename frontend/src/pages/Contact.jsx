import { useState } from "react";
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
        // Placeholder until the free-trial flow is implemented.
        console.log("Try it free now clicked");
    };

    return (
        <div className="font-['Montserrat',sans-serif] text-[#252b42]">
            {/* HERO */}
            <section className="mx-auto flex max-w-[1050px] flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-between md:py-24">
                <div className="max-w-[330px] text-center md:text-left">
                    <p className="mb-5 text-xs font-bold">
                        CONTACT US
                    </p>

                    <h1 className="mb-5 text-[40px] font-bold leading-[50px]">
                        Get in touch today!
                    </h1>

                    <p className="mb-5 text-sm leading-5 text-[#737373]">
                        We know how large objects will act, but
                        things on a small scale just do not act
                        that way.
                    </p>

                    <a
                        href={`tel:${phoneNumber}`}
                        className="mb-2 block text-sm font-bold transition-colors hover:text-[#23a6f0]"
                    >
                        Phone : {phoneDisplay}
                    </a>

                    <a
                        href={`mailto:${email}`}
                        className="mb-5 block text-sm font-bold transition-colors hover:text-[#23a6f0]"
                    >
                        Email : {email}
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
                    alt="Family shopping"
                    className="w-full max-w-[470px] object-contain"
                />
            </section>

            {/* CONTACT METHODS */}
            <section className="bg-[#fafafa] px-6 py-16">
                <p className="mb-3 text-center text-xs font-bold">
                    VISIT OUR OFFICE
                </p>

                <h2 className="mx-auto mb-12 max-w-[400px] text-center text-[30px] font-bold leading-9">
                    We help small businesses with big ideas
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
                            Call us directly
                        </p>

                        <strong className="text-sm">
                            Get Support
                        </strong>

                        <a
                            href={`tel:${phoneNumber}`}
                            className="rounded-full border border-[#23a6f0] px-5 py-2 text-xs text-[#23a6f0] transition-colors hover:bg-[#23a6f0] hover:text-white"
                        >
                            Call Now
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
                            We reply as soon as possible
                        </p>

                        <strong className="text-sm">
                            Get Support
                        </strong>

                        <a
                            href={`mailto:${email}`}
                            className="rounded-full border border-[#23a6f0] px-5 py-2 text-xs text-[#23a6f0] transition-colors hover:bg-[#23a6f0] hover:text-white"
                        >
                            Send Email
                        </a>
                    </div>

                    {/* LOCATION */}
                    <div className="flex w-full flex-col items-center gap-4 bg-white px-8 py-12 text-center">
                        <MapPin
                            size={48}
                            className="text-[#23a6f0]"
                        />

                        <p className="text-xs font-bold">
                            Visit our office
                            <br />
                            Contact us for directions
                        </p>

                        <strong className="text-sm">
                            Our Location
                        </strong>

                        <a
                            href="https://www.google.com/maps"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-[#23a6f0] px-5 py-2 text-xs text-[#23a6f0] transition-colors hover:bg-[#23a6f0] hover:text-white"
                        >
                            View Map
                        </a>
                    </div>
                </div>
            </section>

            {/* CONTACT FORM */}
            <section className="mx-auto max-w-[700px] px-6 py-20">
                <div className="mb-10 text-center">
                    <Send className="mx-auto mb-5 text-[#23a6f0]" />

                    <p className="mb-3 text-xs font-bold">
                        SEND US A MESSAGE
                    </p>

                    <h2 className="text-[32px] font-bold">
                        Let's Talk
                    </h2>
                </div>

                {isSubmitted && (
                    <div
                        role="status"
                        className="mb-6 rounded-md bg-green-50 px-5 py-4 text-center text-sm font-bold text-green-700"
                    >
                        Thank you! Your message has been
                        received successfully.
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
                            Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="w-full rounded-md border border-[#dddddd] px-4 py-3 text-sm outline-none transition-colors focus:border-[#23a6f0]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-xs font-bold"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            required
                            className="w-full rounded-md border border-[#dddddd] px-4 py-3 text-sm outline-none transition-colors focus:border-[#23a6f0]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="mb-2 block text-xs font-bold"
                        >
                            Message
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="How can we help?"
                            rows={6}
                            required
                            className="w-full resize-none rounded-md border border-[#dddddd] px-4 py-3 text-sm outline-none transition-colors focus:border-[#23a6f0]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#23a6f0] px-8 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
                    >
                        Submit
                    </button>
                </form>
            </section>

            {/* SOCIAL / PLACEHOLDER */}
            <section className="flex flex-col items-center px-6 py-20 text-center">
                <div className="mb-6 flex items-center gap-5 text-[#23a6f0]">
                    <CircleUserRound size={18} />
                    <Camera size={18} />
                    <MessageCircle size={18} />
                    <BriefcaseBusiness size={18} />
                </div>

                <p className="mb-3 text-xs font-bold">
                    WE CAN'T WAIT TO MEET YOU
                </p>

                <h2 className="mb-5 text-[32px] font-bold">
                    Let's Talk
                </h2>

                <button
                    type="button"
                    onClick={handleTryItFree}
                    className="bg-[#23a6f0] px-8 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
                >
                    Try it free now
                </button>
            </section>
        </div>
    );
}
