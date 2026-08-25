import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const slides = [
    { image: "https://www.figma.com/api/mcp/asset/d4d4beeb-87cd-4f5d-bf27-f26f8abaca42.png", title: "NEW COLLECTION" },
    { image: "https://www.figma.com/api/mcp/asset/ae0942db-7ffd-48b9-bfc9-53d1f0a00e93.png", title: "VITA CLASSIC PRODUCT" },
];
const categoryImages = [
    "https://www.figma.com/api/mcp/asset/60b605e0-52d2-40b9-b537-265c68c33076.png",
    "https://www.figma.com/api/mcp/asset/07c14ef3-1d1d-4c5e-8392-5086a63a72c3.png",
    "https://www.figma.com/api/mcp/asset/cb527e5c-5783-4b98-a4ca-a707c1c22445.png",
];

export default function Home() {
    const [activeSlide, setActiveSlide] = useState(0);
    const slide = slides[activeSlide];
    return <div className="font-['Montserrat',sans-serif] text-[#252b42]">
        <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#23a6f0] px-10 py-20 text-white md:min-h-[620px] lg:min-h-[680px] lg:px-[12%]"><img src={slide.image} alt={slide.title} className="absolute inset-0 h-full w-full object-cover" /><div className="relative z-10 max-w-[470px] text-center md:text-left"><p className="mb-6 text-[14px] font-bold">SUMMER 2020</p><h1 className="mb-6 text-[40px] font-bold leading-[50px] tracking-[0.2px] md:text-[58px] md:leading-[80px]">{slide.title}</h1><p className="mb-8 text-[16px] leading-6 text-[#fafafa] md:text-[20px] md:leading-[30px]">We know how large objects will act, but things on a small scale just do not act that way.</p><button type="button" className="bg-[#2dc071] px-10 py-[15px] text-[14px] font-bold text-white">SHOP NOW</button></div><button type="button" aria-label="Previous slide" onClick={() => setActiveSlide((activeSlide + slides.length - 1) % slides.length)} className="absolute left-5 z-10"><ChevronLeft /></button><button type="button" aria-label="Next slide" onClick={() => setActiveSlide((activeSlide + 1) % slides.length)} className="absolute right-5 z-10"><ChevronRight /></button><div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">{slides.map((_, index) => <button key={index} type="button" aria-label={`Slide ${index + 1}`} onClick={() => setActiveSlide(index)} className={`h-1 w-8 ${index === activeSlide ? "bg-white" : "bg-white/50"}`} />)}</div></section>
        <section className="bg-[#fafafa] px-6 py-20"><SectionIntro title="EDITOR’S PICK" copy="Problems trying to resolve the conflict between" /><div className="mx-auto flex max-w-[1050px] flex-col gap-5 md:flex-row">{categoryImages.map((image, index) => <div key={image} className={`relative h-[260px] flex-1 overflow-hidden md:h-[330px] ${index === 0 ? "md:flex-[2]" : ""}`}><img src={image} alt="Collection" className="h-full w-full object-cover" /><span className="absolute bottom-6 left-6 bg-white px-8 py-3 text-[14px] font-bold">{["MEN", "WOMEN", "ACCESSORIES"][index]}</span></div>)}</div></section>
        <section className="bg-white px-6 py-20"><SectionIntro title="BESTSELLER PRODUCTS" copy="Problems trying to resolve the conflict between" /><div className="mx-auto flex max-w-[1050px] flex-wrap justify-center gap-4">{products.map(product => <ProductCard key={product.id} product={product} />)}</div></section>
        <section className="flex flex-col items-center gap-8 bg-[#23856d] px-6 py-16 text-white md:flex-row md:justify-center"><div className="max-w-[380px] text-center md:text-left"><p className="mb-4 text-xs font-bold">SUMMER 2020</p><h2 className="mb-4 text-[32px] font-bold leading-10">Vita Classic Product</h2><p className="mb-5 text-sm leading-5">We know how large objects will act, but things on a small scale just do not act that way.</p><button type="button" className="bg-white px-8 py-3 text-xs font-bold text-[#23856d]">BUY NOW</button></div><img src="https://www.figma.com/api/mcp/asset/b34fc066-38f8-4ab4-b9b7-fc164062079e.png" alt="Vita classic product" className="max-h-[310px] w-auto object-contain" /></section>
        <section className="mx-auto flex max-w-[1050px] flex-col items-center gap-10 px-6 py-20 md:flex-row"><img src="https://www.figma.com/api/mcp/asset/fcddf8d1-32a7-46ea-b90f-68ad89067b0a.png" alt="Featured product" className="w-full max-w-[520px] object-cover" /><div><p className="mb-3 text-xs font-bold text-[#23a6f0]">SUMMER 2020</p><h2 className="mb-4 text-[30px] font-bold leading-9">Part of the Neural Universe</h2><p className="mb-6 text-sm leading-5 text-[#737373]">We know how large objects will act, but things on a small scale just do not act that way.</p><button type="button" className="bg-[#23a6f0] px-8 py-3 text-xs font-bold text-white">SHOP NOW</button></div></section>
    </div>;
}

function SectionIntro({ title, copy }) { return <div className="mx-auto mb-12 max-w-[600px] text-center"><h2 className="mb-3 text-[24px] font-bold leading-8">{title}</h2><p className="text-sm leading-5 text-[#737373]">{copy}</p></div>; }