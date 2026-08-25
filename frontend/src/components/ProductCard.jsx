import { Link } from "react-router-dom";

export default function ProductCard({ product, compact = false }) {
    const colorClasses = ["bg-[#23a6f0]", "bg-[#2dc071]", "bg-[#e77c40]", "bg-[#252b42]"];
    return (
        <article className={`flex w-full flex-col bg-white ${compact ? "max-w-[239px]" : "max-w-[239px]"}`}>
            <Link to={`/product?item=${product.id}`} className="block overflow-hidden">
                <img src={product.image} alt={product.name} className="aspect-[0.82] w-full object-cover transition-transform duration-300 hover:scale-105" />
            </Link>
            <div className="flex flex-col gap-2 px-5 py-6">
                <Link to={`/product?item=${product.id}`} className="text-[14px] font-bold leading-6 tracking-[0.2px] text-[#252b42]">{product.name}</Link>
                <p className="text-[14px] leading-5 tracking-[0.2px] text-[#737373]">{product.category}</p>
                <p className="flex gap-2 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#bdbdbd]">{product.previousPrice && <span className="line-through">{product.previousPrice}</span>}<span className="text-[#23856d]">{product.price}</span></p>
                <div className="flex gap-1.5 pt-1" aria-label="Available colors">
                    {colorClasses.map(colorClass => <span key={colorClass} className={`h-4 w-4 rounded-full ${colorClass}`} />)}
                </div>
            </div>
        </article>
    );
}