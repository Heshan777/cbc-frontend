import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";
import UpdateProductPage from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import AdminUsersPage from "./admin/usersPage";
import Dashboard from "./admin/Dashboard";

export default function AdminPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userLoaded, setUserLoaded] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("Please login to access admin panel");
            navigate("/login");
            return;
        }
        axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.data.role !== "admin") {
                toast.error("You are not authorized to access admin panel");
                navigate("/");
                return;
            }
            setUserLoaded(true);
        }).catch(() => {
            toast.error("Session expired. Please login again");
            localStorage.removeItem("token");
            window.location.href = "/login";
        });
    }, []);

    const navLinks = [
        { path: "/admin", label: "Dashboard", icon: <FaChartLine /> },
        { path: "/admin/orders", label: "Orders", icon: <MdShoppingCartCheckout className="text-xl" /> },
        { path: "/admin/products", label: "Products", icon: <BsBox2Heart /> },
        { path: "/admin/users", label: "Users", icon: <HiOutlineUsers /> }
    ];

    const isActive = (path) => {
        if (path === "/admin" && location.pathname === "/admin") return true;
        return location.pathname.startsWith(path) && path !== "/admin";
    };

    return (
        <div className="w-full h-screen bg-gradient-to-br from-primary to-white flex flex-col md:flex-row relative text-secondary transition-all duration-300">
            {/* Mobile topbar */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 shadow bg-primary sticky top-0 z-30">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="CBC - Crystal Beauty Clear" className="h-8 bg-amber-600"  />
                    <span className="font-bold text-lg text-white bg-amber-700">Admin Panel</span>
                </div>
                <button aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
                    <FiMenu className="text-2xl text-white" />
                </button>
            </div>
            {/* Sidebar */}
            <aside className={`fixed md:static top-0 left-0 z-40 bg-primary h-screen w-64 transform transition-transform duration-300
                flex-shrink-0 shadow-lg border-r md:border-none
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} >
                <div className="flex flex-col h-full py-5 px-4 gap-4">
                    <div className="flex items-center gap-3 mb-6">
                        <img src="/logo.png" alt="CBC - Crystal Beauty Clear" className="h-10" />
                        <span className="text-white bg-amber-500 text-xl font-bold rounded p-0.5 m-0.5">Admin Panel</span>
                    </div>
                    <nav>
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium
                                    ${isActive(link.path)
                                        ? "bg-accent/90 text-white shadow"
                                        : "text-secondary hover:bg-secondary/10"
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <button
                        aria-label="Close sidebar"
                        className="md:hidden mt-auto p-2 self-end text-2xl text-white hover:text-accent"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <IoMdClose />
                    </button>
                    <div className="mt-auto text-xs text-secondary/70 text-center">
                        &copy; {new Date().getFullYear()} CBC Admin.
                    </div>
                </div>
                {/* Overlay for mobile */}
                <div
                    className={`absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-10 md:hidden
                        transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    onClick={() => setSidebarOpen(false)}
                />
            </aside>
            {/* Main Content */}
            <main className="flex-1 min-h-0 bg-white md:rounded-xl md:m-4 overflow-hidden shadow-lg border border-accent/20 relative">
                <div className="flex flex-col h-full w-full">
                    <div className="flex items-center px-6 py-3 border-b sticky top-0 bg-white z-20">
                        <h1 className="font-bold text-lg text-accent tracking-wide">
                            {navLinks.find(n => isActive(n.path))?.label || "Dashboard"}
                        </h1>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {userLoaded ? (
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/products" element={<AdminProductPage />} />
                                <Route path="/orders" element={<AdminOrdersPage />} />
                                <Route path="/add-product" element={<AddProductPage />} />
                                <Route path="/update-product" element={<UpdateProductPage />} />
                                <Route path="/users" element={<AdminUsersPage />} />
                            </Routes>
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
