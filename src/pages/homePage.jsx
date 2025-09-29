import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import { ProductPage } from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckOutPage from "./checkout";
 

export default function HomePage() {
    return (
        <div className="w-full h-full bg-primary">
            <Header />
            <Routes> {/* The 'path="/"' prop was removed from here */}
                <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
                <Route path="/products" element={<ProductPage/>} />
                <Route path="/contact" element={<h1>Contact Us</h1>} />
                <Route path="/about" element={<h1>About Us</h1>} />
                <Route path="/overview/:id" element={<ProductOverview/>}/>
                <Route path="/*" element={<h1>404 Not Found</h1>} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckOutPage/>} />
            </Routes>
        </div>
    );
}