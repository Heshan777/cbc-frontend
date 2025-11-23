// src/pages/orderDetails.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import {
	HiArrowLeft,
	HiOutlineMap,
	HiOutlineUser,
	HiOutlineCreditCard,
	HiOutlineExclamationCircle,
} from "react-icons/hi";

// --- Helper Utilities (from your orderInfoModal.jsx) ---

/**
 * Formats a number into LKR currency.
 */
const formatLKR = (n) =>
	new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(
		n ?? 0
	);

/**
 * Returns the Tailwind CSS class for an order status.
 */
const getStatusBadge = (status) => {
	const base =
		"inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
	switch ((status || "").toLowerCase()) {
		case "paid":
		case "completed":
			return `${base} bg-green-100 text-green-700 ring-1 ring-green-200`;
		case "shipped":
		case "processing":
			return `${base} bg-blue-100 text-blue-700 ring-1 ring-blue-200`;
		case "cancelled":
		case "canceled":
			return `${base} bg-red-100 text-red-700 ring-1 ring-red-200`;
		default:
			return `${base} bg-accent/10 text-accent ring-1 ring-accent/20`;
	}
};

// --- Page Component ---

export default function OrderDetailsPage() {
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { orderId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchOrder = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				toast.error("Please log in to view your orders.");
				navigate("/login");
				return;
			}

			try {
				setLoading(true);
				// This endpoint should be secure and only return the order if it belongs to the authenticated user
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setOrder(response.data);
				setError(null);
			} catch (err) {
				console.error("Failed to fetch order:", err);
				setError("Could not load your order. It may not exist or you may not have permission to view it.");
				toast.error("Failed to load order.");
			} finally {
				setLoading(false);
			}
		};

		fetchOrder();
	}, [orderId, navigate]);

	if (loading) {
		return (
			<div className="w-full min-h-[calc(100vh-100px)] bg-primary flex justify-center items-center">
				<Loader />
			</div>
		);
	}

	if (error) {
		return (
			<ErrorState message={error} />
		);
	}

	if (!order) {
		return (
			<ErrorState message="This order could not be found." />
		);
	}

	// Calculate totals (assuming shipping is free for this example)
	const subtotal = order.total;
	const shipping = 0.00;
	const total = subtotal + shipping;

	return (
		<div className="w-full min-h-[calc(100vh-100px)] bg-primary text-secondary py-12 lg:py-16 px-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<Link
						to="/orders" // Link to a new "Order History" page
						className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline mb-3"
					>
						<HiArrowLeft />
						Back to All Orders
					</Link>
					<h1 className="text-3xl lg:text-4xl font-bold text-secondary tracking-tight">
						Order Details
					</h1>
					<p className="mt-2 text-secondary/60 text-sm font-mono">
						Order ID: {order.orderID}
					</p>
				</div>

				{/* Top Summary Card */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl bg-white shadow-lg border border-secondary/10 p-6 mb-8">
					<div>
						<h3 className="text-sm font-semibold text-secondary/60">Order Date</h3>
						<p className="font-medium text-secondary">
							{new Date(order.date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</div>
					<div>
						<h3 className="text-sm font-semibold text-secondary/60">Status</h3>
						<p>
							<span className={getStatusBadge(order.status)}>{order.status}</span>
						</p>
					</div>
					<div>
						<h3 className="text-sm font-semibold text-secondary/60">Order Total</h3>
						<p className="font-bold text-lg text-accent">
							{formatLKR(order.total)}
						</p>
					</div>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column (Items) */}
					<div className="lg:col-span-2 space-y-6">
						<InfoCard title="Order Items" icon={<HiOutlineCreditCard />}>
							<ul className="divide-y divide-secondary/10">
								{order.items.map((item) => (
									<OrderItem key={item.productID} item={item} />
								))}
							</ul>
							
							{/* Totals Summary */}
							<div className="border-t border-secondary/10 pt-4 mt-4 space-y-2 text-sm">
								<TotalRow label="Subtotal" value={formatLKR(subtotal)} />
								<TotalRow label="Shipping" value={formatLKR(shipping)} />
								<div className="h-px bg-secondary/10 my-2"></div>
								<TotalRow label="Total" value={formatLKR(total)} isBold />
							</div>
						</InfoCard>
					</div>

					{/* Right Column (Shipping & Customer) */}
					<div className="space-y-6">
						<InfoCard title="Shipping Address" icon={<HiOutlineMap />}>
							<p className="text-secondary/90 leading-relaxed">
								{order.address}
							</p>
						</InfoCard>

						<InfoCard title="Customer Details" icon={<HiOutlineUser />}>
							<dl className="space-y-2 text-sm">
								<div className="flex justify-between">
									<dt className="text-secondary/60">Name</dt>
									<dd className="font-medium text-secondary">{order.customerName}</dd>
								</div>
								<div className="flex justify-between">
									<dt className="text-secondary/60">Email</dt>
									<dd className="font-medium text-secondary">{order.email}</dd>
								</div>
								<div className="flex justify-between">
									<dt className="text-secondary/60">Phone</dt>
									<dd className="font-medium text-secondary">{order.phone}</dd>
								</div>
							</dl>
						</InfoCard>
					</div>
				</div>
			</div>
		</div>
	);
}

// --- Reusable Sub-Components ---

/**
 * A reusable card component for displaying sections of information.
 */
function InfoCard({ title, icon, children }) {
	return (
		<div className="rounded-2xl bg-white shadow-lg border border-secondary/10">
			<div className="flex items-center gap-3 border-b border-secondary/10 px-5 py-4">
				<div className="text-accent">{React.cloneElement(icon, { className: "w-5 h-5" })}</div>
				<h2 className="text-lg font-semibold text-secondary">{title}</h2>
			</div>
			<div className="p-5">{children}</div>
		</div>
	);
}

/**
 * Renders a single item in the order list.
 */
function OrderItem({ item }) {
	return (
		<li className="flex items-center gap-4 py-4">
			<img
				src={item.image}
				alt={item.name}
				className="w-16 h-16 rounded-lg object-cover ring-1 ring-secondary/10"
			/>
			<div className="flex-grow">
				<p className="font-semibold text-secondary">{item.name}</p>
				<p className="text-sm text-secondary/60">
					{item.quantity} x {formatLKR(item.price)}
				</p>
			</div>
			<p className="font-semibold text-secondary">
				{formatLKR(item.quantity * item.price)}
			</p>
		</li>
	);
}

/**
 * Renders a row in the totals summary.
 */
function TotalRow({ label, value, isBold = false }) {
	return (
		<div className="flex justify-between items-center">
			<p className={isBold ? "font-semibold text-secondary" : "text-secondary/80"}>
				{label}
			</p>
			<p className={isBold ? "font-bold text-lg text-accent" : "font-medium text-secondary"}>
				{value}
			</p>
		</div>
	);
}

/**
 * Renders a reusable error state component.
 */
function ErrorState({ message }) {
	return (
		<div className="w-full min-h-[calc(100vh-100px)] bg-primary flex flex-col justify-center items-center text-center p-6">
			<HiOutlineExclamationCircle className="w-16 h-16 text-red-500 mb-4" />
			<h2 className="text-2xl font-semibold text-secondary mb-2">
				Oops! Something went wrong.
			</h2>
			<p className="text-secondary/70 mb-6">{message}</p>
			<Link
				to="/"
				className="px-5 py-2.5 rounded-xl bg-accent text-white font-semibold hover:opacity-90 transition shadow"
			>
				Back to Home
			</Link>
		</div>
	);
}