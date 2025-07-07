import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ username: "", password: "", nickName: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fetch users
    const fetchUsers = () => {
        axios
            .get(`${import.meta.env.VITE_DEV_BACKEND_URL}/admin/getListUsers`, {
                withCredentials: true,
            })
            .then((res) => {
                setUsers(res.data.data || []);
            })
            .catch(() => {
                alert("Bạn không phải admin");
                navigate("/login");
            });
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line
    }, []);

    // Handle delete user
    const handleDelete = async (userId) => {
        if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
        try {
            await axios.delete(
                `${import.meta.env.VITE_DEV_BACKEND_URL}/admin/deleteUserById`,
                {
                    data: { userId },
                    withCredentials: true,
                }
            );
            window.location.reload()
        } catch (err) {
            alert("Xóa thất bại!");
            console.error(err);
        }
    };


    // Handle add user
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (!form.username || !form.password || !form.nickName) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            setLoading(false);
            return;
        }
        try {
            let res = await axios.post(
                `${import.meta.env.VITE_DEV_BACKEND_URL}/admin/addNewUser`,
                form,
                { withCredentials: true }
            );
            window.location.reload()
        } catch (err) {
            setError(err.response?.data?.message || "Thêm người dùng thất bại!");
        }
        setLoading(false);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center py-12 px-4" style={{ gap: "50px" }}>
            <h1 className="text-5xl font-extrabold mb-12 text-indigo-800 drop-shadow-lg tracking-tight">
                Quản Lý Người Dùng
            </h1>

            {/* Add User Form */}
            <div
                className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 mb-16 border border-indigo-200"
                style={{ display: "flex", flexDirection: 'column', gap: "20px" }}
            >
                <h2 className="text-3xl font-bold text-indigo-700 mb-6">Thêm Người Dùng Mới</h2>
                <div className="flex flex-col md:flex-row gap-6">
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleInputChange}
                        placeholder="Tên đăng nhập"
                        className="flex-1 px-5 py-3 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none text-lg transition-all duration-300"
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                        placeholder="Mật khẩu"
                        className="flex-1 px-5 py-3 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none text-lg transition-all duration-300"
                        autoComplete="new-password"
                    />
                    <input
                        type="text"
                        name="nickName"
                        value={form.nickName}
                        onChange={handleInputChange}
                        placeholder="Tên hiển thị"
                        className="flex-1 px-5 py-3 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none text-lg transition-all duration-300"
                        autoComplete="off"
                    />
                </div>
                {error && (
                    <div className="text-red-600 bg-red-50 border border-red-300 rounded-xl px-5 py-3 mt-4 text-base text-center font-medium">
                        {error}
                    </div>
                )}
                <button
                    onClick={handleAddUser}
                    disabled={loading}
                    className="w-full py-3 mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 cursor-pointer disabled:opacity-50 shadow-lg"
                >
                    {loading ? "Đang thêm..." : "Thêm Người Dùng"}
                </button>
            </div>

            {/* User Table */}
            <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8 border border-indigo-200">
                {users.length === 0 ? (
                    <div className="text-gray-600 text-center py-12 text-xl font-medium">
                        Không có dữ liệu người dùng.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-indigo-200" style={{ height: "50px" }}>
                                    {Object.keys(users[0]).map((key) => (
                                        <th
                                            style={{ textAlign: "center", paddingRight: "20px", paddingLeft: "20px" }}
                                            key={key}
                                            className="px-6 py-4 text-left font-semibold text-indigo-800 uppercase tracking-wider border-b-2 border-indigo-300"
                                        >
                                            {key}
                                        </th>
                                    ))}
                                    <th className="px-6 py-4 text-center font-semibold text-indigo-800 uppercase tracking-wider border-b-2 border-indigo-300">
                                        Hành Động
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr
                                        style={{ height: "50px" }}
                                        key={idx}
                                        className="border-b border-indigo-100 hover:bg-indigo-50 transition-all duration-200"
                                    >
                                        {Object.values(user).map((value, i) => (
                                            <td key={i} className="px-6 py-4 text-gray-800 text-base" style={{ textAlign: "center" }}>
                                                {String(value)}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium text-base shadow-md transition-all duration-300"
                                                title="Xóa người dùng"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;