import React, { useState } from "react";
import UserManagement from "./UserManagement";
import ProductManagement from "./ProductManagement";

export default function Admin() {
    const [activeTab, setActiveTab] = useState("user");

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar Navigation */}
            <nav className="w-64 bg-white shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h2>
                <ul>
                    <li>
                        <button
                            className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${activeTab === "user"
                                ? "bg-blue-500 text-white font-semibold"
                                : "hover:bg-blue-100 text-gray-700"
                                }`}
                            onClick={() => setActiveTab("user")}
                        >
                            Quản lý User
                        </button>
                    </li>
                    <li>
                        <button
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === "product"
                                ? "bg-blue-500 text-white font-semibold"
                                : "hover:bg-blue-100 text-gray-700"
                                }`}
                            onClick={() => setActiveTab("product")}
                        >
                            Quản lý Sản phẩm
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <main className="flex-1 p-10">
                {activeTab === "user" && (
                    <UserManagement />
                )}
                {activeTab === "product" && (
                    <ProductManagement />
                )}
            </main>
        </div>
    );
}