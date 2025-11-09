// --- NEW IMPORTS (FOR SLIDER, COUNTDOWN, ICONS, NAVIGATION) ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Countdown from 'react-countdown';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { MagnifyingGlassIcon, TagIcon, BoltIcon } from "@heroicons/react/24/outline";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
// --- END NEW IMPORTS ---

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// YOUR COMPONENT IMPORTS
import Header from "../components/header";
import { ProductPage } from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckOutPage from "./checkout";
import { Loader } from "../components/loader"; 
import ProductCard from "../components/productCard";
import AboutPage from "./aboutPage";
import ContactPage from "./contactPage";

// ICONS
import { 
    TruckIcon, 
    ShieldCheckIcon, 
    SparklesIcon,
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    StarIcon
} from "@heroicons/react/24/outline";

// --- SLIDER PROMOTION DATA (Update imageUrl if needed) ---
const sliderPromotions = [
    {
        title: "Up to 35% Off",
        subtitle: "On all new skincare arrivals this week!",
        imageUrl: "/images/first.png",
        link: "/products"
    },
    {
        title: "Flash Sale Live!",
        subtitle: "Get your favorites before they're gone.",
        imageUrl: "/images/second.jpg",
        link: "/products"
    },
    {
        title: "Free Shipping",
        subtitle: "On all orders over $50. Use code: CRISTAL",
        imageUrl: "/images/third.jpg",
        link: "/cart"
    }
];

// --- PROMO BANNER DATA ---
const promoBanners = [
    { title: "Exclusive Vouchers", icon: TagIcon, link: "/products" },
    { title: "New Arrivals", icon: SparklesIcon, link: "/products" },
    { title: "Free Shipping", icon: TruckIcon, link: "/products" },
];

// --- FLASH SALE DATA ---
const flashSaleProduct = {
    name: "Luxury Glow Serum",
    imageUrl: "/images/bg.jpg",
    price: 45.00,
    oldPrice: 60.00,
    link: "/overview/123"
};
const flashSaleEndTime = Date.now() + 1000 * 60 * 60 * 2;

const ABOUT_IMAGE_URL = "https://images.unsplash.com/photo-1620916566398-39a11420E212?auto=format&fit=crop&q=80&w=1964";

function HomeContent() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + "/api/products?limit=4");
                setFeaturedProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching featured products:", error);
                toast.error("Failed to load featured products");
                setIsLoading(false);
            }
        };
        fetchFeaturedProducts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/products');
    };

    const countdownRenderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span className="text-2xl font-bold text-secondary">Sale Ended</span>;
        } else {
            return (
                <div className="flex gap-2">
                    <span className="flex items-center justify-center h-12 w-12 bg-white text-secondary font-bold text-xl rounded-md">{String(hours).padStart(2, '0')}</span>
                    <span className="text-xl text-secondary font-bold">:</span>
                    <span className="flex items-center justify-center h-12 w-12 bg-white text-secondary font-bold text-xl rounded-md">{String(minutes).padStart(2, '0')}</span>
                    <span className="text-xl text-secondary font-bold">:</span>
                    <span className="flex items-center justify-center h-12 w-12 bg-white text-secondary font-bold text-xl rounded-md">{String(seconds).padStart(2, '0')}</span>
                </div>
            );
        }
    };

    return (
        <div className="w-full">
            {/* === 1. SIDE-BY-SIDE SLIDER (Image left, Text/Button right) === */}
            <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                effect="fade"
                loop={true}
                className="w-full h-[60vh] md:h-[70vh] bg-secondary"
            >
                {sliderPromotions.map((promo, index) => (
                    <SwiperSlide key={index} className="relative">
                        <div className="flex items-center h-full w-full bg-white">
                            {/* Left: Image */}
                            <div className="flex-shrink-0 w-2/3 h-full flex items-center justify-center">
                                <img
                                    src={promo.imageUrl}
                                    alt={promo.title}
                                    className="object-contain h-[45vh] md:h-[55vh] w-full"
                                />
                            </div>
                            {/* Right: Text + Button */}
                            <div className="flex flex-col items-center justify-center w-1/3 h-full pr-8">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">
                                    {promo.title}
                                </h1>
                                <p className="text-lg text-secondary mb-8">
                                    {promo.subtitle}
                                </p>
                                <Link
                                    to={promo.link}
                                    className="bg-accent text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* === 2. PROMINENT SEARCH BAR === */}
            <div className="bg-white shadow-md -mt-4 relative z-10 container mx-auto rounded-lg p-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <input 
                            type="text"
                            placeholder="Search in Cristal Clear Beauty..."
                            className="w-full h-12 px-5 pr-12 rounded-md border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent"
                            onFocus={() => navigate('/products')}
                        />
                        <button type="submit" className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-white bg-accent rounded-r-md hover:bg-orange-600">
                            <MagnifyingGlassIcon className="h-6 w-6" />
                        </button>
                    </div>
                </form>
            </div>

            {/* === 3. PROMO BANNERS === */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {promoBanners.map((banner) => (
                        <Link 
                            key={banner.title} 
                            to={banner.link} 
                            className="group flex items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <banner.icon className="h-10 w-10 text-accent mr-4"/>
                            <div>
                                <h3 className="text-lg font-semibold text-secondary group-hover:text-accent transition-colors">{banner.title}</h3>
                                <p className="text-secondary/70 text-sm">Shop Now &rarr;</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* === 4. FLASH SALE === */}
            <div className="container mx-auto px-4 pb-16">
                <div className="bg-gradient-to-r from-accent/80 to-accent/90 rounded-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center shadow-2xl">
                    {/* Column 1: Title & Timer */}
                    <div className="text-white text-center md:text-left">
                        <div className="flex justify-center md:justify-start items-center gap-3 mb-4">
                            <BoltIcon className="h-8 w-8"/>
                            <h2 className="text-3xl font-bold">Flash Sale!</h2>
                        </div>
                        <p className="text-lg mb-6">Hurry up! Deal ends in:</p>
                        <Countdown 
                            date={flashSaleEndTime} 
                            renderer={countdownRenderer} 
                        />
                    </div>
                    {/* Column 2 & 3: Product */}
                    <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
                        <img 
                            src={flashSaleProduct.imageUrl} 
                            alt={flashSaleProduct.name} 
                            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-md"
                        />
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-2xl font-bold text-secondary">{flashSaleProduct.name}</h3>
                            <div className="flex items-center justify-center md:justify-start gap-3 my-3">
                                <span className="text-3xl font-bold text-accent">${flashSaleProduct.price.toFixed(2)}</span>
                                <span className="text-xl text-gray-400 line-through">${flashSaleProduct.oldPrice.toFixed(2)}</span>
                            </div>
                            <Link
                                to={flashSaleProduct.link}
                                className="inline-block bg-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-300"
                            >
                                Add to Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* === 5. FEATURED PRODUCTS === */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center text-secondary mb-12">
                    Our Featured Products
                </h2>
                {isLoading ? <Loader /> : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((item) => (
                            <ProductCard key={item.productID} product={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* === 6. TRUST BAR (Unchanged) === */}
            <div className="container mx-auto px-4 py-12">
                {/* ... your trust bar code ... */}
            </div>

            {/* === 7. BRAND SNIPPET (Unchanged) === */}
            <div className="bg-white">
                {/* ... your brand snippet code ... */}
            </div>

            {/* === 8. TESTIMONIALS (Unchanged) === */}
            <div className="container mx-auto px-4 py-24">
                {/* ... your testimonials code ... */}
            </div>

            {/* === 9. NEWSLETTER CTA (Unchanged) === */}
            <div className="bg-secondary">
                {/* ... your newsletter cta code ... */}
            </div>

            {/* === 10. FOOTER SECTION (Superb Footage!) === */}
            <footer className="mt-14 bg-primary text-secondary border-t">
                <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and brand */}
                    <div className="flex items-center mb-6 md:mb-0">
                        <img src="/logo.png" alt="Brand Logo" className="h-10 mr-3"/>
                        <span className="font-bold text-lg tracking-wide">CRISTAL CLEAR BEAUTY</span>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="flex flex-wrap gap-8 text-base font-medium">
                        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                        <Link to="/products" className="hover:text-accent transition-colors">Products</Link>
                        <Link to="/about" className="hover:text-accent transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex gap-4 mt-6 md:mt-0">
                        <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17,2H7A5,5,0,0,0,2,7V17a5,5,0,0,0,5,5H17a5,5,0,0,0,5-5V7A5,5,0,0,0,17,2ZM19,17a2,2,0,0,1-2,2H17V13h-2v-2h2V9a2,2,0,0,1,2-2h2v2H19a1,1,0,0,0-1,1v2h2l-.54,2H18v4Z"/></svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M15,2H9A7,7,0,0,0,2,9v6a7,7,0,0,0,7,7h6a7,7,0,0,0,7-7V9A7,7,0,0,0,15,2Zm1.45,14.12A5.52,5.52,0,0,1,12,17.55a5.52,5.52,0,0,1-4.45-1.43A5.51,5.51,0,0,1,2.45,12,5.51,5.51,0,0,1,7.55,2.45,5.52,5.52,0,0,1,12,2.45a5.52,5.52,0,0,1,4.45,1.43A5.51,5.51,0,0,1,21.55,12,5.51,5.51,0,0,1,16.45,16.12Zm-1.62-7.77A4,4,0,1,1,12,8a4,4,0,0,1,1.83,.35Zm2-1.3a1,1,0,1,1,.93,.56A1,1,0,0,1,16.83,7.05Z"/></svg>
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:text-accent transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46,5.95a8.13,8.13,0,0,1-2.35.64A4.15,4.15,0,0,0,21.85,4.1a8.42,8.42,0,0,1-2.61,1A4.15,4.15,0,0,0,12,9.55a11.8,11.8,0,0,1-8.59-4.35,4.14,4.14,0,0,0-.56,2.09A4.15,4.15,0,0,0,3.9,13.6a4.15,4.15,0,0,1-1.87-.52v.05a4.15,4.15,0,0,0,3.32,4.08,4.17,4.17,0,0,1-1.86.07A4.15,4.15,0,0,0,9.14,19a8.33,8.33,0,0,1-5.13,1.76A11.75,11.75,0,0,0,7.65,22c7.61,0,11.77-6.3,11.77-11.77q0-.27,0-.54A8.59,8.59,0,0,0,22.46,5.95Z"/></svg>
                        </a>
                    </div>
                </div>
                <div className="text-center text-sm text-secondary/60 py-4 border-t">
                    &copy; {new Date().getFullYear()} Cristal Clear Beauty. All rights reserved.
                </div>
            </footer>
        </div>
    );
}


// --- PAGE COMPONENT EXPORT ---
export default function HomePage() {
    return (
        <div className="w-full h-full bg-primary">
            <Header />
            <Routes>
                <Route path="/" element={<HomeContent />} />
                <Route path="/products" element={<ProductPage/>} />
                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/about" element={<AboutPage/>} />
                <Route path="/overview/:id" element={<ProductOverview/>}/>
                <Route path="/*" element={<h1>404 Not Found</h1>} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckOutPage/>} />
            </Routes>
        </div>
    );
}
