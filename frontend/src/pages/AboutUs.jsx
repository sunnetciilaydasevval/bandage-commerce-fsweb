import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const aboutHero =
    "https://www.figma.com/api/mcp/asset/c7dc537d-ecfc-4ae4-901d-a3661f808212.png";

const videoImage =
    "https://www.figma.com/api/mcp/asset/70983b6b-7632-4801-93bf-e46e015b01bd.png";

const stats = [
    ["15K", "about.stats.happyCustomers"],
    ["150K", "about.stats.monthlyVisitors"],
    ["15", "about.stats.countriesWorldwide"],
    ["100+", "about.stats.topPartners"],
];

export default function AboutUs() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGetQuote = () => {
        navigate("/contact");
    };

    return (
        <div className="font-['Montserrat',sans-serif] text-[#252b42]">
            <section className="mx-auto flex max-w-[1050px] flex-col items-center gap-10 px-6 py-16 md:flex-row md:justify-between md:py-24">
                <div className="max-w-[430px] text-center md:text-left">
                    <p className="mb-5 text-xs font-bold">
                        {t("about.eyebrow")}
                    </p>

                    <h1 className="mb-5 text-[40px] font-bold leading-[50px]">
                        {t("about.title")}
                    </h1>

                    <p className="mb-6 text-sm leading-5 text-[#737373]">
                        {t("about.heroDescription")}
                    </p>

                    <button
                        type="button"
                        onClick={handleGetQuote}
                        className="bg-[#23a6f0] px-8 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
                    >
                        {t("about.getQuote")}
                    </button>
                </div>

                <img
                    src={aboutHero}
                    alt={t("about.heroImageAlt")}
                    className="w-full max-w-[470px] object-contain"
                />
            </section>

            <section className="mx-auto flex max-w-[900px] flex-col gap-8 px-6 py-16 md:flex-row md:items-start md:justify-between">
                <div className="max-w-[360px]">
                    <p className="mb-3 text-xs text-[#e74040]">
                        {t("about.problemsEyebrow")}
                    </p>

                    <h2 className="text-[24px] font-bold leading-8">
                        {t("about.problemsTitle")}
                    </h2>
                </div>

                <p className="max-w-[400px] text-sm leading-5 text-[#737373]">
                    {t("about.problemsDescription")}
                </p>
            </section>

            <section className="flex flex-wrap justify-center gap-12 px-6 py-16">
                {stats.map(([value, labelKey]) => (
                    <div key={value} className="w-[150px] text-center">
                        <strong className="block text-[40px] font-bold leading-[50px]">
                            {value}
                        </strong>

                        <span className="text-xs text-[#737373]">
                            {t(labelKey)}
                        </span>
                    </div>
                ))}
            </section>

            <section className="mx-auto max-w-[1050px] px-6 py-12">
                <div className="relative overflow-hidden rounded-md">
                    <img
                        src={videoImage}
                        alt={t("about.videoImageAlt")}
                        className="h-[300px] w-full object-cover md:h-[470px]"
                    />

                    <button
                        type="button"
                        aria-label={t("about.playVideo")}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#23a6f0] p-5 text-white"
                    >
                        <Play fill="currentColor" />
                    </button>
                </div>
            </section>
        </div>
    );
}
