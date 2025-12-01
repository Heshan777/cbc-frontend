// src/pages/admin/dashboard.jsx
import { FaUsers, FaBoxOpen, FaClipboardList, FaChartBar } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";

export default function Dashboard() {
    // Placeholder values - replace these with actual data fetched from your backend
    const stats = [
        {
            label: "Total Orders",
            value: "1265",
            icon: <FaClipboardList className="text-3xl text-white drop-shadow" />,
            bg: "from-blue-400 to-blue-600"
        },
        {
            label: "Products",
            value: "163",
            icon: <FaBoxOpen className="text-3xl text-white drop-shadow" />,
            bg: "from-pink-400 to-pink-600"
        },
        {
            label: "Customers",
            value: "438",
            icon: <FaUsers className="text-3xl text-white drop-shadow" />,
            bg: "from-green-400 to-green-600"
        },
        {
            label: "Pending Orders",
            value: "22",
            icon: <MdOutlineAddShoppingCart className="text-3xl text-white drop-shadow" />,
            bg: "from-yellow-300 to-yellow-500"
        },
    ];

    return (
        <div className="w-full min-h-[calc(100vh-120px)] flex flex-col gap-8 px-4 py-8 md:px-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-accent mb-2 tracking-tight">Dashboard</h1>
                <p className="text-sm text-secondary/70">Quick overview of your shop's performance</p>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`rounded-2xl shadow-xl overflow-hidden bg-gradient-to-tr ${stat.bg} transition-transform hover:scale-[1.03]`}>
                        <div className="flex items-center gap-4 p-6">
                            <div className="rounded-xl bg-black/20 p-3 shadow">{stat.icon}</div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-extrabold text-white drop-shadow">{stat.value}</span>
                                <span className="text-white/80 font-medium text-sm mt-1">{stat.label}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Quick Chart Placeholder */}
            <div className="rounded-2xl shadow-lg bg-white/90 border border-accent/10 mt-10 p-6">
                <div className="flex items-center gap-2 mb-6">
                    <FaChartBar className="text-accent text-2xl" />
                    <span className="font-semibold text-secondary text-lg">Sales Overview</span>
                </div>
                {/* Chart Placeholder - connect a chart library for real charts */}
                <div className="w-full h-48 flex items-center justify-center text-secondary/30">
                    <span className="italic">[ Chart goes here ]</span>
                </div>
            </div>
        </div>
    );
}
