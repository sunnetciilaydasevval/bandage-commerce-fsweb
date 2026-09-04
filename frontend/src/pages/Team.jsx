import { useTranslation } from "react-i18next";
import { FaLinkedin } from "react-icons/fa";
import { clothingImages } from "../data/products";

const teamMembers = [
	{
		name: "Gökhan Özdemir",
		roleKey: "team.projectManager",
		image: clothingImages[0],
	},
	{
		name: "Ilayda",
		roleKey: "team.fullStackDeveloper",
		image: clothingImages[1],
	},
	{
		name: "Product Developer",
		roleKey: "team.productDevelopment",
		image: clothingImages[2],
	},
];

export default function Team() {
	const { t } = useTranslation();

	return (
		<main className="px-6 py-12 font-['Montserrat',sans-serif] text-[#252b42]">
			<h1 className="mb-12 text-center text-[32px] font-bold leading-10">
				{t("team.title")}
			</h1>

			<div className="mx-auto flex max-w-[1050px] flex-wrap justify-center gap-x-4 gap-y-12">
				{teamMembers.map((member) => (
					<article
						key={member.name}
						className="w-full max-w-[316px] text-center"
					>
						<img
							src={member.image}
							alt={t("team.profileAlt", {
								name: member.name,
							})}
							className="aspect-[1.37] w-full object-cover"
						/>

						<div className="flex flex-col items-center gap-2 p-6">
							<h2 className="text-sm font-bold">
								{member.name}
							</h2>

							<p className="text-xs font-bold text-[#737373]">
								{t(member.roleKey)}
							</p>

							<a
								href="https://www.linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label={t("team.linkedinLabel", {
									name: member.name,
								})}
								className="text-[#23a6f0] hover:text-[#1d91d0]"
							>
								<FaLinkedin size={18} />
							</a>
						</div>
					</article>
				))}
			</div>
		</main>
	);
}