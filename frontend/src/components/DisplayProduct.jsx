const DisplayProduct = ({ productName, productPrice, productId, imageLink }) => {
    return (
        <div
            className="
                max-w-[260px] mx-auto p-6 text-center rounded-[16px] bg-white 
                border border-gray-100 shadow-md hover:shadow-lg hover:scale-105 
                transition-transform duration-300 cursor-pointer
                flex flex-col items-center
            "
            style={{ height: "300px", width: "300px", margin: "5px" }}
        >
            <div className="w-[180px] h-[180px] mx-auto mb-4 bg-gray-100 flex items-center justify-center rounded-[12px]">
                <img
                    src={imageLink}
                    alt={productName}
                    className="w-full h-full object-contain"
                />
            </div>
            <h2 className="text-[1.3rem] font-semibold text-gray-800 mb-2">
                {productName}
            </h2>
            <p className="text-[1.1rem] text-blue-600 font-medium">
                Price: ${productPrice}
            </p>
        </div>
    );
};

export default DisplayProduct;
