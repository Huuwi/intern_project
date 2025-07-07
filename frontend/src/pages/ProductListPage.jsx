import React, { useEffect, useRef, useState } from 'react'
import { myStore } from '../store'
import Header from '../components/Header'
import axios from 'axios'
import { CONST } from '../const'
import DisplayListProduct from '../components/DisplayListProduct'
import Search from '../components/Search'
import { useNavigate } from 'react-router-dom'

const ProductListPage = () => {

    const themeColor = myStore((state) => state.themeColor)
    const navigate = useNavigate()

    let userData = localStorage.getItem("userData") || "{}"
    userData = JSON.parse(userData)

    const perPage = 6
    const [pageIndex, setPageIndex] = useState(0)
    const [listProduct, setListProduct] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`http://localhost:1337/api/page/listProducts?pageIndex=${pageIndex}&perPage=${perPage}`, { withCredentials: true })
                setListProduct(res.data.productList)
            } catch (error) {
                console.log(error)
                setListProduct([])
            }
        }
        fetchData()
    }, [pageIndex])

    return (
        <div
            className="min-h-screen min-w-screen flex flex-col items-center "
            style={{ background: themeColor, gap: "50px" }}
        >
            <Header />
            {/* Go to Admin Page button */}
            {userData?.isAdmin && (
                <button
                    className="mb-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-semibold shadow hover:opacity-90 transition"
                    onClick={() => navigate('/admin')}
                >
                    Quản trị Admin
                </button>
            )}
            <Search />
            <DisplayListProduct products={listProduct} />
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
                    disabled={listProduct.length == 0}
                >
                    <h1 style={{ fontSize: "50px" }}>→</h1>
                </button>
            </div>
        </div>
    )
}

export default ProductListPage