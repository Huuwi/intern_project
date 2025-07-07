import React, { useEffect, useState } from "react";
import axios from "axios";

// Hàm chuẩn hóa tên sản phẩm (bỏ dấu, viết thường, thay khoảng trắng bằng -)
const normalizedProductName = (str) => {
    if (!str) return "";
    return str.normalize("NFKD").replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(" ", '')
};

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ productName: "", productPrice: "", imageLink: "" });
    const [editForm, setEditForm] = useState({ id: null, productName: "", productPrice: "", imageLink: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editError, setEditError] = useState("");

    const perPage = 6
    const [pageIndex, setPageIndex] = useState(0)


    useEffect(() => {

        async function fetchData() {
            try {
                const res = await axios.get(`http://localhost:1337/api/page/listProducts?pageIndex=${pageIndex}&perPage=${perPage}`, { withCredentials: true })
                setProducts(res.data.productList)

            } catch (error) {
                console.log(error)
                setProducts([])
            }
        }
        fetchData()
    }, [pageIndex])



    // Handle delete product
    const handleDelete = async (productId) => {
        if (!window.confirm("Bạn có chắc muốn xóa san pham này?")) return;
        try {
            await axios.delete(
                `${import.meta.env.VITE_DEV_BACKEND_URL}/admin/deleteProductById`,
                {
                    data: { productId },
                    withCredentials: true,
                }
            );
            window.location.reload()
        } catch (err) {
            alert("Xóa thất bại!");
            console.error(err);
        }
    };

    // Handle add product
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (!form.productName || !form.productPrice || !form.imageLink) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            setLoading(false);
            return;
        }
        try {
            await axios.post(
                `${import.meta.env.VITE_DEV_BACKEND_URL}/admin/addNewProduct`,
                {
                    ...form,
                    normalizedProductName: normalizedProductName(form.productName),
                },
                { withCredentials: true }
            );
            window.location.reload()
        } catch (err) {
            setError(err.response?.data?.message || "Thêm sản phẩm thất bại!");
        }
        setLoading(false);
    };

    // Handle edit product
    const handleEditClick = (product) => {
        setEditForm({
            id: product.id,
            productName: product.productName,
            productPrice: product.productPrice,
            imageLink: product.imageLink || "",
        });
        setEditError("");
    };

    const handleEditInputChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
        setEditError("");
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setEditError("");
        if (!editForm.productName || !editForm.productPrice || !editForm.imageLink) {
            setEditError("Vui lòng nhập đầy đủ thông tin.");
            setLoading(false);
            return;
        }
        try {
            await axios.post(
                `${import.meta.env.VITE_DEV_BACKEND_URL}/admin/updateProduct`,
                {
                    productId: editForm.id,
                    productName: editForm.productName,
                    productPrice: editForm.productPrice,
                    imageLink: editForm.imageLink,
                    normalizedProductName: normalizedProductName(editForm.productName),
                },
                { withCredentials: true }
            );
            setEditForm({ id: null, productName: "", productPrice: "", imageLink: "" });
        } catch (err) {
            setEditError(err.response?.data?.message || "Sửa sản phẩm thất bại!");
        }
        setLoading(false);
    };

    const handleCancelEdit = () => {
        setEditForm({ id: null, productName: "", productPrice: "", imageLink: "" });
        setEditError("");
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center py-10 px-2" style={{ gap: "50px" }}>
            <h1 className="text-4xl font-extrabold mb-8 text-indigo-700 drop-shadow">Quản lý sản phẩm</h1>

            {/* Add Product Form */}
            <form
                onSubmit={handleAddProduct}
                className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 mb-10 flex flex-col gap-4 border border-indigo-100"
            >
                <h2 className="text-2xl font-bold text-indigo-600 mb-2">Thêm sản phẩm mới</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        name="productName"
                        value={form.productName}
                        onChange={handleInputChange}
                        placeholder="Tên sản phẩm"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none"
                        autoComplete="off"
                    />
                    <input
                        type="number"
                        name="productPrice"
                        value={form.productPrice}
                        onChange={handleInputChange}
                        placeholder="Giá sản phẩm"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none"
                        autoComplete="off"
                        min="0"
                    />
                </div>
                <input
                    type="text"
                    name="imageLink"
                    value={form.imageLink}
                    onChange={handleInputChange}
                    placeholder="Link ảnh sản phẩm"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none"
                    autoComplete="off"
                />
                {error && (
                    <div className="text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2 text-sm text-center">
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg hover:opacity-90 transition cursor-pointer disabled:opacity-60 shadow"
                >
                    {loading ? "Đang thêm..." : "Thêm sản phẩm"}
                </button>
            </form>

            {/* Edit Product Form */}
            {editForm.id && (
                <form
                    onSubmit={handleEditProduct}
                    className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 mb-10 flex flex-col gap-4 border border-purple-200"
                >
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">Sửa sản phẩm</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            name="productName"
                            value={editForm.productName}
                            onChange={handleEditInputChange}
                            placeholder="Tên sản phẩm"
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 outline-none"
                            autoComplete="off"
                        />
                        <input
                            type="number"
                            name="productPrice"
                            value={editForm.productPrice}
                            onChange={handleEditInputChange}
                            placeholder="Giá sản phẩm"
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 outline-none"
                            autoComplete="off"
                            min="0"
                        />
                    </div>
                    <input
                        type="text"
                        name="imageLink"
                        value={editForm.imageLink}
                        onChange={handleEditInputChange}
                        placeholder="Link ảnh sản phẩm"
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 outline-none"
                        autoComplete="off"
                    />
                    {editError && (
                        <div className="text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2 text-sm text-center">
                            {editError}
                        </div>
                    )}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-lg hover:opacity-90 transition cursor-pointer disabled:opacity-60 shadow"
                        >
                            {loading ? "Đang sửa..." : "Lưu thay đổi"}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="flex-1 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold text-lg hover:bg-gray-300 transition shadow"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            )}

            {/* Product Table */}
            <div className="min-h-[400px] w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-6 border border-indigo-100">
                {products.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">Không có dữ liệu sản phẩm.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-indigo-100">
                                    {Object.keys(products[0]).map((key) => (
                                        <th
                                            style={{ textAlign: "center", paddingRight: "20px", paddingLeft: "20px" }}
                                            key={key}
                                            className="px-4 py-3 text-left font-bold text-indigo-700 uppercase tracking-wider border-b border-indigo-200"
                                        >
                                            {key}
                                        </th>
                                    ))}
                                    <th className="px-4 py-3 text-center font-bold text-indigo-700 uppercase tracking-wider border-b border-indigo-200">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, idx) => (
                                    <tr
                                        style={{ textAlign: "center", paddingRight: "20px", paddingLeft: "20px" }}
                                        key={idx}
                                        className={`border-b border-indigo-100 hover:bg-indigo-50 transition`}
                                    >
                                        {Object.entries(product).map(([key, value], i) => (
                                            key === "imageLink" ? (
                                                <td key={i} className="px-4 py-2 text-gray-700">
                                                    {value ? (
                                                        <img src={value} alt="product" className="w-16 h-16 object-cover rounded shadow" />
                                                    ) : (
                                                        <span className="italic text-gray-400">Không có ảnh</span>
                                                    )}
                                                </td>
                                            ) : (
                                                <td key={i} className="px-4 py-2 text-gray-700">
                                                    {String(value)}
                                                </td>
                                            )
                                        ))}
                                        <td className="px-4 py-2 text-center flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleEditClick(product)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg font-semibold shadow transition duration-150"
                                                title="Sửa sản phẩm"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-semibold shadow transition duration-150"
                                                title="Xóa sản phẩm"
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

            <div className="flex items-center gap-4 my-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                    onClick={() => {
                        if (pageIndex > 0) {
                            setPageIndex(pageIndex - 1)
                        }
                    }}
                    disabled={pageIndex === 0}
                >
                    <h1 style={{ fontSize: "50px" }}>←</h1>
                </button>
                <h3 className="text-lg font-semibold">Page: {pageIndex + 1}</h3>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600  disabled:bg-gray-300"
                    onClick={() => {
                        setPageIndex(pageIndex + 1)
                    }}
                    disabled={products.length == 0}
                >
                    <h1 style={{ fontSize: "50px" }}>→</h1>

                </button>
            </div>
        </div>
    );
};

export default ProductManagement;