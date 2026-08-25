const contactIcons = {
    phone: "https://www.figma.com/api/mcp/asset/9b97e6fb-142b-4d05-9c11-1b199f28e633.svg",
    map: "https://www.figma.com/api/mcp/asset/09c50cb3-fe39-4c09-bf1a-b33f3fc2635d.svg",
    email: "https://www.figma.com/api/mcp/asset/09f30989-407c-411e-981c-49ca10b6723a.svg",
};
const socialIcons = [
    "https://www.figma.com/api/mcp/asset/5bd1c330-a9df-4b89-aed4-fed3a0937f32.svg",
    "https://www.figma.com/api/mcp/asset/59d0e95d-cfe4-470d-9901-422d83288c45.svg",
    "https://www.figma.com/api/mcp/asset/99e28dfc-86a0-462a-b8a7-31e5b318a407.svg",
    "https://www.figma.com/api/mcp/asset/a02f65d4-3936-4cb5-9f19-e3468a6469da.svg",
];
const linkGroups = [
    ["Company Info", ["About Us", "Carrier", "We are hiring", "Blog"]],
    ["Legal", ["About Us", "Carrier", "We are hiring", "Blog"]],
    ["Features", ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"]],
    ["Resources", ["IOS & Android", "Watch a Demo", "Customers", "API"]],
];

function ContactRow({ icon, children }) {
    return <div className="flex items-center gap-2.5"><img src={icon} alt="" className="h-6 w-6 object-contain" /><span>{children}</span></div>;
}

export default function Footer() {
    return (
        <footer className="font-['Montserrat',sans-serif]">
            <section className="flex flex-col items-start gap-[50px] bg-[#fafafa] px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-[13.5%] lg:py-8">
                <div>
                    <h2 className="text-[24px] font-bold leading-8 tracking-[0.1px] text-[#252b42]">Consulting Agency For Your Business</h2>
                    <p className="text-[14px] leading-5 tracking-[0.2px] text-[#737373]">the quick fox jumps over the lazy dog</p>
                </div>
                <a href="/contact" className="rounded-[5px] bg-[#23a6f0] px-10 py-[15px] text-center text-[14px] font-bold leading-[22px] tracking-[0.2px] text-white">Contact Us</a>
            </section>
            <section className="flex flex-col gap-[30px] bg-white px-6 py-[50px] sm:flex-row sm:flex-wrap lg:justify-between lg:px-[13.5%] lg:py-[40px]">
                {linkGroups.map(([title, links]) => <div key={title} className="flex flex-col gap-5"><h3 className="text-[16px] font-bold leading-6 tracking-[0.1px] text-[#252b42]">{title}</h3><div className="flex flex-col gap-2.5 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373]">{links.map(link => <a href="#" key={link}>{link}</a>)}</div></div>)}
                <div className="flex flex-col gap-5 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373]"><h3 className="text-[16px] text-[#252b42]">Get In Touch</h3><div className="flex flex-col gap-2.5"><ContactRow icon={contactIcons.phone}>(480) 555-0103</ContactRow><ContactRow icon={contactIcons.map}>4517 Washington Ave.</ContactRow><ContactRow icon={contactIcons.email}>debra.holt@example.com</ContactRow></div></div>
            </section>
            <section className="flex flex-col items-start gap-[50px] bg-[#fafafa] px-6 py-[25px] text-[14px] font-bold leading-6 tracking-[0.2px] text-[#737373] sm:flex-row sm:items-center sm:justify-between lg:px-[13.5%] lg:py-[22px]"><p>Made With Love By Figmaland All Right Reserved</p><div className="flex items-center gap-5">{socialIcons.map((icon, index) => <img key={icon} src={icon} alt={`Social media ${index + 1}`} className="h-6 w-6 object-contain" />)}</div></section>
        </footer>
    );
}