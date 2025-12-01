// src/pages/orderHistory.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import { HiArrowRight, HiOutlineExclamationCircle } from "react-icons/hi"; // Added error icon

// --- Helper Utilities ---
const formatLKR = (n) =>
	new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(
		n ?? 0
	);

const getStatusBadge = (status) => {
	const base =
		"inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
	switch ((status || "").toLowerCase()) {
		case "completed":
			return `${base} bg-green-100 text-green-700`;
		case "cancelled":
			return `${base} bg-red-100 text-red-700`;
		default:
			return `${base} bg-accent/10 text-accent`;
	}
};

// --- Reusable Error State Component ---
function ErrorState({ message }) {
	return (
		<div className="w-full text-center p-10 bg-white rounded-lg shadow-sm border border-red-200">
			<HiOutlineExclamationCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
			<h3 className="text-lg font-semibold text-secondary mb-2">
				An Error Occurred
			</h3>
			<p className="text-secondary/70">{message}</p>
		</div>
	);
}

// --- Main Page Component ---
export default function OrderHistoryPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null); // <-- FIX: Add error state
	const navigate = useNavigate();

	useEffect(() => {
		const fetchOrders = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				toast.error("Please log in to view your orders.");
				navigate("/login");
				return;
			}
			try {
				setLoading(true);
				setError(null); // Reset error on new fetch
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/api/orders/my-orders`,
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				setOrders(response.data);
			} catch (err) {
				console.error("Failed to fetch orders:", err);
				toast.error("Failed to load order history.");
				setError("We couldn't load your orders. Please try again later."); // <-- FIX: Set error state
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, [navigate]);

	// --- FIX: New render logic to show only one state ---
	const renderContent = () => {
		if (loading) {
			return <Loader />;
		}

		if (error) {
			return <ErrorState message={error} />;
		}

		if (orders.length > 0) {
			return (
				<div className="space-y-4">
					{orders.map((order) => (
						<Link
							key={order.orderID}
							to={`/orders/${order.orderID}`}
							className="block bg-white rounded-xl shadow border border-secondary/10 p-5 hover:shadow-lg hover:border-accent/50 transition-all"
						>
							<div className="flex flex-wrap justify-between items-center gap-4">
								<div>
									<p className="font-semibold text-secondary break-all">
										Order ID: {order.orderID}
									</p>
									<p className="text-sm text-secondary/60">
										{new Date(order.date).toLocaleDateString()}
									</p>
								</div>
								<div className="text-right flex-shrink-0">
									<p className="font-semibold text-accent">
										{formatLKR(order.total)}
									</p>
									<span className={getStatusBadge(order.status)}>
										{order.status}
									</span>
								</div>
								<HiArrowRight className="text-accent/60 ml-4 flex-shrink-0" />
							</div>
						</Link>
					))}
				</div>
			);
		}

		// This now only shows if loading is false, there is no error, AND orders are empty.
		return (
			<div className="text-center py-10 bg-white rounded-lg shadow-sm border border-secondary/10">
				<p className="text-secondary/70">You haven't placed any orders yet.</p>
			</div>
		);
	};

	return (
		<div className="w-full min-h-[calc(100vh-100px)] bg-primary text-secondary py-12 lg:py-16 px-6">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl lg:text-4xl font-bold text-secondary tracking-tight mb-8">
					My Orders
				</h1>
				{renderContent()}
			</div>
		</div>
	);
}