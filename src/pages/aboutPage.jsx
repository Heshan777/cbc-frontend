import React from "react";
import { Link } from "react-router-dom";
import { FaGem, FaLeaf, FaStar, FaHeart } from "react-icons/fa";

export default function AboutPage() {
	const values = [
		{
			icon: <FaGem className="text-accent" size={32} />,
			title: "Uncompromising Quality",
			description:
				"We source only the finest ingredients and partner with top-tier labs to ensure every product is safe, effective, and luxurious.",
		},
		{
			icon: <FaLeaf className="text-accent" size={32} />,
			title: "Conscious Beauty",
			description:
				"Our commitment to the planet is real. We prioritize sustainable sourcing, eco-friendly packaging, and are 100% cruelty-free.",
		},
		{
			icon: <FaStar className="text-accent" size={32} />,
			title: "Customer-Centric",
			description:
				"You are at the heart of our brand. We are dedicated to providing a seamless shopping experience and exceptional customer support.",
		},
	];

	return (
		<div className="w-full min-h-[calc(100vh-100px)] bg-primary text-secondary">
			{/* Hero Section */}
			<div className="w-full bg-white text-center py-16 lg:py-24 px-6">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-4xl lg:text-6xl font-bold text-secondary tracking-tight">
						About Crystal Beauty Clear
					</h1>
					<p className="mt-6 text-lg lg:text-xl text-secondary/80">
						Glow on. Shop on. Discover the passion behind your favorite beauty
						picks.
					</p>
					<div className="mt-8 h-1.5 w-32 bg-accent rounded-full mx-auto" />
				</div>
			</div>

			{/* Our Story Section */}
			<div className="max-w-7xl mx-auto py-16 lg:py-24 px-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="order-2 lg:order-1">
						<h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-6">
							Our Story
						</h2>
						<p className="text-secondary/90 text-lg mb-4 leading-relaxed">
							Founded on the belief that everyone deserves to feel radiant,
							Crystal Beauty Clear (CBC) began as a small dream. A dream to
							curate a collection of the most effective, luxurious, and
							accessible beauty products in one place.
						</p>
						<p className="text-secondary/90 text-lg leading-relaxed">
							We saw a gap between premium quality and affordability, between
							luxury and accessibility. We built CBC to bridge that gap,
							creating a seamless shopping experience where you can discover
							global trends, everyday essentials, and hidden gems, all backed by
							our seal of approval.
						</p>
						<Link
							to="/products"
							className="inline-block mt-8 px-6 py-3 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/20 hover:brightness-110 active:scale-[0.99] transition"
						>
							Explore Our Products
						</Link>
					</div>
					<div className="order-1 lg:order-2 flex justify-center">
						{/* You can replace this with a real image */}
						<img
							src="/logo.png"
							alt="CBC Logo"
							className="w-full max-w-sm rounded-3xl"
						/>
					</div>
				</div>
			</div>

			{/* Our Values Section */}
			<div className="w-full bg-white py-16 lg:py-24 px-6">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl lg:text-4xl font-bold text-secondary text-center mb-12">
						What We Stand For
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
						{values.map((item, index) => (
							<div key={index} className="flex flex-col items-center text-center">
								<div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-5">
									{item.icon}
								</div>
								<h3 className="text-xl font-semibold text-secondary mb-3">
									{item.title}
								</h3>
								<p className="text-secondary/80 leading-relaxed">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="w-full bg-primary py-16 lg:py-24 px-6 text-center">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-3xl lg:text-4xl font-bold text-secondary">
						Join the CBC Family
					</h2>
					<p className="mt-4 text-lg text-secondary/80 mb-8">
						Ready to find your new favorite? Explore our curated collections and
						start your beauty journey today.
					</p>
					<Link
						to="/register"
						className="px-8 py-3.5 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/20 hover:brightness-110 active:scale-[0.99] transition"
					>
						Create Your Account
					</Link>
				</div>
			</div>
		</div>
	);
}