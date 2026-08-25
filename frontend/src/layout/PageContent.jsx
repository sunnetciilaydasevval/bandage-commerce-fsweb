import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function PageContent({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />
            <main className="w-full flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}