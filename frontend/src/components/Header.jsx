import axios from 'axios'
import React from 'react'

const Header = () => {
    let userData = localStorage.getItem("userData") || "{}"
    userData = JSON.parse(userData)
    return (
        <header className="bg-white shadow-md py-4 px-8 flex items-center justify-between rounded-b-2xl mb-6">
            <div className="flex items-center gap-3">
                <img
                    src="https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff&rounded=true"
                    alt="avatar"
                    className="w-10 h-10 rounded-full shadow"
                />
                <h1 className="text-xl font-semibold text-indigo-700">
                    Xin chào: <span className="font-bold">{userData?.nickName || "Khách"}</span>
                </h1>
            </div>
            <button
                onClick={() => {
                    async function logout() {
                        await axios.post(import.meta.env.VITE_DEV_BACKEND_URL + "/logout", {}, {
                            withCredentials: true
                        })
                        window.location.reload();
                    }
                    logout()
                }}
                title="Đăng xuất"
                className="p-2 rounded-full hover:bg-indigo-100 transition"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                </svg>
            </button>
        </header>
    )
}

export default Header