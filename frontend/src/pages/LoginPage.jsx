import React, { useState } from 'react'
import axios from 'axios'
import ChangeThemeInput from '../components/ChangeThemeInput'
import { myStore } from '../store'
import { CONST } from '../const'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [form, setForm] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const themeColor = myStore((state) => state.themeColor)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await axios.post(CONST.backendUrl + '/login', form)
            const userData = res.data.userData
            localStorage.setItem('userData', JSON.stringify(userData))
            navigate("/products")
            // window.location.href = '/'
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        }
        setLoading(false)
    }

    return (
        <div style={{ background: themeColor }}
            className=" min-h-screen flex flex-col items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className=" bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-5 items-center "
            >
                <h2 className="text-center text-indigo-600 font-bold text-3xl tracking-wide mb-4">
                    Sign In
                </h2>

                <div className="flex flex-col gap-1  w-9/10">
                    <label className="font-medium text-gray-800 mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        autoFocus
                        className="h-[30px] px-3 py-2 rounded-lg border border-gray-300 text-base outline-none focus:border-indigo-500 transition"
                    />
                </div>

                <div className="flex flex-col gap-1 w-9/10">
                    <label className="font-medium text-gray-800 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="h-[30px] px-3 py-2 rounded-lg border border-gray-300 text-base outline-none focus:border-indigo-500 transition"
                    />
                </div>

                {error && (
                    <div className="text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2 text-sm text-center">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{ marginBottom: "20px" }}
                    className="h-[50px] w-[100px] mt-2 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition cursor-pointer disabled:opacity-60"
                >
                    {loading ? 'Signing in...' : 'Login'}
                </button>
            </form>
        </div >
    )
}

export default LoginPage
