import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderModal from "../../components/orderInfoModal";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token");
            if (token == null) {
                navigate("/login");
                return;
            }
            axios
                .get(import.meta.env.VITE_API_URL + "/api/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                .then((response) => {
                    setOrders(response.data);
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    return (
        <div className="w-full min-h-full bg-gradient-to-br from-primary via-white to-gray-200 transition-all duration-500">
            {/* Modal */}
            <OrderModal
                isModalOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                selectedOrder={selectedOrder}
                refresh={() => setIsLoading(true)}
            />
            
            {/* Page container */}
            <div className="mx-auto max-w-7xl py-10 px-4 md:px-8">
                {/* Card */}
                <div className="rounded-3xl border border-secondary/10 bg-white/75 shadow-xl backdrop-blur-md overflow-hidden">
                    {/* Header bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-secondary/10 px-8 py-6 bg-white/80 sticky top-0 z-20">
                        <h1 className="text-xl font-bold text-accent tracking-wide flex items-center gap-2">
                            <span className="inline-block w-2 h-7 rounded-full bg-accent/40 mr-2"></span>
                            Orders
                        </h1>
                        <span className="rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent ring-1 ring-accent/20 shadow">
                            {orders.length} orders
                        </span>
                    </div>

                    {/* Table wrapper for responsive scrolling */}
                    <div className="w-full overflow-x-auto">
                        {isLoading ? (
                            <div className="w-full flex flex-col items-center justify-center py-32">
                                <Loader />
                                <div className="mt-4 text-secondary/50 font-medium tracking-wide">Loading orders...</div>
                            </div>
                        ) : (
                            <table className="w-full min-w-[920px] text-left border-separate border-spacing-y-2 transition-all duration-500">
                                <thead className="bg-gradient-to-l from-secondary to-accent text-white shadow-sm rounded-lg">
                                    <tr>
                                        <th className="sticky top-0 z-10 px-4 py-3 text-xs font-bold uppercase tracking-[.1em] bg-secondary/80 rounded-tl-xl">Order ID</th>
                                        <th className="sticky top-0 z-10 px-4 py-3 text-xs font-bold uppercase tracking-[.1em] bg-secondary/80">Items</th>
                                        <th className="sticky top-0 z-10 px-4 py-3 text-xs font-bold uppercase tracking-[.1em] bg-secondary/80">Customer</th>
                                        <th className="sticky top-0 z-10 px-4 py-3 text-xs font-bold uppercase tracking-[.1em] bg-secondary/80">Email</th>
                                        <th className="sticky top-0 z-10 px-4 py-3 text-xs font-bold uppercase tracking-[.1em] bg-secondary/80">Phone</th>
                                        <th className="sticky top-0 z-10 px-4 py-3 text-xs font-bold uppercase tracking-[.1em] bg-secondary/80">Address</th>
                                        <th className="sticky top-0 z-10 px-4 py-3 text-xs font-bold uppercase tracking-[.1em] bg-secondary/80">Total</th>
                                        <th className="sticky top-0 z-10 px-4 py-3 text-xs font-bold uppercase tracking-[.1em] bg-secondary/80 text-center">Status</th>
                                        <th className="sticky top-0 z-10 px-4 py-3 text-xs font-bold uppercase tracking-[.1em] bg-secondary/80 text-center rounded-tr-xl">Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map((item) => (
                                        <tr
                                            key={item.orderID}
                                            className="hover:-translate-y-[2px] hover:scale-[1.01] hover:bg-accent/5 group transition-all duration-200 rounded-lg shadow cursor-pointer"
                                            onClick={() => {
                                                setSelectedOrder(item);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            <td className="px-4 py-3 font-mono text-sm text-secondary/80 font-semibold group-hover:text-accent transition-colors">{item.orderID}</td>
                                            <td className="px-4 py-3 font-medium text-secondary">{item.items.length} items</td>
                                            <td className="px-4 py-3 font-medium text-secondary">{item.customerName}</td>
                                            <td className="px-4 py-3 font-medium text-secondary">{item.email}</td>
                                            <td className="px-4 py-3 text-secondary/70">{item.phone}</td>
                                            <td className="px-4 py-3">{item.address}</td>
                                            <td className="px-4 py-3 font-mono font-semibold text-accent">
                                                LKR {item.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${item.status === "Completed" ? "bg-green-100 text-green-700" : item.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-secondary/20 text-secondary"}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center font-mono text-secondary/80">
                                                {new Date(item.date).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-4 py-16 text-center text-secondary/60 font-semibold"
                                                colSpan={9}
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <svg width="64" height="64" className="mx-auto opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12v7.5a1.5 1.5 0 01-1.5 1.5h-12a1.5 1.5 0 01-1.5-1.5v-12a1.5 1.5 0 011.5-1.5H6m4.5 0H18m0 0v4.5m0-4.5L9 15.75"></path></svg>
                                                    No orders to display.
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
