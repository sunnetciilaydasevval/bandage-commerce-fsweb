import { Play } from "lucide-react";
import { clothingImages } from "../data/products";

const aboutHero = "https://www.figma.com/api/mcp/asset/c7dc537d-ecfc-4ae4-901d-a3661f808212.png";
const videoImage = "https://www.figma.com/api/mcp/asset/70983b6b-7632-4801-93bf-e46e015b01bd.png";
const stats = [
    ["15K", "Happy Customers"],
    ["150K", "Monthly Visitors"],
    ["15", "Countries Worldwide"],
    ["100+", "Top Partners"],
];

export default function AboutUs() {
    const handleGetQuote = () => {
        // Placeholder until the quote flow is implemented.
        console.log("Get Quote Now clicked");
    };

    return (
        <div className="font-['Montserrat',sans-serif] text-[#252b42]">
            <section className="mx-auto flex max-w-[1050px] flex-col items-center gap-10 px-6 py-16 md:flex-row md:justify-between md:py-24">
                <div className="max-w-[430px] text-center md:text-left">
                    <p className="mb-5 text-xs font-bold">ABOUT US</p>

                    <h1 className="mb-5 text-[40px] font-bold leading-[50px]">
                        ABOUT US
                    </h1>

                    <p className="mb-6 text-sm leading-5 text-[#737373]">
                        We know how large objects will act, but things on a small scale
                        just do not act that way.
                    </p>

                    <button
                        type="button"
                        onClick={handleGetQuote}
                        className="bg-[#23a6f0] px-8 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
                    >
                        Get Quote Now
                    </button>
                </div>

                <img
                    src={aboutHero}
                    alt="Woman shopping"
                    className="w-full max-w-[470px] object-contain"
                />
            </section>

            <section className="mx-auto flex max-w-[900px] flex-col gap-8 px-6 py-16 md:flex-row md:items-start md:justify-between">
                <div className="max-w-[360px]">
                    <p className="mb-3 text-xs text-[#e74040]">Problems trying</p>

                    <h2 className="text-[24px] font-bold leading-8">
                        Met minim Mollie non desert Alamo est sit cliquey dolor do met
                        sent.
                    </h2>
                </div>

                <p className="max-w-[400px] text-sm leading-5 text-[#737373]">
                    Problems trying to resolve the conflict between the two major realms
                    of Classical physics: Newtonian mechanics.
                </p>
            </section>

            <section className="flex flex-wrap justify-center gap-12 px-6 py-16">
                {stats.map(([value, label]) => (
                    <div key={value} className="w-[150px] text-center">
                        <strong className="block text-[40px] font-bold leading-[50px]">
                            {value}
                        </strong>
                        <span className="text-xs text-[#737373]">{label}</span>
                    </div>
                ))}
            </section>

            <section className="mx-auto max-w-[1050px] px-6 py-12">
                <div className="relative overflow-hidden rounded-md">
                    <img
                        src={videoImage}
                        alt="Our story"
                        className="h-[300px] w-full object-cover md:h-[470px]"
                    />

                    <button
                        type="button"
                        aria-label="Play video"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#23a6f0] p-5 text-white"
                    >
                        <Play fill="currentColor" />
                    </button>
                </div>
            </section>
        </div>
    );
}
