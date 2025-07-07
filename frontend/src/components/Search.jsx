import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CONST } from '../const'
import SearchProductList from './SearchProduct'

const Search = () => {
    const [query, setQuery] = useState('')
    const [listProduct, setListProduct] = useState([])

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim() === '') {
                setListProduct([])
                return
            }

            async function main() {
                try {
                    const res = await axios.post(
                        `${CONST.backendUrl}/page/searchProductByName`,
                        { productName: query },
                        { withCredentials: true }
                    )
                    setListProduct(res.data.products || [])
                    console.log(res.data.products)
                } catch (error) {
                    console.log(error)
                }
            }

            main()
        }, 300)

        return () => clearTimeout(delayDebounce)
    }, [query])

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "400px" }}>
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 bg-white rounded-xl shadow-md px-4 py-2 w-full max-w-md mx-auto"
            >
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="flex-1 bg-transparent outline-none text-gray-700 text-base px-2 py-1"
                    style={{ height: "30px" }}
                />
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-150 shadow"
                    style={{ height: "30px", width: "50px" }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                </button>
            </form>

            {/* Hiển thị kết quả nếu có */}
            <SearchProductList searchProductList={listProduct} />
        </div>
    )
}

export default Search
