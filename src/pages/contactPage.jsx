import React, { useState } from "react";
import toast from "react-hot-toast";
import {
	HiOutlineMail,
	HiOutlinePhone,
	HiOutlineLocationMarker,
} from "react-icons/hi";

export default function ContactPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// In a real app, you'd send this to your API
		console.log({ name, email, subject, message });

		// Show success toast and reset form
		toast.success("Your message has been sent! We'll reply soon.");
		setName("");
		setEmail("");
		setSubject("");
		setMessage("");
	};

	const contactDetails = [
		{
			icon: <HiOutlineMail className="w-6 h-6 text-accent" />,
			title: "Email Us",
			content: "support@crystalbeautyclear.com",
			href: "mailto:support@crystalbeautyclear.com",
		},
		{
			icon: <HiOutlinePhone className="w-6 h-6 text-accent" />,
			title: "Call Us",
			content: "+94 11 234 5678",
			href: "tel:+94112345678",
		},
		{
			icon: <HiOutlineLocationMarker className="w-6 h-6 text-accent" />,
			title: "Visit Us",
			content: "123 Galle Road, Colombo 03, Sri Lanka",
		},
	];

	return (
		<div className="w-full min-h-[calc(100vh-100px)] bg-primary text-secondary py-12 lg:py-20 px-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12 lg:mb-16">
					<h1 className="text-4xl lg:text-6xl font-bold text-secondary tracking-tight">
						Get in Touch
					</h1>
					<p className="mt-4 text-lg lg:text-xl text-secondary/80 max-w-2xl mx-auto">
						We're here to help! Whether you have a question about our products,
						an order, or just want to say hi, feel free to reach out.
					</p>
					<div className="mt-6 h-1.5 w-32 bg-accent rounded-full mx-auto" />
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
					{/* Column 1: Contact Info */}
					<div className="flex flex-col gap-8">
						<h2 className="text-3xl font-semibold text-secondary">
							Contact Information
						</h2>
						<div className="space-y-6">
							{contactDetails.map((item) => (
								<div key={item.title} className="flex items-start gap-5">
									<div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-accent/10">
										{item.icon}
									</div>
									<div>
										<h3 className="text-lg font-semibold text-secondary">
											{item.title}
										</h3>
										{item.href ? (
											<a
												href={item.href}
												className="text-md text-secondary/80 hover:text-accent hover:underline transition"
											>
												{item.content}
											</a>
										) : (
											<p className="text-md text-secondary/80">
												{item.content}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
						
						{/* Placeholder for a map */}
						<div className="w-full h-64 rounded-2xl bg-white/90 ring-1 ring-secondary/10 flex items-center justify-center text-secondary/50">
							<HiOutlineLocationMarker className="w-8 h-8 mr-2" />
							<span>Map Placeholder</span>
						</div>
					</div>

					{/* Column 2: Contact Form */}
					<div className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-8 sm:p-10">
						<h2 className="text-3xl font-semibold text-secondary mb-8">
							Send Us a Message
						</h2>
						<form onSubmit={handleSubmit} className="space-y-5">
							{/* Re-using styles from your registerPage.jsx for consistency */}
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="text-sm font-medium text-primary/90"
								>
									Full Name
								</label>
								<input
									id="name"
									type="text"
									placeholder="e.g., Jane Doe"
									autoComplete="name"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full h-11 rounded-xl bg-white/90 text-secondary placeholder-secondary/50 px-4 outline-none ring-2 ring-transparent focus:ring-accent/60 transition"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-sm font-medium text-primary/90"
								>
									Email address
								</label>
								<input
									id="email"
									type="email"
									placeholder="e.g., you@example.com"
									autoComplete="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full h-11 rounded-xl bg-white/90 text-secondary placeholder-secondary/50 px-4 outline-none ring-2 ring-transparent focus:ring-accent/60 transition"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="subject"
									className="text-sm font-medium text-primary/90"
								>
									Subject
								</label>
								<input
									id="subject"
									type="text"
									placeholder="e.g., Question about my order"
									required
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
									className="w-full h-11 rounded-xl bg-white/90 text-secondary placeholder-secondary/50 px-4 outline-none ring-2 ring-transparent focus:ring-accent/60 transition"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="message"
									className="text-sm font-medium text-primary/90"
								>
									Message
								</label>
								<textarea
									id="message"
									placeholder="Your message..."
									rows={5}
									required
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									className="w-full rounded-xl bg-white/90 text-secondary placeholder-secondary/50 px-4 py-3 outline-none ring-2 ring-transparent focus:ring-accent/60 transition"
								/>
							</div>
							<button
								type="submit"
								className="w-full h-11 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/20 hover:brightness-110 active:scale-[0.99] transition"
							>
								Send Message
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}