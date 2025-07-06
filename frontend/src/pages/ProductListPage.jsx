import React, { useEffect, useRef, useState } from 'react'
import { myStore } from '../store'

const ProductListPage = () => {

    const themeColor = myStore((state) => state.themeColor)

    const perPage = 6
    const pageIndex = useRef(0)
    const [listProduct, setListProduct] = useState([])

    useEffect(() => {

        async function fetchData() {


        }

    }, [pageIndex])


    return (
        <div
            className="h-screen w-screen flex flex-col items-center"
            style={{ background: themeColor }}
        >

        </div>
    )
}

export default ProductListPage
